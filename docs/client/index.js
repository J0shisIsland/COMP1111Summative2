document.addEventListener('DOMContentLoaded', () =>{
    document.getElementById("Level")
    .addEventListener('click', function (event){
        event.preventDefault();
        fetch('http://127.0.0.1:8090/josh')
         .then(response => response.json())
         .then(body => 
            {
             //console.log(body); 
             document.getElementById('Level').innerHTML=body.level
            })
         .catch( (error) => alert(error))
    });

    let getRepertoire = document.getElementById("Repertoire");

     fetch('http://127.0.0.1:8090/josh')
        .then(response => response.json())
        .then(body => renderRepertoire(body.repertoire))
            //{
            //  //console.log(body); 
            //  document.getElementById('Repertoire').innerHTML=body.repertoire
            // })
        .catch( (error) => alert(error))
    });

function renderRepertoire (rep){
    //alert(rep);
    let container = document.getElementById('Repertoire');
    container.innerHTML = "";
    for(let piece of rep){
       let item = document.createElement('li')
       item.innerHTML = piece;
       container.appendChild(item);
    }
};

let submit = document.getElementById('submit_piece');

submit.addEventListener('click', async function(event){
   event.preventDefault();
   let newpiece = document.getElementById('newpiece').value;
   let parameters = {'newpiece': newpiece};
   let response = await fetch('http://127.0.0.1:8090/josh/add',{
   method: 'POST',
   headers: {
      'Content-Type': 'application/json'
   },
   body: JSON.stringify(parameters)
});
let body = await response.json();
renderRepertoire(body);
})