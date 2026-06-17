export const Log = async (stack, level, packageName, message) => {
    try {
        await fetch("http://4.224.186.213/evaluation-service/log", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
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
    }
};
