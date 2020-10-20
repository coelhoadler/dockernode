const express = require('express');
const cors = require('cors');
const consul = require('consul');
const serviceRegister = require('./serviceRegister');
const consulRegistration = require('./config/consul/consul')(consul, serviceRegister);
const app = express();
const server = require('http').Server(app);

app.use(express.json());
app.use(cors());

app.use(require('./routes'));
const PORT = process.env.PORT || 3535;

server.listen(PORT, () => {
    consulRegistration.register();
    console.log(`Listening open: ${PORT}`);
});

    