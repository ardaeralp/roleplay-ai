// watsonx.js
const WATSONX_API_KEY = "WATSONX_API_KEYINIZI_YAZIN";
const WATSONX_API_URL = "https://api.us-south.assistant.watson.cloud.ibm.com/v2/assistants/YOUR_ASSISTANT_ID/sessions";

async function sendToWatsonX(userInput) {
    try {
        // WatsonX API session oluşturma (basit örnek)
        const response = await fetch(WATSONX_API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${WATSONX_API_KEY}`
            },
            body: JSON.stringify({
                input: { text: userInput }
            })
        });

        if (!response.ok) {
            const err = await response.json();
            throw new Error(err.error || "WatsonX API hatası");
        }

        const data = await response.json();
        return data.output.generic[0].text || "";

    } catch (err) {
        throw new Error("WatsonX Hatası: " + err.message);
    }
}