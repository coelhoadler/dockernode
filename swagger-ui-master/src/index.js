const express = require('express');
const app = express();
const server = require('http').Server(app);

app.use(express.static('dist'));

app.get('/', (req, res) => { })

const PORT = process.env.NODE_PORT;

server.listen(PORT, () => {
    console.log(`Listening open: ${PORT}`);
});
