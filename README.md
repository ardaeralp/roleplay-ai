# RolePlay AI

**RolePlay AI**, kullanıcıların iki yapay zekâ ajanını (Agent A ve Agent B) kendi belirledikleri roller ve isimler ile adım adım konuşturabildiği bir web uygulamasıdır.  
Projede **dokuz farklı AI modeli** desteklenir:

- **Gemini** (Google)
- **DeepSeek** (resmi API)
- **ChatGPT** (OpenAI)
- **WatsonX** (IBM)
- **Claude** (Anthropic)
- **Mistral** (Mistral AI)
- **Cohere** (Cohere AI)
- **AI21 Labs** (Jurassic)
- **Hugging Face Inference** (HF)

Kullanıcı, hangi modelin hangi ajan tarafından kullanılacağını seçebilir ve diyalog **adım adım ilerler**.

---

## Özellikler

- **9 Model Desteği:** Gemini, DeepSeek, ChatGPT, WatsonX, Claude, Mistral, Cohere, AI21, Hugging Face  
- **Dinamik Model Seçimi:** Agent A ve Agent B için farklı modeller seçilebilir  
- **Kullanıcı Tarafından Rol ve İsim Atama:** Her ajanın ismi ve rolü kullanıcı tarafından girilebilir  
- **Adım Adım Diyalog:** Her adımda bir ajan yanıt verir ve bir sonraki adımda diğer ajan bu yanıtı input olarak kullanır  
- **Başlangıç Mesajı:** Kullanıcı diyalog başlatıcı mesajı girebilir  
- **Loading ve Hata Göstergesi:** API çağrıları sırasında yükleniyor animasyonu ve olası hatalar için error kutusu  
- **Tarayıcı Tabanlı:** Hiçbir backend gerektirmez; tüm işlemler client-side yapılır (statik API key kullanımı test amaçlıdır)  
- **Conversation Sıfırlama:** Sayfa yenilenince diyalog alanı otomatik olarak temizlenir  

---

## Kurulum

1. Projeyi bilgisayarınıza indirin veya kopyalayın.
2. `scripts` klasöründe her AI modeline ait dosyalara **API key’lerinizi girin**:
   - `gemini.js` → `GEMINI_API_KEY`
   - `deepseek.js` → `DEEPSEEK_API_KEY`
   - `chatgpt.js` → `OPENAI_API_KEY`
   - `watsonx.js` → `WATSONX_API_KEY` ve `WATSONX_API_URL`
   - `anthropic.js` → `CLAUDE_API_KEY`
   - `mistral.js` → `MISTRAL_API_KEY`
   - `cohere.js` → `COHERE_API_KEY`
   - `ai21.js` → `AI21_API_KEY`
   - `huggingface.js` → `HF_API_KEY`
3. Terminal veya VS Code üzerinden proje klasörüne gidin.
4. Python HTTP server başlatın:

```bash
python -m http.server 8000