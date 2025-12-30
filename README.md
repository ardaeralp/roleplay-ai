# RolePlay AI – Multi-Agent Conversational Platform 🤖💬

**RolePlay AI** is an interactive web application that allows you to orchestrate step-by-step conversations between multiple AI agents by assigning them specific roles and identities.  
The application supports popular AI models such as **Gemini**, **DeepSeek**, **ChatGPT**, **WatsonX**, **Claude**, **Mistral**, **Cohere**, **AI21**, and **HuggingFace**, and includes **long-term memory** capabilities to retain and summarize conversations over time.

---

## 🌟 Features

- **Multiple AI Agents**: Select two AI agents and let them engage in a structured dialogue.
- **Role & Name Assignment**: Assign custom names and roles to each agent to create rich scenarios.
- **Step-by-Step Conversation**: Progress the conversation incrementally using the *“One Step”* button.
- **Long-Term Memory**: Conversations are stored and summarized for long-term context retention.
- **Memory Panel**: View stored memory directly within the user interface.
- **JSON Memory Export/Import**: Save memory to a file or reload it later.
- **Clear Memory**: Reset all stored memory with a single click.
- **Dialogue Download**: Export completed conversations as a `.txt` file.
- **Responsive UI**: Fully responsive design for both desktop and mobile devices.
- **Loading & Error Indicators**: Visual feedback during API calls and error states.

---

## 🖥️ Installation & Running the App

1. **Clone the repository:**

```bash
git clone https://github.com/username/RolePlay-AI.git
cd RolePlay-AI
```

2. **Open the project in VS Code or your preferred IDE.**

3. **Run using a simple Python HTTP server:**

```bash
python -m http.server 8000
```

4. **Open in your browser:**

```
http://localhost:8000
```

---

## ⚙️ Usage

1. Enter names and roles for **Agent A** and **Agent B**.
2. Write the initial message.
3. Select an AI model for each agent.
4. Click the **“One Step”** button to advance the conversation step by step.
5. Use the **Memory Panel** to view memory, **Memory JSON** to export/import it, or **Clear Memory** to reset it.
6. Use **Download Dialogue** to export the conversation as a `.txt` file.

---

## 🧠 Long-Term Memory

- Messages are accumulated as **short-term memory** and periodically summarized into **long-term memory**.
- When a defined threshold is reached, key information is summarized and retained.
- Memory can be exported/imported as JSON files.
- All stored memory can be cleared at any time.

---

## 🛠️ Supported AI Models

- Gemini  
- DeepSeek  
- ChatGPT  
- WatsonX  
- Claude  
- Mistral  
- Cohere  
- AI21  
- HuggingFace  

API keys can be configured via environment variables or statically.

⚠️ **Security Notice:**  
For client-side API usage, exposing API keys is not recommended. In production environments, a **server-side proxy** approach is strongly advised.
