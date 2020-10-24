const ConfigurationManager = require('./configurationManager');

const registerStatus = {
    off: 0,
    registering: 1,
    on: 2
};

let status = registerStatus.off;

module.exports = (consul, { serviceName, serviceId, serviceNote, serviceTags, serviceHost, servicePort, consulHost = 'localhost', consulPort = 8500, registerIntervalTry = 2500, defaultsConfigurations }) => {
    const defaults = defaultsConfigurations;
    const client = consul(({
        host: consulHost,
        port: ~~(consulPort)
    }));

    async function register() {
        const consulServiceRegisterConfigurations = {
            name: serviceName, // nome do serviço no consul
            id: serviceId, // ID do serviço no consul
            tags: serviceTags || [], // tags
            address: `http://${serviceHost}`, //endereço do microserviço que está se registrando 
            port: ~~(servicePort), //porta do microserviço que está se registrando 
            check: {
                http: `http://${serviceHost}:${servicePort}/health`, // url de checagem de "saúde" do serviço
                interval: '30s',
                timeout: '5s',
                notes: serviceNote
            }
        }

        if (status == registerStatus.off) {
            status = registerStatus.registering;

            var registerTimeout = setInterval(() => {
                console.log('registering...');

                if (status != registerStatus.on) {
                    client.agent.service.register(consulServiceRegisterConfigurations, function (err) {
                        if (err) {
                            console.log(err);
                            status = registerStatus.registering;
                        } else {
                            status = registerStatus.on;
                        }
                    });
                } else {
                    console.log('service registered...');
                    registerWatcher();
                    createDefaultValues(defaults);
                    clearInterval(registerTimeout);
                }
            }, registerIntervalTry);
        }
    }

    async function createDefaultValues(defaults) {
        const keys = Object.keys(defaults);
        for (var key of keys) {
            const value = ConfigurationManager[key];
            if (!value) {
                updateKeyValue(key, defaults[key]);
            }
        }
    }

    async function updateKeyValue(key, value) {
        if (status == registerStatus.off) register();

        await client.kv.set(`${key}`, value, (err, result) => {
            if (err) console.error(err);
        });
    }

    async function getKeyValue(key) {
        if (status == registerStatus.off) register();

        if (key) {
            return new Promise((resolve, reject) => {
                client.kv.get(`${key}`, (err, result) => {
                    if (err) {
                        reject(`Erro ao buscar chave ${key}`);
                    }
                    resolve(result);
                });
            });
        }
    }

    async function getAllKeys() {
        if (status == registerStatus.off) register();

        return new Promise((resolve, reject) => {
            client.kv.keys((err, result) => {
                if (err) {
                    reject(`Erro ao buscar chaves`);
                }
                resolve(result);
            });
        });
    }

    async function registerWatcher() {
        if (status == registerStatus.off) register();

        const keys = Object.keys(ConfigurationManager);

        for (var key of keys) {
            var watch = client.watch({
                method: client.kv.get,
                options: { key: key },
                backoffFactor: 1000,
            });

            watch.on('change', function (data, res) {
                if (data) {
                    console.log(`the key ${data.Key} was updated and its new value is ${data.Value}`);
                    ConfigurationManager.updateConfig(data.Key, data.Value);
                }
            });

            watch.on('error', function (err) {
                console.error('The consul connection maybe was refused... retrying');
                status = registerStatus.off;
            });
        }
    }

    return {
        register,
        getAllKeys,
        getKeyValue,
        updateKeyValue
    }
};
