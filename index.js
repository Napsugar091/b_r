const express = require('express');
const app = express();
const fs = require('fs');

app.get('/json', (req, res) => {
    fs.readFile("./etelek.json", (err, data) => {
        res.send(JSON.parse(data));
    })
})

app.get('/json/:name', (req, res) => {
    const name = req.params.name;
    fs.readFile("./etelek.json", (err, data) => {
        const etelek = JSON.parse(data);
        const etelbyName = etelek.find(etel => etel.name === name);
        if (!etelbyName) {
            res.status(404).send({ error: `name: ${name} not found` });
            return;
        }
        res.send(etelbyName);
    })
})

app.listen(3000);