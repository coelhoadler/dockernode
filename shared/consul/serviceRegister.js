const dotenv = require('dotenv');
dotenv.config();

//CONFIGURAÇÃO DE EXEMPLO - MODIFIQUE OS VALORES ABAIXO CONFORME INSTRUÇÕES NO README
const consul = require('consul');
const serviceRegister = require('./consul')(consul, {
    serviceName: 'ms-name',
    serviceId: 'ms-id',
    serviceNote: 'a simple note',
    serviceTags: ['tag1', 'tag2'],
    serviceHost: 'localhost',
    servicePort: 8080,
    consulHost: 'localhost',
    consulPort: 8500,
    registerIntervalTry: 3000,
    defaultsConfigurations: {
        MsName: `http://localhost:8080`
    }
});

module.exports = serviceRegister;