const express = require('express');

const PORT = process.env.PORT || 3000;

const app = express();

app.get('/', (req,res) => {
    res.send(`<a href="home">Ir para a Home</a>`);
})

app.get('/home', (req,res) => {
    res.send(`<h1>Trabalhinho do Tadeuw</h1>`);
})

app.listen(PORT, () => {
    console.log(`Listening open: ${PORT}`);
});