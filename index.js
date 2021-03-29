var express = require('express');
var app = express();

app.get("/", (reqm, res) => {
    res.send("<h1>Teste</h1>")
})

app.listen(3000, () => console.log('Server...'))
