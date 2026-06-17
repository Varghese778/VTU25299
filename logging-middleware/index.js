// Core logging utility. We export this so any part of the app can easily shoot off logs.
export const Log = async (stack, level, packageName, message) => {
    try {
        // Send a non-blocking POST request to our evaluation logging server
        await fetch("http://4.224.186.213/evaluation-service/log", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // We grab the token from either the global context (used in our Node scripts) 
                // or local storage (if we're running in the browser).
                "Authorization": `Bearer ${globalThis.AFFORDMED_TOKEN || localStorage.getItem('AFFORDMED_TOKEN')}`
            },
            body: JSON.stringify({
                stack,
                level,
                package: packageName,
                message
            })
        });
    } catch (e) {
        // We purposely swallow errors here so a failed log doesn't crash the main application
    }
};
