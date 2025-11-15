const CLAUDE_API_KEY = "CLAUDE_API_KEYINIZ";

async function sendToClaude(userInput) {
    try {
        const response = await fetch("https://api.anthropic.com/v1/complete", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${CLAUDE_API_KEY}`
            },
            body: JSON.stringify({
                model: "claude-v1",
                prompt: userInput,
                max_tokens_to_sample: 1000
            })
        });
        if (!response.ok) {
            const err = await response.json();
            throw new Error(err.error?.message || "Claude API hatası");
        }
        const data = await response.json();
        return data.completion;
    } catch (err) {
        throw new Error("Claude Hatası: " + err.message);
    }
}