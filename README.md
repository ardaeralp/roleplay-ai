# RolePlay AI – Multi-Agent Conversational Platform 🤖💬

RolePlay AI, birden fazla yapay zekâ ajanını rol ve isim atayarak adım adım sohbet ettirebileceğiniz interaktif bir web uygulamasıdır.  
Uygulama, **Gemini**, **DeepSeek**, **ChatGPT**, **WatsonX**, **Claude**, **Mistral**, **Cohere**, **AI21**, **HuggingFace** gibi popüler AI modelleriyle çalışabilir ve **long-term memory** entegrasyonu ile konuşmaları uzun süre hafızasında tutabilir.

---

## 🌟 Özellikler

- **Çoklu AI Ajanları**: İki AI ajanını seçerek birbirleriyle diyalog oluşturabilirsiniz.
- **Rol ve İsim Atama**: Her ajana rol ve isim atayarak senaryolar oluşturabilirsiniz.
- **Adım Adım Konuşma**: "Bir Adım" butonuyla adım adım sohbet akışı sağlar.
- **Long-Term Memory**: Konuşmalar uzun süre hafızada tutulur ve önemli noktalar özetlenir.
- **Memory Paneli**: Hafızayı kullanıcı arayüzünde görüntüleyebilirsiniz.
- **JSON Hafıza Export/Import**: Hafızayı kaydedebilir ve tekrar yükleyebilirsiniz.
- **Hafıza Temizleme**: Tüm hafızayı tek tıkla sıfırlayabilirsiniz.
- **Diyalog İndirme**: Tamamlanan konuşmayı `.txt` dosyası olarak indirebilirsiniz.
- **Responsive UI**: Hem masaüstü hem mobil uyumlu tasarım.
- **Loading & Error göstergeleri**: API çağrıları sırasında kullanıcıya bilgi verir.

---

## 🖥️ Kurulum ve Çalıştırma

1. **Projeyi klonlayın:**

"git clone https://github.com/kullaniciAdi/RolePlay-AI.git"
"cd RolePlay-AI"

2.	**VS Code veya başka bir IDE’de açın.**
3.	**Basit Python HTTP Server ile çalıştırabilirsiniz:**
python -m http.server 8000
4.	**Tarayıcıda açın:**
http://localhost:8000

## ⚙️ Kullanım
	1.	Agent A ve Agent B isimlerini ve rollerini girin.
	2.	Başlangıç mesajınızı yazın.
	3.	AI modelini her ajan için seçin.
	4.	“Bir Adım” butonuna basarak adım adım sohbeti ilerletin.
	5.	Hafızayı görmek için Memory Paneli, indirmek için Memory JSON, temizlemek için Hafızayı Temizle butonlarını kullanabilirsiniz.
	6.	Konuşmayı .txt olarak indirmek için Diyaloğu İndir butonunu kullanabilirsiniz.

## 🧠 Long-Term Memory
	•	Mesajlar birikerek short-term memory ve long-term summary olarak tutulur.
	•	Belirli bir threshold’a ulaştığında önemli bilgiler özetlenir.
	•	Memory JSON olarak indirilebilir veya yüklenebilir.
	•	Hafıza temizleme ile tüm geçmiş sıfırlanabilir.

## 🛠️ Desteklenen AI Modelleri
	•	Gemini
	•	DeepSeek
	•	ChatGPT
	•	WatsonX
	•	Claude
	•	Mistral
	•	Cohere
	•	AI21
	•	HuggingFace

API anahtarlarını kendi environment’ınızda veya static olarak belirleyebilirsiniz.
Client-side API kullanımı için güvenlik uyarısı: production ortamında server-side proxy önerilir.