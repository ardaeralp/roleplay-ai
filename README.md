# RolePlay AI

**RolePlay AI**, kullanıcıların iki yapay zekâ ajanını (Agent A ve Agent B) kendi belirledikleri roller ve isimler ile adım adım konuşturabildiği bir web uygulamasıdır.  
Projede **dört farklı AI modeli** desteklenir:

- **Gemini** (Google)
- **DeepSeek** (resmi API)
- **ChatGPT** (OpenAI)
- **WatsonX** (IBM)

Kullanıcı, hangi modelin hangi ajan tarafından kullanılacağını seçebilir ve diyalog adım adım ilerler.

---

## Özellikler

- **4 Model Desteği:** Gemini, DeepSeek, ChatGPT, WatsonX
- **Dinamik Model Seçimi:** Agent A ve Agent B için farklı modeller seçilebilir
- **Kullanıcı Tarafından Rol ve İsim Atama:** Her ajanın ismi ve rolü kullanıcı tarafından girilebilir
- **Adım Adım Diyalog:** Her adımda bir ajan yanıt verir ve bir sonraki adımda diğer ajan bu yanıtı input olarak kullanır
- **Başlangıç Mesajı:** Kullanıcı diyalog başlatıcı mesajı girebilir
- **Loading ve Hata Göstergesi:** API çağrıları sırasında yükleniyor animasyonu ve olası hatalar için error kutusu
- **Tarayıcı Tabanlı:** Hiçbir backend gerektirmez; tüm işlemler client-side yapılır (statik API key kullanımı test amaçlıdır)

---

## Kurulum

1. Projeyi bilgisayarınıza indirin veya kopyalayın.
2. Aşağıdaki dosyalarda API key’lerinizi girin:
   - `gemini.js` → `GEMINI_API_KEY`
   - `deepseek.js` → `DEEPSEEK_API_KEY`
   - `chatgpt.js` → `OPENAI_API_KEY`
   - `watsonx.js` → `WATSONX_API_KEY` ve `WATSONX_API_URL`
3. VS Code veya terminal üzerinden proje klasörüne gidin.
4. Python HTTP server başlatın:

```bash
python3 -m http.server 8000