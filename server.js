require('dotenv').config();
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const pdfParse = require('pdf-parse');
const Anthropic = require('@anthropic-ai/sdk');

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize Anthropic client
const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Configure multer for file uploads
const upload = multer({
  dest: 'uploads/',
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'));
    }
  }
});

// Middleware
app.use(express.static('public'));
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));

// Create uploads directory if it doesn't exist
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

// Store extracted PDFs in memory (for demo - in production use database)
const extractedPDFs = {};

// Route: Upload PDF
app.post('/api/upload', upload.single('pdf'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Read the uploaded PDF
    const pdfPath = req.file.path;
    const pdfBuffer = fs.readFileSync(pdfPath);

    // Extract text from PDF
    const data = await pdfParse(pdfBuffer);
    const extractedText = data.text;

    // Generate session ID
    const sessionId = Date.now().toString();

    // Store extracted text and metadata
    extractedPDFs[sessionId] = {
      filename: req.file.originalname,
      text: extractedText,
      uploadedAt: new Date(),
      chatHistory: []
    };

    // Clean up the uploaded file
    fs.unlinkSync(pdfPath);

    res.json({
      success: true,
      sessionId,
      filename: req.file.originalname,
      pages: data.numpages,
      textLength: extractedText.length,
      message: `PDF "${req.file.originalname}" uploaded successfully`
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({
      error: error.message || 'Failed to process PDF',
      details: error.message
    });
  }
});

// Route: Ask question about PDF
app.post('/api/ask', async (req, res) => {
  try {
    const { sessionId, question, model } = req.body;
    const selectedModel = model || 'claude-opus-4-1';

    if (!sessionId || !question) {
      return res.status(400).json({ error: 'Session ID and question are required' });
    }

    if (!extractedPDFs[sessionId]) {
      return res.status(404).json({ error: 'Session not found. Please upload a PDF first.' });
    }

    const session = extractedPDFs[sessionId];
    const pdfText = session.text;

    // Build messages for Claude
    const messages = [
      {
        role: 'user',
        content: `You are a helpful study assistant. Answer questions only based on the provided document content. Be clear, concise, and explain like a teacher.\n\nDocument:\n${pdfText}\n\nQuestion: ${question}`
      }
    ];

    // Call Claude API
    const message = await client.messages.create({
      model: selectedModel,
      max_tokens: 2048,
      messages: messages,
      system: 'You are a helpful study assistant. Answer questions only based on the provided document content. Be clear, concise, and explain like a teacher. If the answer is not in the document, say so clearly.'
    });

    const answer = message.content[0].text;

    // Store in chat history
    session.chatHistory.push({
      question,
      answer,
      timestamp: new Date()
    });

    res.json({
      success: true,
      answer,
      history: session.chatHistory
    });
  } catch (error) {
    console.error('API error:', error);
    res.status(500).json({
      error: error.message || 'Failed to process question',
      details: error.message
    });
  }
});

// Route: Get chat history
app.get('/api/history/:sessionId', (req, res) => {
  try {
    const { sessionId } = req.params;

    if (!extractedPDFs[sessionId]) {
      return res.status(404).json({ error: 'Session not found' });
    }

    const session = extractedPDFs[sessionId];
    res.json({
      success: true,
      filename: session.filename,
      chatHistory: session.chatHistory
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Serve the frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Error:', error);
  res.status(500).json({
    error: error.message || 'Internal server error'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 AI Study Assistant is running on http://localhost:${PORT}`);
  console.log('📚 Upload a PDF and start asking questions!');
});
