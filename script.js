
let showTakenUsernames = true;
let generationFilter = 1;

// Function to generate usernames
function generateUsernames() {
    let numberOfUsernames = prompt('Enter how many usernames you want to generate:');
    let output = document.getElementById('output');
    output.innerHTML = 'Generating ' + numberOfUsernames + ' usernames...';

    for (let i = 0; i < numberOfUsernames; i++) {
        let username = generateUsernameByFilter();
        output.innerHTML += '<br>' + username;
    }
}

// Function to generate a username based on the selected filter
function generateUsernameByFilter() {
    switch (generationFilter) {
        case 1:
            return generateRandomUsername(5);
        case 2:
            return generate6LetterUsername();
        case 3:
            return generate5SymbolsWith3Same();
        case 4:
            return generate6SymbolsWith3Or4Same();
        case 5:
            return generateThinName();
        default:
            return 'Invalid Filter';
    }
}

// Random 5 Symbol generator
function generateRandomUsername(length) {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789_';
    let username = '';
    for (let i = 0; i < length; i++) {
        username += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return username;
}

// 6 Letters generator
function generate6LetterUsername() {
    const characters = 'abcdefghijklmnopqrstuvwxyz';
    let username = '';
    for (let i = 0; i < 6; i++) {
        username += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return username;
}

// 5 Symbols with 3 Same
function generate5SymbolsWith3Same() {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789_';
    let char = characters.charAt(Math.floor(Math.random() * characters.length));
    return char.repeat(3) + characters.charAt(Math.floor(Math.random() * characters.length)) + characters.charAt(Math.floor(Math.random() * characters.length));
}

// 6 Symbols with 3 or 4 Same
function generate6SymbolsWith3Or4Same() {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789_';
    let char = characters.charAt(Math.floor(Math.random() * characters.length));
    let count = Math.floor(Math.random() * 2) + 3;
    return char.repeat(count) + characters.charAt(Math.floor(Math.random() * characters.length));
}

// Thin Name generator
function generateThinName() {
    const thinChars = 'til1j';
    let length = Math.floor(Math.random() * 2) + 5;
    let username = '';
    for (let i = 0; i < length; i++) {
        username += thinChars.charAt(Math.floor(Math.random() * thinChars.length));
    }
    return username;
}

// Function to check username availability (placeholder)
function checkUsername() {
    let username = prompt('Enter a username to check:');
    let output = document.getElementById('output');
    output.innerHTML = 'Checking username...';
    // Simulate checking the username
    setTimeout(() => {
        output.innerHTML = username + ' is available.';
    }, 1000);
}

// Function to open the settings menu
function openSettings() {
    document.getElementById('settings').style.display = 'block';
}

// Function to close the settings menu
function closeSettings() {
    document.getElementById('settings').style.display = 'none';
}

// Function to change the filter in the settings menu
function changeFilter(filterNumber) {
    generationFilter = filterNumber;
    let filterText = '';
    switch (filterNumber) {
        case 1:
            filterText = 'Random 5 Symbol';
            break;
        case 2:
            filterText = '6 Letters';
            break;
        case 3:
            filterText = '5 Symbols with 3 Same';
            break;
        case 4:
            filterText = '6 Symbols with 3 or 4 Same';
            break;
        case 5:
            filterText = 'Thin Name';
            break;
        default:
            filterText = 'Unknown Filter';
    }
    document.getElementById('output').innerHTML = 'Selected filter: ' + filterText;
    closeSettings();
}
