const express = require('express');
const app = express();

app.use(express.static('client'));

const Joshua = {
    level: ["Grade 8"],
    repertoire: ["Bach Art of the Fugue", 
        "Beethoven String Quartet", 
        "Schubert Trio", 
        "Bach Double Concert"]
}

app.get('/josh', function(req, resp){
    resp.send(Joshua)
})

module.exports = app;