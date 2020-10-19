const ConfigurationManager = require('./configurationManager');

const registerStatus = {
    off: 0,
    registering: 1,
    on: 2
};

let status = registerStatus.off;

module.exports = (consul, { serviceName, serviceId, serviceNote, serviceTags, serviceHealthCheckHost, serviceHealthCheckPort, consulHost = 'localhost', consulPort = 8500 }) => {

    const client = consul(({
        host: consulHost,
        port: ~~(consulPort)
    }));

    async function register() {
        const consulServiceRegisterConfigurations = {
            name: serviceName, // nome do serviço no consul
            id: serviceId, // ID do serviço no consul
            tags: serviceTags || [], // tags
            address: `http://${serviceHealthCheckHost}`, //endereço do microserviço que está se registrando 
            port: ~~(serviceHealthCheckPort), //porta do microserviço que está se registrando 
            check: {
                deregisterCriticalServiceAfter: "60s", // desregistrar? do serviço após x seg de inatividade 
                http: `http://${serviceHealthCheckHost}:${serviceHealthCheckPort}/health`, // url de checagem de "saúde" do serviço
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
                    registerWatcher();
                    clearInterval(registerTimeout);
                }
            }, 2500);
        }
    }

    async function updateKeyValue(key, value) {
        if(status == registerStatus.off) register();

        await client.kv.set(`${key}`, value, (err, result) => {
            if (err) console.error(err);
        });
    }

    async function getKeyValue(key) {
        if(status == registerStatus.off) register();

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
        if(status == registerStatus.off) register();

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
        if(status == registerStatus.off) register();

        const keys = Object.keys(ConfigurationManager);

        for (var key of keys) {
            var watch = client.watch({
                method: client.kv.get,
                options: { key: key },
                backoffFactor: 1000,
            });

            watch.on('change', function (data, res) {
                console.log(data);
                if (data) {
                    ConfigurationManager.updateConfig(data.Key, data.Value);
                }
            });

            watch.on('error', function (err) {
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



