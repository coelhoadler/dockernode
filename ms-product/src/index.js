const express = require('express');
const cors = require('cors');
const app = express();
const server = require('http').Server(app);
const serviceRegister = require('./config/consul/serviceRegister');

app.use(express.json());
app.use(cors());

app.use(require('./routes'));
const PORT = process.env.NODE_PORT;

server.listen(PORT, () => {
    serviceRegister.register();
    console.log(`Listening open: ${PORT}`);
});
