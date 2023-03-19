function renderMusicals(musicals) {
  console.log(musicals);
  document.getElementById('musical').innerHTML='';
    musicals.forEach((musical) => {
      let newTile = `
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">${musical.title}</h5>
            <p class="card-text"><b>Composers: </b>${musical.composer}<br>
            <b>Vocal Parts: </b><br>
            <ul id="voices">`;
              musical.voices.split(/,\s*/).forEach((voice) => {
                newTile += `<li>${voice}</li>`;
              });`
            </ul></p>
          </div>
        </div>`;
      document.getElementById('musical').innerHTML += newTile;
    })
}

const submitMusical = document.getElementById('submit_musical');

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
  });
  fetch('http://127.0.0.1:8090/musicals')
  .then((response) => response.json())
  .then((body) => renderMusicals(body))
  .catch((error) => alert(error));
});

//ALERT: Old stuff below
function renderRepertoire(rep) {
  // alert(rep);
  const container = document.getElementById('Repertoire');
  container.innerHTML = '';
  for (const piece of rep) {
    const item = document.createElement('li');
    item.innerHTML = piece;
    container.appendChild(item);
  }
}

function renderTitle(title) {
  const container = document.getElementById('Title');
  container.innerHTML = title;
}

function renderComposer(composer) {
  const container = document.getElementById('Composer');
  container.innerHTML = '<b>Composers: </b>' + composer;
}

function renderScoring(scoring) {
  const container = document.getElementById('Scoring');
  container.innerHTML = '';
  for (const part of scoring) {
    const item = document.createElement('li');
    item.innerHTML = part;
    container.appendChild(item)
  }
}

document.addEventListener('DOMContentLoaded', () => {
  fetch('http://127.0.0.1:8090/musicals')
  .then((response) => response.json())
  .then((body) => renderMusicals(body))
  .catch((error) => alert(error));
  
  fetch('http://127.0.0.1:8090/kink')
  .then((response) => response.json())
  .then((body) => renderTitle(body.title))
  .catch((error) => alert(error));

  fetch('http://127.0.0.1:8090/kink')
  .then((response) => response.json())
  .then((body) => renderComposer(body.composer))
  .catch((error) => alert(error));

  fetch('http://127.0.0.1:8090/kink')
  .then((response) => response.json())
  .then((body) => renderScoring(body.scoring))
  .catch((error) => alert(error));
  
  document.getElementById('Level')
    .addEventListener('click', (event) => {
      event.preventDefault();
      fetch('http://127.0.0.1:8090/josh')
        .then((response) => response.json())
        .then((body) => {
          // console.log(body);
          document.getElementById('Level').innerHTML = body.level;
        })
        .catch((error) => alert(error));
    });

  fetch('http://127.0.0.1:8090/josh')
    .then((response) => response.json())
    .then((body) => renderRepertoire(body.repertoire))
  // {
  //  //console.log(body);
  //  document.getElementById('Repertoire').innerHTML=body.repertoire
  // })
    .catch((error) => alert(error));
});

const submit = document.getElementById('submit_piece');

submit.addEventListener('click', async (event) => {
  event.preventDefault();
  const newpiece = document.getElementById('newpiece').value;
  const parameters = { newpiece };
  const response = await fetch('http://127.0.0.1:8090/josh/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(parameters),
  });
  const body = await response.json();
  renderRepertoire(body);
});
