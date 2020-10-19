const express = require('express');
var bodyParser = require('body-parser')
const cors = require('cors');
const consul = require('consul');
const serviceRegister = require('./serviceRegister');
const consulRegistration = require('./config/consul/consul')(consul, serviceRegister);
const app = express();
const server = require('http').Server(app);

app.use(express.json());
app.use(cors());

app.use(require('./routes'));
const PORT = 3536;

server.listen(PORT, () => {
    consulRegistration.register();
    console.log(`Listening open: ${PORT}`);
});

    