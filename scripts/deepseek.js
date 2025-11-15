// deepseek.js - DeepSeek API Wrapper

const DEEPSEEK_API_KEY = "DEEPSEEK_API_KEYINIZI_YAZIN"; // Buraya kendi DeepSeek key'inizi yazın
const DEEPSEEK_MODEL = "deepseek-chat";

async function sendToDeepSeek(inputText) {
    const loading = document.getElementById("loading");
    const errorBox = document.getElementById("errorBox");

    loading.classList.add("active");
    errorBox.textContent = "";


    try {
        const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${DEEPSEEK_API_KEY}`
            },
            body: JSON.stringify({
                model: DEEPSEEK_MODEL,
                messages: [
                    { role: "user", content: inputText }
                ]
            })
        });

        if (!response.ok) {
            const err = await response.json();
            throw new Error(err.error?.message || "DeepSeek API error");
        }

        const data = await response.json();
        return data.choices[0].message.content;

    } catch (err) {
        errorBox.textContent = errorBox.textContent+" DeepSeek Hatası: " + err.message;
        return "DeepSeek Hatası: " + err.message;

    } finally {
        errorBox.textContent = errorBox.textContent+" DeepSeek Debug-5 ";
        loading.classList.remove("active");
    }
}
