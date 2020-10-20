const express = require('express');
const cors = require('cors');

const app = express();
const server = require('http').Server(app);
app.use(cors());

app.use(require('./routes'));
const PORT = process.env.NODE_PORT;

server.listen(PORT, () => {
    console.log(`Listening open: ${PORT}`);
});

