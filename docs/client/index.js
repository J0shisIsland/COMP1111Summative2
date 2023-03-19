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

document.addEventListener('DOMContentLoaded', () => {
  fetch('http://127.0.0.1:8090/musicals')
  .then((response) => response.json())
  .then((body) => renderMusicals(body))
  .catch((error) => alert(error));
})