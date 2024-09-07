// script.js

function generateRandomUsername(length = 5) {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789_';
    let username;
    do {
        username = '';
        for (let i = 0; i < length; i++) {
            username += characters.charAt(Math.floor(Math.random() * characters.length));
        }
    } while (username.startsWith('_') || username.endsWith('_') || username.includes('kkk'));
    return username;
}

function generateUsernames() {
    const numberOfUsernames = document.getElementById('numberOfUsernames').value;
    const usernameList = document.getElementById('usernameList');
    usernameList.innerHTML = '';

    for (let i = 0; i < numberOfUsernames; i++) {
        const username = generateRandomUsername();
        const div = document.createElement('div');
        div.textContent = username;
        usernameList.appendChild(div);
    }
}

async function checkUsername() {
    const username = document.getElementById('usernameToCheck').value;
    const checkResult = document.getElementById('checkResult');
    checkResult.textContent = 'Checking...';

    // Simulate API request for checking username (replace with actual API call)
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate delay

    // Random result for demonstration purposes
    const result = Math.random() > 0.5 ? 'Taken' : 'Available';
    checkResult.textContent = `Username "${username}" is ${result}.`;
}
