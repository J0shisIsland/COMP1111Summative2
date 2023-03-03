const express = require('express');
const app = express();
app.use(express.static('client'));
app.use(express.json()); // Parse URL-encoded bodies

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

app.post('/josh/add', function (req, resp) {
    // console.log(req)
   console.log(req.body);
    // resp.send("I am Posting!");
    const newpiece = req.body.newpiece;
    Joshua.repertoire.push(newpiece);
    resp.json(Joshua.repertoire);
  });

module.exports = app;