const MISTRAL_API_KEY = "MISTRAL_API_KEYINIZ";

async function sendToMistral(userInput) {
    try {
        const response = await fetch("https://corsproxy.io/?https://api.mistral.ai/v1/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${MISTRAL_API_KEY}`
            },
            body: JSON.stringify({
                model: "mistral-small-latest",
                prompt: userInput,
                max_tokens: 1000
            })
        });
        if (!response.ok) throw new Error("Mistral API hatası");
        const data = await response.json();
        return data.text;
    } catch (err) {
        throw new Error("Mistral Hatası: " + err.message);
    }
}