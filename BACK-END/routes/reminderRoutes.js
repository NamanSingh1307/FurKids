// ============================================================
// backend/routes/reminderRoutes.js
// Express router for /api/reminders
// ============================================================

const express  = require('express');
const router   = express.Router();
const RCtrl    = require('../controllers/reminderController');

router.get('/',       RCtrl.getAll);
router.post('/',      RCtrl.create);
router.put('/:id',    RCtrl.update);
router.delete('/:id', RCtrl.delete);

module.exports = router;
