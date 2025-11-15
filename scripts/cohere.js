const COHERE_API_KEY = "COHERE_API_KEYINIZ";

async function sendToCohere(userInput) {
    try {
        const response = await fetch("https://api.cohere.ai/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${COHERE_API_KEY}`
            },
            body: JSON.stringify({
                model: "xlarge",
                prompt: userInput,
                max_tokens: 1000,
                temperature: 0.7
            })
        });
        if (!response.ok) throw new Error("Cohere API hatası");
        const data = await response.json();
        return data.generations[0].text;
    } catch (err) {
        throw new Error("Cohere Hatası: " + err.message);
    }
}