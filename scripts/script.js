// first task

function reverseString(str) {
    return str.split('').reverse().join('');
}

function updateOutput() {
    const input = document.getElementById('inputText').value;
    const output= document.getElementById('output');
    output.style.color = 'black';
    output.textContent = reverseString(input);
}

document.getElementById('inputText').addEventListener('input', () => {
    clearTimeout(window.inputTimeout);
    window.inputTimeout = setTimeout(updateOutput, 1000);
});

// second task

const apiKey = 'MeKagcUG1UCC3SGWuD2wlwGLDKj1iOCOjhCD59gg'; 

async function fetchAPOD(date) {
    try {
        const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`);
        if (!response.ok) {
            throw new Error('Error fetching data from NASA API.');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}

function updateData(data) {
    const image = document.getElementById('imageNASA');
    const description = document.getElementById('description');
    image.src = data.url;
    description.textContent = data.explanation;
}

function buttonClick(event) {
    const date = event.target.dataset.date;
    fetchAPOD(date)
        .then((data) => {
            updateData(data);
            const containerAPOD = document.querySelector('.containerAPOD');
            containerAPOD.style.display = 'block';
            const descriptionError = document.getElementById('descriptionError');
            descriptionError.textContent = '';
        })
        .catch((error) => {
            const containerAPOD = document.querySelector('.containerAPOD');
            containerAPOD.style.display = 'none';
            const descriptionError = document.getElementById('descriptionError');
            descriptionError.textContent = 'An error occurred while fetching data: ' + error.message;
        })
        .finally(() => {
            alert('Request completed.');
        });
}

const buttonsContainer = document.getElementById('buttonsContainer');
for (let day = 1; day <= 30; day++) {
    const button = document.createElement('button');
    button.className = 'buttons';
    button.textContent = `September ${day}`;
    button.dataset.date = `2023-09-${day}`;
    button.addEventListener('click', buttonClick);
    buttonsContainer.appendChild(button);
}

// third task

function fetchGithubData(username) {
    return fetch(`https://api.github.com/users/${username}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Invalid username or GitHub API request error.');
            }
            return response.json();
        });
}

function displayGithubUser() {
    const username = document.getElementById('githubInput').value;

    fetchGithubData(username)
        .then(user => {
            const descriptionRequest = document.getElementById('descriptionRequest');
            descriptionRequest.textContent = 'Request completed. Check the console.';
            console.log('GitHub User', user);
        })
        .catch(error => {
            const descriptionRequest = document.getElementById('descriptionRequest');
            descriptionRequest.textContent = 'Error fetching GitHub URL: ' + error.message;
            console.error('Error fetching GitHub data', error);
        });
}

const githubInput = document.getElementById('githubInput');
githubInput.addEventListener('change', displayGithubUser);
