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

function renderMusicals(database) {
  const container = document.getElementById('Musicals');
  container.innerHTML = '';
  for (const piece of database) {
    const item = document.createElement('li');
    item.innerHTML = piece;
    container.appendChild(item)
  }
}

document.addEventListener('DOMContentLoaded', () => {
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
