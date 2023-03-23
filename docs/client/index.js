/* eslint-disable no-alert */
/* eslint-disable no-console */

/**
 * Formats instances of JSON object "musicals" as html
 * @param {Object} musicals - a JSON object of all musicals in the database
 */
function renderMusicals(musicals) {
  console.log(musicals);
  document.getElementById('musical').innerHTML = '';
  musicals.forEach((musical) => {
    let newTile = `
        <div class="col-lg-4 col-md-6 col-sm-12 tm-catalog-item">
            <div class="p-4 tm-bg-gray tm-catalog-item-description">
                <h3 class="tm-text-primary mb-3 tm-catalog-item-title">${musical.title}</h3>
                <p class="tm-catalog-item-text">
                    <span class="tm-text-secondary">Composers: </span>${musical.composer}<br>
                    <span class="tm-text-secondary">Vocal Parts: </span>
                    <ul id="voices" class="tm-footer-links">`;
    musical.voices.split(/,\s*/).forEach((voice) => {
      newTile += `<li>${voice}</li>`;
    // eslint-disable-next-line no-unused-expressions
    }); `
                    </ul>                
                </p>
            </div>
        </div>
        `;
    document.getElementById('musical').innerHTML += newTile;
  });
}

const searchMusicals = document.getElementById('search_musicals');

/** Parses form data as parameters for /search URL and executes formatting function for results */
searchMusicals.addEventListener('click', async (event) => {
  event.preventDefault();
  const field = document.getElementById('field').value;
  const query = document.getElementById('query').value;
  const searchLink = `http://127.0.0.1:8090/musicals/search?field=${field}&query=${query}`;
  console.log(searchLink);
  fetch(searchLink)
    .then((response) => response.json())
    .then((body) => renderMusicals(body))
    .catch((error) => alert(error));
});

const showMusicals = document.getElementById('show_musicals');

/** executes formatting function on entire object 'musicals' */
showMusicals.addEventListener('click', async (event) => {
  event.preventDefault();
  fetch('http://127.0.0.1:8090/musicals')
    .then((response) => response.json())
    .then((body) => renderMusicals(body))
    .catch((error) => alert(error));
});

const submitMusical = document.getElementById('submit_musical');

/** Parses form data to create new instance of object 'musicals' and executes formatting function */
submitMusical.addEventListener('click', async (event) => {
  event.preventDefault();
  const newtitle = document.getElementById('newtitle').value;
  const newcomposer = document.getElementById('newcomposer').value;
  const newvoices = document.getElementById('newvoices').value;
  const newmusical = {
    title: newtitle,
    composer: newcomposer,
    voices: newvoices,
  };
  fetch('http://127.0.0.1:8090/musicals/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newmusical),
  }).then((response) => {
    if (response.ok) {
      console.log('Thanks for submitting a new musical!');
    } else {
      alert('error');
    }
  }).catch((error) => alert(error));

  fetch('http://127.0.0.1:8090/musicals')
    .then((response) => response.json())
    .then((body) => renderMusicals(body))
    .catch((error) => alert(error));
});

/**
 * Formats instances of JSON object 'comments' as html
 * @param {Object} comments - a JSON object of all comments
 */
function renderComments(comments) {
  console.log(comments);
  document.getElementById('comment').innerHTML = '';
  comments.forEach((comment) => {
    const newTile = `
    <div class="col-xl-12 col-lg-12 mb-4">
      <div class="tm-bg-gray p-5 h-100">
        <h3 class="tm-text-primary mb-3">${comment.user}:</h3>
        <p class="mb-5">${comment.text}</p>
      </div>
    </div>
    `;
    document.getElementById('comment').innerHTML += newTile;
  });
}

const searchComments = document.getElementById('search_comments');

/** Parses form data as parameters for /search URL and executes formatting function for results */
searchComments.addEventListener('click', async (event) => {
  event.preventDefault();
  const field = document.getElementById('comment_field').value;
  const query = document.getElementById('comment_query').value;
  const searchLink = `http://127.0.0.1:8090/comments/search?field=${field}&query=${query}`;
  console.log(searchLink);
  fetch(searchLink)
    .then((response) => response.json())
    .then((body) => renderComments(body))
    .catch((error) => alert(error));
});

const submitComment = document.getElementById('submit_comment');

/** Parses form data to create new instance of object 'comments' and executes formatting function */
submitComment.addEventListener('click', async (event) => {
  event.preventDefault();
  const newuser = document.getElementById('newuser').value;
  const newtext = document.getElementById('newtext').value;
  const newcomment = {
    user: newuser,
    text: newtext,
  };
  fetch('http://127.0.0.1:8090/comments/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newcomment),
  }).then((response) => {
    if (response.ok) {
      console.log('Thanks for submitting your comment!');
    } else {
      alert('error');
    }
  }).catch((error) => alert(error));

  fetch('http://127.0.0.1:8090/comments')
    .then((response) => response.json())
    .then((body) => renderComments(body))
    .catch((error) => alert(error));
});

const showComments = document.getElementById('show_comments');

/** executes formatting function on entire object 'comments' */
showComments.addEventListener('click', async (event) => {
  event.preventDefault();
  fetch('http://127.0.0.1:8090/comments')
    .then((response) => response.json())
    .then((body) => renderComments(body))
    .catch((error) => alert(error));
});

//  document.getElementById('Level')
//    .addEventListener('click', (event) => {
//      event.preventDefault();
//      fetch('http://127.0.0.1:8090/josh')
//        .then((response) => response.json())
//        .then((body) => {
//          // console.log(body);
//          document.getElementById('Level').innerHTML = body.level;
//        })
//        .catch((error) => alert(error));
//    });

/** executes both formatting functions upon loading the page */
document.addEventListener('DOMContentLoaded', () => {
  fetch('http://127.0.0.1:8090/musicals')
    .then((response) => response.json())
    .then((body) => renderMusicals(body))
    .catch((error) => alert(error));

  fetch('http://127.0.0.1:8090/comments')
    .then((response) => response.json())
    .then((body) => renderComments(body))
    .catch((error) => alert(error));
});
