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

    document.getElementById("Repertoire")
    .addEventListener('click', function (event){
        event.preventDefault();
        fetch('http://127.0.0.1:8090/josh')
            .then(response => response.json())
            .then(body => renderRepertoire(body.repertoire))
               //{
               //  //console.log(body); 
               //  document.getElementById('Repertoire').innerHTML=body.repertoire
               // })
            .catch( (error) => alert(error))
    });
}
)

function renderRepertoire (rep){
    //alert(rep);
    let container = document.getElementById('Repertoire');
    container.innerHTML = "";
    for(let piece of rep){
       let item = document.createElement('li')
       item.innerHTML = piece;
       container.appendChild(item);
    }
    }