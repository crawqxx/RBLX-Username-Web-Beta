const url_1 = 'https://www.roblox.com/users/profile?username=';
const url_2 = 'https://auth.roblox.com/v1/usernames/validate?birthday=2006-09-21T07:00:00.000Z&context=Signup&username=';

async function checkUsername() {
    const username = document.getElementById('username-input').value.trim();
    if (username === '') {
        alert('Please enter a username.');
        return;
    }
    
    document.getElementById('status').innerText = 'Checking...';
    
    try {
        const [profileResponse, validationResponse] = await Promise.all([
            fetch(`${url_1}${username}`),
            fetch(`${url_2}${username}`)
        ]);

        if (profileResponse.ok) {
            const profileText = await profileResponse.text();
            if (profileText.toLowerCase().includes('banned')) {
                document.getElementById('result').innerText = `Username ${username} is banned.`;
                return;
            }
        }

        if (validationResponse.ok) {
            const validationData = await validationResponse.json();
            const code = validationData.code;

            switch (code) {
                case 0:
                    document.getElementById('result').innerText = `Username ${username} is available.`;
                    break;
                case 1:
                    document.getElementById('result').innerText = `Username ${username} is taken.`;
                    break;
                default:
                    document.getElementById('result').innerText = `Username ${username} is invalid.`;
                    break;
            }
        } else {
            document.getElementById('result').innerText = `Error checking username ${username}.`;
        }
    } catch (error) {
        document.getElementById('result').innerText = `Error: ${error.message}`;
    } finally {
        document.getElementById('status').innerText = '';
    }
}

function generateUsername() {
    const filter = document.getElementById('filter-select').value;
    let username = '';

    switch (parseInt(filter)) {
        case 1:
            username = generateRandomUsername(5);
            break;
        case 2:
            username = generate6LetterUsername();
            break;
        case 3:
            username = generate5SymbolsWith3Same();
            break;
        case 4:
            username = generate6SymbolsWith3Or4Same();
            break;
        case 5:
            username = generateThinName();
            break;
        default:
            username = 'Invalid filter';
            break;
    }

    document.getElementById('result').innerText = `Generated Username: ${username}`;
}

// Functions to generate usernames based on the filter
function generateRandomUsername(length) {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789_';
    let username = '';
    for (let i = 0; i < length; i++) {
        username += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return username;
}

function generate6LetterUsername() {
    const chars = 'abcdefghijklmnopqrstuvwxyz';
    let username = '';
    for (let i = 0; i < 6; i++) {
        username += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return username;
}

function generate5SymbolsWith3Same() {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789_';
    const char = chars.charAt(Math.floor(Math.random() * chars.length));
    let username = char.repeat(3);
    for (let i = 0; i < 2; i++) {
        username += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return shuffle(username);
}

function generate6SymbolsWith3Or4Same() {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789_';
    const char = chars.charAt(Math.floor(Math.random() * chars.length));
    const count = Math.random() > 0.5 ? 3 : 4;
    let username = char.repeat(count);
    for (let i = 0; i < 6 - count; i++) {
        username += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return shuffle(username);
}

function generateThinName() {
    const chars = 'til1j';
    const length = Math.random() > 0.5 ? 5 : 6;
    let username = '';
    for (let i = 0; i < length; i++) {
        username += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return username;
}

function shuffle(str) {
    return str.split('').sort(() => Math.random() - 0.5).join('');
}
