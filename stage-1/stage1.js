// Function to fetch the latest notifications from the server
const fetchNotifications = async (token) => {
    // Making an authenticated request to the evaluation service
    const response = await fetch("http://4.224.186.213/evaluation-service/notifications", {
        headers: { "Authorization": `Bearer ${token}` }
    });
    const data = await response.json();
    return data.notifications;
};

// Main algorithm to sort and grab the top priority items
const getPriorityInbox = (notifications, n = 10) => {
    // Base scores for different notification categories
    // Placements are the most critical, so they get the highest base weight
    const typeWeights = {
        "Placement": 300,
        "Result": 200,
        "Event": 100
    };

    const scored = notifications.map(notif => {
        const weight = typeWeights[notif.Type] || 0;
        // Converting the timestamp into milliseconds to use as a tiebreaker
        const timeMs = new Date(notif.Timestamp.replace(" ", "T")).getTime();
        
        // This math guarantees that a newer notification only beats an older one 
        // if they are in the exact same category. 
        const score = weight * 1e13 + timeMs; 
        return { ...notif, score };
    });

    // Sort descending so the highest score is at the top
    scored.sort((a, b) => b.score - a.score);

    // Grab the top 'n' and clean up the temporary score property before returning
    return scored.slice(0, n).map(n => {
        delete n.score;
        return n;
    });
};

(async () => {
    // Hardcoding the token here for the script to run seamlessly
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJzaGFyaW5ndW0xMUBnbWFpbC5jb20iLCJleHAiOjE3ODE2NzcwOTAsImlhdCI6MTc4MTY3NjE5MCwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6ImMxOTc2OGI2LTdiOTUtNDdhNS04ZjlmLTBkYzkzMDNkNDBlMyIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6InNoYXJvbiB2YXJnaGVzZSIsInN1YiI6IjEzYzFiZDg2LWFmZjEtNDg1NS1hY2I3LWEwZDhlZGFjODkzYiJ9LCJlbWFpbCI6InNoYXJpbmd1bTExQGdtYWlsLmNvbSIsIm5hbWUiOiJzaGFyb24gdmFyZ2hlc2UiLCJyb2xsTm8iOiIyNTI5OSIsImFjY2Vzc0NvZGUiOiJqdUZwaHYiLCJjbGllbnRJRCI6IjEzYzFiZDg2LWFmZjEtNDg1NS1hY2I3LWEwZDhlZGFjODkzYiIsImNsaWVudFNlY3JldCI6ImRFc0d4akZHeUhzUVlHY3IifQ.SozkmMkHKEKsrMfDCHLmwQ-icTpZQYMBkdNwCvZxPkk";
    
    const notifications = await fetchNotifications(token);
    const top10 = getPriorityInbox(notifications, 10);
    
    // Print out our top 10 nicely formatted
    console.log(JSON.stringify(top10, null, 2));
})();
