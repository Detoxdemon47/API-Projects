let jokes = document.getElementById('jokesId');


function showJoke(){
    fetch('https://official-joke-api.appspot.com/jokes/random').then( responce => responce.json() ).then(data => {
        jokes.innerHTML = `${data.setup} <br> ${data.punchline}`
    });
}