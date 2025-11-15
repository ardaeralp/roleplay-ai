// chatgpt.js
const OPENAI_API_KEY = "OPENAI_API_KEYINIZI_BURAYA_YAZIN";

async function sendToChatGPT(userInput) {
    const modelId = "gpt-4o-mini"; // İstersen değiştirilebilir

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: modelId,
                messages: [
                    { role: "user", content: userInput }
                ],
                max_tokens: 1000,
                temperature: 0.7
            })
        });

        if (!response.ok) {
            const err = await response.json();
            throw new Error(err.error?.message || "ChatGPT API error");
        }

        const data = await response.json();
        return data.choices[0].message.content;

    } catch (err) {
        throw new Error("ChatGPT Error: " + err.message);
    }
}