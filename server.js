// server.js
require('dotenv').config();
const express = require('express');
const sendEmailHandler = require('./api/send-email');
const emailLogsHandler = require('./api/email-logs');

const app = express();
app.use(express.json());

// Routes
app.post('/api/send-email', async (req, res) => {
  await sendEmailHandler(req, res);
});

app.get('/api/email-logs', async (req, res) => {
  await emailLogsHandler(req, res);
});

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Email service is running',
    timestamp: new Date().toISOString()
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`\n✅ Email Service Running`);
  console.log(`📧 http://localhost:${PORT}/api/send-email`);
  console.log(`📋 http://localhost:${PORT}/api/email-logs`);
  console.log(`💓 http://localhost:${PORT}/api/health\n`);
});