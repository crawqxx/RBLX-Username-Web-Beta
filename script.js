let showTakenUsernames = true;
let generationFilter = 1; // 1: Random 5 Symbols, 2: 6 Letters, etc.

document.getElementById('generate-usernames').addEventListener('click', () => {
    toggleVisibility('main-menu', 'generation-section');
});

document.getElementById('username-checker').addEventListener('click', () => {
    alert("Username checker coming soon!");
});

document.getElementById('settings').addEventListener('click', () => {
    toggleVisibility('main-menu', 'settings-section');
    updateSettingsUI();
});

document.getElementById('back-to-menu').addEventListener('click', () => {
    toggleVisibility('generation-section', 'main-menu');
});

document.getElementById('back-from-settings').addEventListener('click', () => {
    toggleVisibility('settings-section', 'main-menu');
});

document.getElementById('generate').addEventListener('click', async () => {
    const count = document.getElementById('username-count').value;
    if (!count || count < 1) return;
    document.getElementById('generated-usernames').innerHTML = '';
    for (let i = 0; i < count; i++) {
        const username = generateUsername();
        const status = await checkUsernameAvailability(username);
        displayUsername(username, status);
    }
});

document.getElementById('toggle-taken-usernames').addEventListener('click', () => {
    showTakenUsernames = !showTakenUsernames;
    updateSettingsUI();
});

document.getElementById('filter-selection').addEventListener('change', (e) => {
    generationFilter = parseInt(e.target.value);
});

function toggleVisibility(hideId, showId) {
    document.getElementById(hideId).classList.add('hidden');
    document.getElementById(showId).classList.remove('hidden');
}

function updateSettingsUI() {
    document.getElementById('show-taken-status').innerText = showTakenUsernames ? 'On' : 'Off';
}

function generateUsername() {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789_';
    let username = '';
    switch (generationFilter) {
        case 1:
            // Random 5 Symbols
            username = randomChars(chars, 5);
            break;
        case 2:
            // 6 Letters
            username = randomChars('abcdefghijklmnopqrstuvwxyz', 6);
            break;
        case 3:
            // 5 Symbols with 3 Same
            username = randomRepeat(5);
            break;
        case 4:
            // 6 Symbols with 3 or 4 Same
            username = randomRepeat(6);
            break;
        case 5:
            // Thin Name
            username = randomChars('til1j', randomInt(5, 6));
            break;
    }
    return username;
}

function randomChars(chars, length) {
    return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

function randomRepeat(length) {
    const char = randomChars('abcdefghijklmnopqrstuvwxyz0123456789_', 1);
    return char.repeat(3) + randomChars('abcdefghijklmnopqrstuvwxyz0123456789_', length - 3);
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function checkUsernameAvailability(username) {
    const response = await fetch(`https://auth.roblox.com/v1/usernames/validate?username=${username}&birthday=2006-09-21`);
    const result = await response.json();
    return result.code;
}

function displayUsername(username, status) {
    const statusMessage = status === 0 ? 'Available' : 'Taken';
    const statusColor = status === 0 ? 'green' : 'red';
    const container = document.createElement('div');
    container.innerHTML = `<span style="color: ${statusColor};">${username}: ${statusMessage}</span>`;
    document.getElementById('generated-usernames').appendChild(container);
}
