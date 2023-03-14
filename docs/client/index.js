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
