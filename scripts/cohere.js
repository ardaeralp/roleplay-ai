const COHERE_API_KEY = "";


async function sendToCohere(userInput) {
    try {
        const response = await fetch("https://api.cohere.ai/v2/chat", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${COHERE_API_KEY}`
            },
            body: JSON.stringify({
            model: "command-a-03-2025",
            messages: [
                {
                    role: "user",
                    content: userInput,
                },
            ],
            })
        });
        if (!response.ok) throw new Error("Cohere API hatası");
        const data = await response.json();
        return data.message.content[0].text;
    } catch (err) {
        throw new Error("Cohere Hatası: " + err.message);
    }
}
