const AI21_API_KEY = "AI21_API_KEYINIZ";

async function sendToAI21(userInput) {
    try {
        const response = await fetch("https://api.ai21.com/studio/v1/j1-jumbo/complete", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${AI21_API_KEY}`
            },
            body: JSON.stringify({
                prompt: userInput,
                maxTokens: 1000,
                temperature: 0.7
            })
        });
        if (!response.ok) throw new Error("AI21 API hatası");
        const data = await response.json();
        return data.completions[0].data.text;
    } catch (err) {
        throw new Error("AI21 Hatası: " + err.message);
    }
}