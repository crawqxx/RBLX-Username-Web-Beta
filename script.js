document.getElementById('generate').addEventListener('click', generateUsernames);

function generateUsernames() {
    const numberOfUsernames = 10; // Example: generate 10 usernames
    let usernames = [];
    for (let i = 0; i < numberOfUsernames; i++) {
        usernames.push(generateRandomUsername(5));
    }
    displayUsernames(usernames);
}

function generateRandomUsername(length) {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789_';
    let username = '';
    for (let i = 0; i < length; i++) {
        username += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return username;
}

function displayUsernames(usernames) {
    const usernamesDiv = document.getElementById('usernames');
    usernamesDiv.innerHTML = usernames.join('<br>');
}
