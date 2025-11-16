const AI21_API_KEY = "AI21_API_KEYINIZ";

async function sendToAI21(userInput) {
    try {
        const response = await fetch("https://api.ai21.com/studio/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${AI21_API_KEY}`
            },
            body: JSON.stringify({
                model: "jamba-large",
                messages: [
                    { role: 'user', content: userInput }
            ],
                maxTokens: 1024
            })
        });
        if (!response.ok) throw new Error("AI21 API hatası");

        const data = await response.json();

        if (!data.choices || data.choices.length === 0 || !data.choices[0].message || !data.choices[0].message.content) {
            console.error("AI21 raw response:", data);
            throw new Error("AI21 returned an unexpected structure---->"+ JSON.stringify(data));
        }
        return data.choices[0].message.content;
    } catch (err) {
        throw new Error("AI21 Hatası: " + err.message);
    }
}
