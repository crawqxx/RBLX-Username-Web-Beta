const fetch = require('node-fetch');

exports.handler = async function(event, context) {
    const { username } = event.queryStringParameters;
    const url = `https://auth.roblox.com/v1/usernames/validate?username=${username}&birthday=2006-09-21`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        return {
            statusCode: 200,
            body: JSON.stringify(data),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Failed to fetch data" }),
        };
    }
};
