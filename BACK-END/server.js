// ============================================================
// backend/server.js
// Express application entry point for FurKids API
// ============================================================

const express = require('express');
const cors    = require('cors');
const path    = require('path');
const fs      = require('fs');

const app  = express();
const PORT = process.env.PORT || 5000;

// ── Middleware ───────────────────────────────────────────────
app.use(cors());                           // allow requests from frontend
app.use(express.json());                   // parse JSON request bodies
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files as static assets
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
app.use('/uploads', express.static(uploadDir));

// ── API Routes ───────────────────────────────────────────────
app.use('/api/pets',      require('./routes/petRoutes'));
app.use('/api/reminders', require('./routes/reminderRoutes'));
app.use('/api/records',   require('./routes/recordRoutes'));

// ── Health check ─────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', app: 'FurKids API', version: '1.0.0' });
});

// ── 404 fallback ─────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// ── Global error handler ─────────────────────────────────────
app.use((err, req, res, next) => {
  console.error('[ERROR]', err.message);
  res.status(500).json({ success: false, message: 'Internal server error' });
});

// ── Start server ─────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅  FurKids API running → http://localhost:${PORT}`);
});
