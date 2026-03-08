# 📚 AI Study Assistant

A powerful web application that lets you chat with your PDFs using Claude AI. Upload any document, ask questions, and get intelligent, context-aware answers instantly.

![AI Study Assistant](https://img.shields.io/badge/Claude%20AI-100%25-purple?style=for-the-badge)
![Node.js](https://img.shields.io/badge/Node.js-v18+-green?style=for-the-badge)
![Express](https://img.shields.io/badge/Express-4.18-black?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Active-brightgreen?style=for-the-badge)

---

## ✨ Features

- 📄 **Drag & Drop PDF Upload** — Easy file upload with visual feedback
- 💬 **Real-time Chat** — Ask unlimited questions about your PDFs
- 🤖 **Multi-Model Support** — Choose between Opus 4.1, Sonnet 4, or Sonnet 3.5
- 📝 **Chat History** — Keep conversation history for each PDF session
- 🎨 **Beautiful Dark UI** — Modern, responsive design with smooth animations
- ✨ **Markdown Rendering** — Claude responses formatted with proper styling
- 🔒 **Secure API Keys** — Environment-based configuration, never exposed
- ⚡ **Fast & Efficient** — Optimized performance with real-time feedback
- 🎯 **Smart Error Handling** — Graceful error messages and validation

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Backend** | Node.js, Express.js |
| **Frontend** | HTML5, CSS3, Vanilla JavaScript |
| **PDF Processing** | pdf-parse |
| **AI Integration** | Anthropic Claude API |
| **File Upload** | Multer |
| **Markdown** | Marked.js |
| **Deployment** | Express Static Server |

---

## 📋 Prerequisites

- Node.js v18 or higher
- npm or yarn
- Claude AI API Key ([Get one here](https://console.anthropic.com))
- Git (for version control)

---

## 🚀 Installation

### 1. Clone the Repository
```bash
git clone https://github.com/adityacs50-lab/Ai-study-assistant-.git
cd Ai-study-assistant-
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Get Your Claude API Key
1. Visit [console.anthropic.com](https://console.anthropic.com)
2. Click **API Keys** in the sidebar
3. Click **Create Key** and copy it

### 4. Configure Environment
Create a `.env` file in the project root:
```env
ANTHROPIC_API_KEY=sk-ant-your-api-key-here
PORT=3000
```

### 5. Start the Server
```bash
npm start
```

Visit **http://localhost:3000** in your browser! 🎉

---

## 💻 Usage Guide

### Uploading a PDF
1. Click the upload area or drag & drop a PDF file
2. The app will extract text from the PDF automatically
3. File info (pages, size) displays when ready

### Asking Questions
1. Type your question in the input field
2. Click **Send** or press **Enter**
3. Claude analyzes the PDF and responds in real-time
4. Chat history is maintained for the session

### Choosing a Model
Select from the **Model** dropdown in the chat header:
- **Opus 4.1** — Most capable, best for complex analysis
- **Sonnet 4** — Fast and powerful, balanced performance
- **Sonnet 3.5** — Most efficient, quick responses

---

## 📁 Project Structure

```
Ai-study-assistant-/
├── server.js              # Express backend
├── index.js              # (Legacy test file)
├── package.json          # Dependencies
├── .env                  # Environment config (NOT in repo)
├── .gitignore            # Git ignore rules
├── README.md             # This file
├── public/
│   └── index.html        # Frontend UI
├── uploads/              # Temporary PDF storage
└── node_modules/         # Dependencies
```

---

## 🔧 API Endpoints

### POST `/api/upload`
**Upload and extract PDF text**
```json
{
  "pdf": "File object"
}
```
**Response:**
```json
{
  "success": true,
  "sessionId": "1234567890",
  "filename": "document.pdf",
  "pages": 42,
  "textLength": 65348
}
```

### POST `/api/ask`
**Ask a question about the PDF**
```json
{
  "sessionId": "1234567890",
  "question": "What is the main topic?",
  "model": "claude-opus-4-1"
}
```
**Response:**
```json
{
  "success": true,
  "answer": "The main topic is...",
  "history": [...]
}
```

### GET `/api/history/:sessionId`
**Get chat history for a session**
```json
{
  "success": true,
  "filename": "document.pdf",
  "chatHistory": [...]
}
```

---

## 🎨 UI Features

### Dark Modern Theme
- Deep slate background (`#0f172a`)
- Purple primary accent (`#7c3aed`)
- Smooth animations & transitions
- Responsive design (desktop & mobile)

### Components
- **Upload Section** — Drag-drop with visual feedback
- **Chat Interface** — Message threads with avatars
- **Model Selector** — Quick model switching
- **Loading States** — Animated spinner with status
- **Error Messages** — Clear, actionable feedback

---

## ⚙️ Configuration

### Environment Variables
```env
# Required
ANTHROPIC_API_KEY=sk-ant-xxxxx

# Optional
PORT=3000          # Server port (default: 3000)
```

### Model Configuration
Available models (edit `server.js` line 120 to add more):
- `claude-opus-4-1`
- `claude-sonnet-4-20250514`
- `claude-3-5-sonnet-20241022`

### PDF Upload Limits
- Max file size: **10 MB** (configurable in `server.js` line 23)
- Supported format: **PDF only**

---

## 🔒 Security

✅ **API Key Protection**
- `.env` file excluded from git via `.gitignore`
- Never commit sensitive keys
- Environment variables loaded at runtime

✅ **Input Validation**
- File type checking (PDF only)
- File size limits
- Session ID validation

✅ **Error Handling**
- No sensitive info in error messages
- Graceful failure recovery

---

## 🚨 Troubleshooting

### "API Key Not Found"
```
✓ Check .env file has ANTHROPIC_API_KEY
✓ Verify key is from console.anthropic.com
✓ Restart server after updating .env
```

### "Port 3000 Already in Use"
```bash
# Use a different port
PORT=3001 npm start
```

### "PDF Upload Failed"
```
✓ Verify file is a valid PDF
✓ Check file size (max 10MB)
✓ Try a different PDF file
```

### "Model Not Found Error"
```
✓ Verify model name in server.js
✓ Check Claude API has access to that model
✓ Try a different model from dropdown
```

---

## 📈 Performance Tips

- **Large PDFs** → Use Sonnet 3.5 for faster responses
- **Complex Analysis** → Use Opus 4.1 for best accuracy
- **Quick Answers** → Use Sonnet 4 for balance
- **Multiple Questions** → Keep chat history to save API calls

---

## 🌟 Example Use Cases

- 📖 **Study Helper** — Chat with textbooks and notes
- 📊 **Document Analysis** — Extract insights from reports
- 📝 **Research Assistant** — Question academic papers
- 💼 **Business Intelligence** — Analyze documents and PDFs
- 🎓 **Learning Tool** — Interactive study sessions

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Steps to Contribute
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License — see the LICENSE file for details.

---

## 🙋 Support & Feedback

Have questions or feedback? 
- **Issues** — GitHub Issues
- **Discussions** — GitHub Discussions
- **Email** — Feel free to reach out

---

## 🎯 Roadmap

- [ ] Database integration for persistent sessions
- [ ] Multiple PDF support in single chat
- [ ] Advanced search within documents
- [ ] Export chat history to PDF/markdown
- [ ] User authentication & sessions
- [ ] Rate limiting & analytics
- [ ] Batch processing for large documents
- [ ] Custom system prompts

---

## 👨‍💻 Author

**Aditya Shinde**
- GitHub: [@adityacs50-lab](https://github.com/adityacs50-lab)
- Project: [AI Study Assistant](https://github.com/adityacs50-lab/Ai-study-assistant-)

---

## ❤️ Acknowledgments

- [Anthropic Claude API](https://anthropic.com) — AI backbone
- [Express.js](https://expressjs.com) — Web framework
- [PDF Parse](https://github.com/modesty/pdf-parse) — PDF extraction
- [Marked.js](https://marked.js.org) — Markdown rendering

---

<div align="center">

Made with ❤️ by Aditya Shinde

⭐ If you find this helpful, please star the repository!

[GitHub](https://github.com/adityacs50-lab/Ai-study-assistant-) • [Issues](https://github.com/adityacs50-lab/Ai-study-assistant-/issues)

</div>


