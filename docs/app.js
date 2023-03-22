const express = require('express');

const app = express();
app.use(express.static('client'));
app.use(express.json());

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));

// app.use(express.urlencoded());
// const cors = require('cors');
// app.use(cors());

const musicals = require('./musicals.json');

app.get('/musicals', (req, res) => {
  res.json(musicals);
});
app.get('/musicals/search', (req, res) => {
  const searchField = req.query.field;
  const searchQuery = req.query.query;
  const results = [];

  for (let i = 0; i < musicals.length; i += 1) {
    const musical = musicals[i];
    if (musical[searchField].includes(searchQuery)) {
      results.push(musical);
    }
  }
  res.json(results);
});
app.post('/musicals/add', (req, res) => {
  const newmusical = req.body;
  // console.log(newmusical);
  musicals.push(newmusical);
  // console.log(musicals);
  res.send('Thanks for contributing to the database.');
});

const comments = require('./comments.json');

app.get('/comments', (req, res) => {
  res.json(comments);
});
app.get('/comments/search', (req, res) => {
  const searchField = req.query.field;
  const searchQuery = req.query.query;
  const results = [];

  for (let i = 0; i < comments.length; i += 1) {
    const comment = comments[i];
    if (comment[searchField].includes(searchQuery)) {
      results.push(comment);
    }
  }
  res.json(results);
});
app.post('/comments/add', (req, res) => {
  const newcomment = req.body;
  comments.push(newcomment);
  res.send('Thanks for your comment.');
});

module.exports = app;
