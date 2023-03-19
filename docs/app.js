const express = require('express');

const app = express();
app.use(express.static('client'));
app.use(express.json()); // Parse URL-encoded bodies
// app.use(express.urlencoded());

// const cors = require('cors');
// app.use(cors());

const musicals = require('./musicals.json');
app.get('/musicals', (req, res) => {
  res.json(musicals);
});
app.post('/musicals/add', (req, res) => {
  // console.log(req.body);
  const newmusical = req.body;
  musicals.push(newmusical);
  // console.log(musicals);
});

const comments = require('./comments.json');
app.get('/comments', (req, res) => {
  res.json(comments);
})

module.exports = app;
