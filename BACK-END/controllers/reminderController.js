// ============================================================
// backend/controllers/reminderController.js
// Business logic for reminder CRUD operations
// ============================================================

const ReminderModel = require('../models/reminderModel');

const ReminderController = {

  // GET /api/reminders
  getAll: async (req, res) => {
    try {
      const reminders = await ReminderModel.getAll();
      res.json({ success: true, data: reminders });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  // POST /api/reminders
  create: async (req, res) => {
    try {
      const { type, date, notes, pet_id } = req.body;
      if (!type || !date || !pet_id) {
        return res.status(400).json({ success: false, message: 'type, date, pet_id are required' });
      }
      const reminder = await ReminderModel.create({ type, date, notes, pet_id });
      res.status(201).json({ success: true, data: reminder });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  // PUT /api/reminders/:id
  update: async (req, res) => {
    try {
      const reminder = await ReminderModel.update(req.params.id, req.body);
      res.json({ success: true, data: reminder });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  // DELETE /api/reminders/:id
  delete: async (req, res) => {
    try {
      const deleted = await ReminderModel.delete(req.params.id);
      if (!deleted) return res.status(404).json({ success: false, message: 'Reminder not found' });
      res.json({ success: true, message: 'Reminder deleted' });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }
};

module.exports = ReminderController;
