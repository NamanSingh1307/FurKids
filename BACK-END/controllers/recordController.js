// ============================================================
// backend/controllers/recordController.js
// Business logic for file record operations
// ============================================================

const RecordModel = require('../models/recordModel');

const RecordController = {

  // GET /api/records
  getAll: async (req, res) => {
    try {
      const records = await RecordModel.getAll();
      res.json({ success: true, data: records });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  // POST /api/records  (multipart/form-data with optional file)
  create: async (req, res) => {
    try {
      const { title, record_type, pet_id } = req.body;
      if (!title || !pet_id) {
        return res.status(400).json({ success: false, message: 'title and pet_id are required' });
      }

      // If a file was uploaded via multer, use its path; otherwise store a placeholder
      const file_path = req.file
        ? `/uploads/${req.file.filename}`
        : '/uploads/placeholder.pdf';

      const record = await RecordModel.create({ title, file_path, record_type, pet_id });
      res.status(201).json({ success: true, data: record });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  // DELETE /api/records/:id
  delete: async (req, res) => {
    try {
      const deleted = await RecordModel.delete(req.params.id);
      if (!deleted) return res.status(404).json({ success: false, message: 'Record not found' });
      res.json({ success: true, message: 'Record deleted' });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }
};

module.exports = RecordController;
