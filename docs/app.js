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
    const newmusical = req.body;
  // console.log(newmusical);
    musicals.push(newmusical);
  // console.log(musicals);
});

const comments = require('./comments.json');
app.get('/comments', (req, res) => {
  res.json(comments);
});
app.post('/comments/add', (req, res) => {
  const newcomment = req.body;
  comments.push(newcomment);
});

module.exports = app;
