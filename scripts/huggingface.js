const HF_API_KEY = "HF_API_KEYINIZ";

async function sendToHF(userInput) {
    try {
        const response = await fetch("https://api-inference.huggingface.co/models/gpt2", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${HF_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ inputs: userInput })
        });
        if (!response.ok) throw new Error("Hugging Face API hatası");
        const data = await response.json();
        return data[0].generated_text || "";
    } catch (err) {
        throw new Error("Hugging Face Hatası: " + err.message);
    }
}