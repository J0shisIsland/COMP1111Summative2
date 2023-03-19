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

function Musical(id, title, composer, songs, scoring) {
    this.id = id;
    this.title = title;
    this.composer = composer;
    this.songs = songs;
    this.scoring = scoring;
  }

const kinkyboots = new Musical (
  'kinkyboots',
  'Kinky Boots',
  'Cindy Lauper, Harvey Fierstein',
  ['kink_price', 'kink_take', 'kink_land', 'kink_charl', 'kink_step', 'kink_sex', 'kink_hist', 'kink_father', 'kink_every', 'kink_what', 'kink_corner', 'kink_charl_repr', 'kink_soul', 'kink_hold', 'kink_raise'],
  ['tenor', 'tenor', 'baritone', 'baritone', 'mezzo-soprano', 'mezzo-soprano', 'alto', 'mezzo-soprano', 'boy', 'boy']
);


function Song(id, title, musical, scoring, star) {
        this.id = id;
        this.title = title;
        this.musical = musical;
        this.scoring = scoring;
        this.star = star;
    }

const kink_price = new Song ('kink_price', 'Price and Son Theme / The Most Beautiful Thing in the World', 'kinkyboots', ['tenor', 'tenor', 'baritone', 'baritone', 'mezzo-soprano', 'mezzo-soprano', 'alto', 'mezzo-soprano', 'boy', 'boy'], false);
const kink_take = new Song ('kink_take', 'Take What You Got', 'kinkyboots', ['tenor', 'baritone'], false);
const kink_land = new Song ('kink_land', 'Land of Lola', 'kinkyboots', 'tenor', false);
const kink_charl = new Song ('kink_charl', 'Charlies Soliloquy', 'kinkyboots', 'tenor', false);
const kink_step = new Song ('kink_step', 'Step One', 'tenor', false);
const kink_sex = new Song ('kink_sex', 'Sex is in the Heel', ['tenor', 'mezzo-soprano'], false);
const kink_hist = new Song ('kink_hist', 'The History of Wrong Guys', 'mezzo-soprano', false);
const kink_father = new Song ('kink_father', 'Not My Fathers Son', 'kinkyboots', ['tenor', 'tenor'], false);
const kink_every = new Song ('kink_every', 'Everybody Say Yeah', 'kinkyboots', ['tenor', 'tenor'], 'no')
const kink_what = new Song ('kink_what', 'What a Woman Wants', 'kinkyboots', ['tenor', 'mezzo-soprano', 'mezzo-soprano', 'alto'], 'no')
const kink_corner = new Song ('kink_corner', 'In This Corner', 'kinkyboots', ['tenor', 'mezzo-soprano', 'alto', 'baritone'], 'no')
const kink_charl_repr = new Song ('kink_charl_repr', 'Charlies Soliloquy', 'kinkyboots', 'tenor', 'no')
const kink_soul = new Song ('kink_soul', 'Soul of a Man', 'kinkyboots', 'tenor', 'no')
const kink_hold = new Song ('kink_hold', 'Hold Me in Your Heart', 'kinkyboots', 'tenor', 'no')
const kink_raise = new Song ('kink_raise', 'Raise You Up', 'kinkyboots', ['tenor', 'tenor', 'baritone', 'baritone', 'mezzo-soprano', 'mezzo-soprano', 'alto', 'mezzo-soprano'], 'no')

app.get('/kink', (req, resp) => {
  resp.send(kinkyboots);
});

const Joshua = {
  level: ['Grade 8'],
  repertoire: ['Bach Art of the Fugue',
    'Beethoven String Quartet',
    'Schubert Trio',
    'Bach Double Concert'],
};

app.get('/josh', (req, resp) => {
  resp.send(Joshua);
});

app.post('/josh/add', (req, resp) => {
  // console.log(req)
  console.log(req.body);
  // resp.send("I am Posting!");
  const { newpiece } = req.body;
  Joshua.repertoire.push(newpiece);
  resp.json(Joshua.repertoire);
});

module.exports = app;
