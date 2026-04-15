// ============================================================
// backend/routes/recordRoutes.js
// Express router for /api/records
// ============================================================

const express  = require('express');
const router   = express.Router();
const multer   = require('multer');
const path     = require('path');
const RCtrl    = require('../controllers/recordController');

// ── Multer storage: save uploaded files to /backend/uploads/
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '../uploads')),
  filename:    (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

router.get('/',       RCtrl.getAll);
router.post('/',      upload.single('file'), RCtrl.create);  // accepts multipart
router.delete('/:id', RCtrl.delete);

module.exports = router;
