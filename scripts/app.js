let lastMessage = "";
document.getElementById("conversation").value = ""; // textarea boşaltılır

document.getElementById("stepBtn").addEventListener("click", async () => {
    const agentAname = document.getElementById("agentAname").value.trim();
    const agentArole = document.getElementById("agentArole").value.trim();
    const agentAmodel = document.getElementById("agentAmodel").value;

    const agentBname = document.getElementById("agentBname").value.trim();
    const agentBrole = document.getElementById("agentBrole").value.trim();
    const agentBmodel = document.getElementById("agentBmodel").value;

    const startMessage = document.getElementById("startMessage").value.trim();
    const convoBox = document.getElementById("conversation");
    const errorBox = document.getElementById("errorBox");
    const loading = document.getElementById("loading");

    errorBox.textContent = "";

    // İlk adımda başlangıç mesajını al
    if (!lastMessage) {
        lastMessage = startMessage;
        convoBox.value += `Başlangıç: ${lastMessage}\n\n`;
    }

    try {
        loading.style.display = "block";

        // Ajan A yanıtı
        const promptA = `${agentAname} (${agentArole}) olarak yanıt ver:\n${lastMessage}`;
        const outputA = await runModel(agentAmodel, promptA);
        convoBox.value += `${agentAname}: ${outputA}\n\n`;

        // Ajan B yanıtı
        const promptB = `${agentBname} (${agentBrole}) olarak yanıt ver:\n${outputA}`;
        const outputB = await runModel(agentBmodel, promptB);
        convoBox.value += `${agentBname}: ${outputB}\n\n`;

        lastMessage = outputB;

    } catch (err) {
        errorBox.textContent = err.message;
    } finally {
        loading.style.display = "none";
    }
});

document.getElementById("downloadBtn").addEventListener("click", () => {
    const convo = document.getElementById("conversation").value;
    if (!convo) {
        alert("Diyalog alanı boş!");
        return;
    }

    const blob = new Blob([convo], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "diyalog.txt"; // Dosya adı
    a.click();
    URL.revokeObjectURL(url);
});

async function runModel(model, prompt) {
    if (model === "gemini") return await sendToGemini(prompt);
    if (model === "deepseek") return await sendToDeepSeek(prompt);
    if (model === "chatgpt") return await sendToChatGPT(prompt);
    if (model === "watsonx") return await sendToWatsonX(prompt);
    if (model === "claude") return await sendToClaude(prompt);
    if (model === "mistral") return await sendToMistral(prompt);
    if (model === "cohere") return await sendToCohere(prompt);
    if (model === "ai21") return await sendToAI21(prompt);
    if (model === "huggingface") return await sendToHF(prompt);

    throw new Error("Bilinmeyen model: " + model);
}