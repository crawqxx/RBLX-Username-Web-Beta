// Define a function to fetch Roblox username availability
async function checkRobloxUsername(username) {
    const url_2 = `https://auth.roblox.com/v1/usernames/validate?birthday=2006-09-21T07:00:00.000Z&context=Signup&username=${username}`;

    try {
        const response = await fetch(url_2);
        const data = await response.json();

        if (data.code === 0) {
            return "available";
        } else if (data.code === 1) {
            return "taken";
        } else {
            return "error";
        }
    } catch (error) {
        console.error("Failed to fetch data", error);
        return "error";
    }
}

// Event listeners for buttons
document.getElementById('generate-usernames').addEventListener('click', () => {
    document.getElementById('main-menu').classList.add('hidden');
    document.getElementById('generation-section').classList.remove('hidden');
});

document.getElementById('username-checker').addEventListener('click', () => {
    document.getElementById('main-menu').classList.add('hidden');
    document.getElementById('username-checker-section').classList.remove('hidden');
});

document.getElementById('settings').addEventListener('click', () => {
    document.getElementById('main-menu').classList.add('hidden');
    document.getElementById('settings-section').classList.remove('hidden');
});

document.getElementById('generate').addEventListener('click', async () => {
    const count = document.getElementById('username-count').value;
    const generatedUsernamesDiv = document.getElementById('generated-usernames');
    generatedUsernamesDiv.innerHTML = '';

    for (let i = 0; i < count; i++) {
        const username = generateRandomUsername(); // This function should be defined
        const status = await checkRobloxUsername(username);
        generatedUsernamesDiv.innerHTML += `<p>${username} - ${status}</p>`;
    }
});

document.getElementById('back-to-menu').addEventListener('click', () => {
    document.getElementById('generation-section').classList.add('hidden');
    document.getElementById('main-menu').classList.remove('hidden');
});

document.getElementById('back-from-settings').addEventListener('click', () => {
    document.getElementById('settings-section').classList.add('hidden');
    document.getElementById('main-menu').classList.remove('hidden');
});

// Define a function to generate a random username
function generateRandomUsername(length = 5) {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789_';
    let username = '';
    for (let i = 0; i < length; i++) {
        username += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return username;
}

function generateUsernameByFilter(filter) {
    switch (filter) {
        case 1:
            return generateRandomUsername(5);
        case 2:
            return generate6LetterUsername();
        case 3:
            return generate5SymbolsWith3Same();
        case 4:
            return generate6SymbolsWith3or4Same();
        case 5:
            return generateThinName();
        default:
            return '';
    }
}

function generate6LetterUsername() {
    const characters = 'abcdefghijklmnopqrstuvwxyz';
    let username = '';
    for (let i = 0; i < 6; i++) {
        username += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return username;
}

function generate5SymbolsWith3Same() {
    const char = 'abcdefghijklmnopqrstuvwxyz0123456789_'.charAt(Math.floor(Math.random() * 36));
    return char.repeat(3) + generateRandomUsername(2);
}

function generate6SymbolsWith3or4Same() {
    const char = 'abcdefghijklmnopqrstuvwxyz0123456789_'.charAt(Math.floor(Math.random() * 36));
    const count = Math.random() > 0.5 ? 3 : 4;
    return char.repeat(count) + generateRandomUsername(6 - count);
}

function generateThinName() {
    const characters = 'til1j';
    const length = Math.random() > 0.5 ? 5 : 6;
    let username = '';
    for (let i = 0; i < length; i++) {
        username += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return username;
}
