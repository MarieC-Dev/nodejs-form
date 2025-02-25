const nodeForm = document.querySelector('#nodeForm')
const username = document.querySelector('#name');
const email = document.querySelector('#email');
const fileInput = document.querySelector('#image');
const contentSection = document.querySelector('.contentSection');
const url = 'http://localhost:3000/';

function getData() {
    fetch(url)
        .then((resp) => { 
            return resp.json();
        })
        .then((data) => {
            let users = data;
    
            users.map((user) => {
                let userDiv = document.createElement('div');
                let name = document.createElement('h1');
                let email = document.createElement('p');

                userDiv.setAttribute('class', 'user'); 
                
                name.innerText = `${user.username}`;
                email.innerText = `${user.userEmail}`;
                
                userDiv.appendChild(name);
                userDiv.appendChild(email);

                if(user.userFileName) {
                    let imgDiv = document.createElement('div'); 
                    let img = document.createElement('img');
                    
                    imgDiv.setAttribute('class', 'containerImg');                
                    img.setAttribute('src', url + 'uploads/' + user.userFileName);

                    imgDiv.appendChild(img);
                    userDiv.appendChild(imgDiv);
                }

                contentSection.appendChild(userDiv);
            })
        })
        .catch((error) => {
            console.log('Erreur Fetch :', error);
        })
}

/* nodeForm.addEventListener('submit', (event) => {
    event.preventDefault();

    fetch('http://localhost:3000/api/user', {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json; charset=UTF-8'
        }),
        body: JSON.stringify({
            name: username.value,
            email: email.value,
            file: fileInput.value,
        }),
    }).then((res) => {
        console.log('Réponse reçue :', res);
        return res.json();
    })
    .then((data) => {
        console.log('Données reçues :', data);
    })
    .catch((error) => {
        console.error('Erreur Fetch :', error);
    });

    console.log('fetch');
    window.location.reload();
}); */

getData();