const checkUsernameStatus = async (username) => {
    const url1 = `https://www.roblox.com/users/profile?username=${username}`;
    const url2 = `https://auth.roblox.com/v1/usernames/validate?birthday=2006-09-21T07:00:00.000Z&context=Signup&username=${username}`;
    
    try {
        // Check the first URL
        const response1 = await fetch(url1);
        if (response1.ok) {
            const pageContent = await response1.text();
            if (pageContent.toLowerCase().includes("banned")) {
                return "banned";
            }
            return "taken"; // Account exists (taken)
        }
        
        // Check the second URL
        const response2 = await fetch(url2);
        const validationData = await response2.json();
        
        if (validationData.code === 0) {
            return "available"; // Username is available
        } else if (validationData.code === 1) {
            return "taken"; // Account exists (taken)
        } else {
            return "error"; // Return the validation code
        }
    } catch (error) {
        console.error('Error checking username:', error);
        return "error"; // Handle errors
    }
};
