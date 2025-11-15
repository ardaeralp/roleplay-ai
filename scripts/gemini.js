// gemini.js - Gemini API Wrapper

const GEMINI_API_KEY = ""; // Buraya kendi key'inizi yazın
const GEMINI_MODEL = "gemini-2.5-flash";

async function sendToGemini(inputText) {
    const loading = document.getElementById("loading");
    const errorBox = document.getElementById("errorBox");

    loading.classList.add("active");
    errorBox.textContent = "";

    try {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [
                        { parts: [{ text: inputText }] }
                    ],
                    generationConfig: {
                        maxOutputTokens: 2000,
                        temperature: 0.7
                    }
                })
            }
        );

        if (!response.ok) {
            const err = await response.json();
            throw new Error(err.error?.message || "Gemini API error");
        }

        const data = await response.json();
        return data.candidates[0].content.parts[0].text;

    } catch (err) {
        errorBox.textContent = "Gemini Hatası: " + err.message;
        return null;

    } finally {
        loading.classList.remove("active");
    }
}
