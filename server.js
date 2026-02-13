// server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");

const sendEmailHandler = require("./api/send-email");
const emailLogsHandler = require("./api/email-logs");

const app = express();

// ✅ Enable CORS
app.use(
  cors({
    origin: "*", // allow all (you can restrict later)
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// Routes
app.post("/api/send-email", async (req, res) => {
  await sendEmailHandler(req, res);
});

app.get("/api/email-logs", async (req, res) => {
  await emailLogsHandler(req, res);
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Email service is running",
    timestamp: new Date().toISOString(),
  });
});

app.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "Email service is running",
    timestamp: new Date().toISOString(),
  });
});

// ✅ For Vercel (IMPORTANT)
module.exports = app;
