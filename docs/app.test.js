/* eslint-disable no-undef */

const request = require('supertest');
const app = require('./app');

describe('Test the Musical Database', () => {
  // test POSTing a new musical
  test('POST /musicals/add succeeds', () => {
    const parameters = {
      title: 'Firebringer',
      composer: 'Starkidz',
      voices: 'Soprano, Alto, Tenor, Bass',
    };
    return request(app)
      .post('/musicals/add')
      .send(parameters)
      .expect(200);
  });

  // test GET /musicals
  test('GET /musicals succeeds', () => request(app)
    .get('/musicals')
    .expect(200));

  test('GET /musicals returns JSON', () => request(app)
    .get('/musicals')
    .expect('Content-type', /json/));

  test('GET /musicals includes Starkidz', () => request(app)
    .get('/musicals')
    .expect(/Starkidz/));

  // test title search
  test('GET /musicals/search?field=title&query=Fire succeeds', () => request(app)
    .get('/musicals/search?field=title&query=Fire')
    .expect(200));

  test('GET /musicals/search?field=title&query=Fire returns JSON', () => request(app)
    .get('/musicals/search?field=title&query=Fire')
    .expect('Content-type', /json/));

  test('GET /musicals/search?field=title&query=Fire includes Fire', () => request(app)
    .get('/musicals/search?field=title&query=Fire')
    .expect(/Fire/));

  // test composer search
  test('GET /musicals/search?field=composer&query=Starkidz succeeds', () => request(app)
    .get('/musicals/search?field=composer&query=Starkidz')
    .expect(200));

  test('GET /musicals/search?field=composer&query=Starkidz returns JSON', () => request(app)
    .get('/musicals/search?field=composer&query=Starkidz')
    .expect('Content-type', /json/));

  test('GET /musicals/search?field=composer&query=Starkidz includes Starkidz', () => request(app)
    .get('/musicals/search?field=composer&query=Starkidz')
    .expect(/Starkidz/));

  // test vocal part search
  test('GET /musicals/search?field=voices&query=Bass succeeds', () => request(app)
    .get('/musicals/search?field=voices&query=Bass')
    .expect(200));

  test('GET /musicals/search?field=voices&query=Bass returns JSON', () => request(app)
    .get('/musicals/search?field=voices&query=Bass')
    .expect('Content-type', /json/));

  test('GET /musicals/search?field=voices&query=Bass includes Bass', () => request(app)
    .get('/musicals/search?field=voices&query=Bass')
    .expect(/Bass/));
});

describe('Test the Comment Section', () => {
  // test POSTing a new comment
  test('POST /comments/add succeeds', () => {
    const parameters = {
      user: 'Testuser',
      text: 'Testing comment section',
    };
    return request(app)
      .post('/comments/add')
      .send(parameters)
      .expect(200);
  });

  // test GET /comments
  test('GET /comments succeeds', () => request(app)
    .get('/musicals')
    .expect(200));

  test('GET /comments returns JSON', () => request(app)
    .get('/comments')
    .expect('Content-type', /json/));

  test('GET /comments includes Test', () => request(app)
    .get('/comments')
    .expect(/Test/));

  // test user search
  test('GET /comments/search?field=user&query=Test succeeds', () => request(app)
    .get('/comments/search?field=user&query=Test')
    .expect(200));

  test('GET /comments/search?field=user&query=Test returns JSON', () => request(app)
    .get('/comments/search?field=user&query=Test')
    .expect('Content-type', /json/));

  test('GET /comments/search?field=user&query=Test includes Test', () => request(app)
    .get('/comments/search?field=user&query=Test')
    .expect(/Test/));

  // test text search
  test('GET /comments/search?field=text&query=section succeeds', () => request(app)
    .get('/comments/search?field=text&query=section')
    .expect(200));

  test('GET /comments/search?field=text&query=section returns JSON', () => request(app)
    .get('/comments/search?field=text&query=section')
    .expect('Content-type', /json/));

  test('GET /comments/search?field=text&query=section includes section', () => request(app)
    .get('/comments/search?field=text&query=section')
    .expect(/section/));
});
