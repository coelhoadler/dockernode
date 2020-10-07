const express = require('express');
const routes = express.Router();
const FirstController = require('./controllers/FirstController');

routes.get('/', FirstController.index);

routes.get('/home', (req,res) => {
    res.send(`<h1>Trabalhinho do Tadeu</h1>`);
});

module.exports = routes;