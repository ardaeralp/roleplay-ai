// ------------------------------------------------------
// longmemory.js — Professional Long Memory Manager
// ------------------------------------------------------

export class LongMemoryManager {

    constructor(systemPrompt = null, summaryLLM = null) {
        this.systemPrompt = systemPrompt || "A conversation memory system.";
        this.summaryLLM = summaryLLM; // Dış LLM fonksiyonu (ör: sendToGemini)

        this.messages = [];     // Tam ham hafıza
        this.summary = "";      // Özetlenmiş hafıza
        this.threshold = 20;    // 20 mesajda bir özetleme
        this.minForSummary = 8; // Minimum ihtiyaç duyulan mesaj
    }

    // --------------------------------------------------
    // Hafızaya mesaj ekleme
    // --------------------------------------------------
    addMessage(role, content) {
        this.messages.push({ role, content });
    }

    // --------------------------------------------------
    // Hafızanın dışarıya okuma versiyonu
    // --------------------------------------------------
    exportMemory() {
        return JSON.stringify({
            systemPrompt: this.systemPrompt,
            summary: this.summary,
            messages: this.messages
        }, null, 2);
    }

    // --------------------------------------------------
    // JSON’dan hafıza yükleme
    // --------------------------------------------------
    importMemory(obj) {
        this.systemPrompt = obj.systemPrompt || this.systemPrompt;
        this.summary = obj.summary || "";
        this.messages = obj.messages || [];
    }

    // --------------------------------------------------
    // Hafıza temizleme
    // --------------------------------------------------
    clearMemory() {
        this.summary = "";
        this.messages = [];
    }

    // --------------------------------------------------
    // Özetleme gerekip gerekmediğine bakılır
    // --------------------------------------------------
    async updateSummaryIfNeeded() {
        if (!this.summaryLLM) return; // Özetleyecek LLM yoksa dur

        if (this.messages.length < this.threshold) {
            return; // Henüz özetleme eşiğinde değil
        }

        // Özetlemeden önce yeterli içerik olduğundan emin ol
        if (this.messages.length < this.minForSummary) {
            return;
        }

        await this.generateSummary();
    }

    // --------------------------------------------------
    // Özet oluşturma
    // --------------------------------------------------
    async generateSummary() {
        if (!this.summaryLLM) return;

        const conversationText = this.messages
            .map(msg => `${msg.role.toUpperCase()}: ${msg.content}`)
            .join("\n");

        const summaryPrompt = `
Aşağıdaki konuşmanın kısa ve bütüncül bir özetini oluştur.
Hem kullanıcı hem de asistan mesajlarındaki bağlamı kaybetme.

Konuşma:
${conversationText}

Mevcut özet:
${this.summary}

Yeni güncellenmiş özet oluştur. 
Gereksiz detay yok, yalnızca kalıcı bilgi.
`;

        // LLM'e gönder
        const newSummary = await this.summaryLLM(summaryPrompt);

        // Önceki özet + yeni özet karıştırılır
        this.summary = newSummary;

        // Ham mesajlar hafifletilir → hafıza büyümez
        this.messages = [];
    }

    // --------------------------------------------------
    // LLM’e verilecek final prompt hazırlama
    // --------------------------------------------------
    buildPrompt(currentUserPrompt) {
        let prompt = "";

        prompt += `SİSTEM\n${this.systemPrompt}\n\n`;
        if (this.summary.trim().length > 0) {
            prompt += `===== ÖZETLENMİŞ HAFIZA =====\n${this.summary}\n\n`;
        }
        if (this.messages.length > 0) {
            prompt += `===== SON MESAJLAR =====\n`;
            for (const msg of this.messages) {
                prompt += `${msg.role.toUpperCase()}: ${msg.content}\n`;
            }
            prompt += `\n`;
        }

        prompt += `===== YENİ GİRDİ =====\n${currentUserPrompt}\n`;

        return prompt;
    }
}