import { LongMemoryManager } from "./longmemory.js";

let lastMessage = "";
// MEMORY MODÜLLERİ
const memoryA = new LongMemoryManager(runModel, sendToGemini);
const memoryB = new LongMemoryManager(runModel, sendToGemini);

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

        // -----------------------------------------------------
        //   AJAN A — memoryA kullanır
        // -----------------------------------------------------
        memoryA.addMessage("User", lastMessage);
        await memoryA.updateSummaryIfNeeded();

        const promptA =
            `${agentAname} (${agentArole}) olarak yanıt ver:\n` +
            memoryA.buildPrompt(lastMessage);

        const outputA = await runModel(agentAmodel, promptA);

        convoBox.value += `${agentAname}: ${outputA}\n\n`;
        memoryA.addMessage(agentAname, outputA);


        // -----------------------------------------------------
        //   AJAN B — memoryB kullanır
        // -----------------------------------------------------
        memoryB.addMessage(agentAname, outputA);
        await memoryB.updateSummaryIfNeeded();

        const promptB =
            `${agentBname} (${agentBrole}) olarak yanıt ver:\n` +
            memoryB.buildPrompt(outputA);

        const outputB = await runModel(agentBmodel, promptB);

        convoBox.value += `${agentBname}: ${outputB}\n\n`;
        memoryB.addMessage(agentBname, outputB);


        lastMessage = outputB;

    } catch (err) {
        errorBox.textContent = err.message;
    } finally {
        loading.style.display = "none";
    }
});

// ----------------------------------------------------
// TXT Olarak Çıktı Alma
// ----------------------------------------------------
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
    a.download = "diyalog.txt";
    a.click();

    URL.revokeObjectURL(url);
});

// ----------------------------------------------------
// Model Router 
// ----------------------------------------------------
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

// ----------------------------------------------------
// Memory Panel Aç/Kapat
// ----------------------------------------------------
document.getElementById("showMemoryBtn").addEventListener("click", () => {
    const box = document.getElementById("memoryContainer");
    box.style.display = box.style.display === "none" ? "block" : "none";

    // Panel açılırken hafızayı ekrana yaz
    if (box.style.display === "block") {
        document.getElementById("memoryAtext").textContent = memoryA.exportMemory();
        document.getElementById("memoryBtext").textContent = memoryB.exportMemory();
    }
});

// ----------------------------------------------------
// Hafızayı Temizle
// ----------------------------------------------------
document.getElementById("clearMemoryBtn").addEventListener("click", () => {

    memoryA.clearMemory();
    memoryB.clearMemory();

    alert("Hafıza temizlendi!");
});

// ----------------------------------------------------
// Hafızayı JSON Olarak İndir
// ----------------------------------------------------
document.getElementById("downloadMemoryBtn").addEventListener("click", () => {

    const data = {
        agentA: JSON.parse(memoryA.exportMemory()),
        agentB: JSON.parse(memoryB.exportMemory())
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: "application/json"
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "memory.json";
    a.click();

    URL.revokeObjectURL(url);
});

// ----------------------------------------------------
// JSON Hafıza Yükleme
// ----------------------------------------------------
document.getElementById("uploadMemoryFile").addEventListener("change", async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const text = await file.text();
    const json = JSON.parse(text);

    if (json.agentA) memoryA.importMemory(json.agentA);
    if (json.agentB) memoryB.importMemory(json.agentB);

    alert("Hafıza başarıyla yüklendi!");
});