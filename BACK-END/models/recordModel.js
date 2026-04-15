// ============================================================
// backend/models/recordModel.js
// All SQL queries related to medical / document records
// ============================================================

const db = require('../config/db');

const RecordModel = {

  // Get all records joined with pet name
  getAll: async () => {
    const [rows] = await db.query(`
      SELECT r.*, p.name AS pet_name
      FROM records r
      JOIN pets p ON r.pet_id = p.id
      ORDER BY r.created_at DESC
    `);
    return rows;
  },

  // Get records for a specific pet
  getByPet: async (petId) => {
    const [rows] = await db.query(
      'SELECT * FROM records WHERE pet_id = ? ORDER BY created_at DESC',
      [petId]
    );
    return rows;
  },

  // Save a new record (file_path comes from multer upload)
  create: async ({ title, file_path, record_type, pet_id }) => {
    const [result] = await db.query(
      'INSERT INTO records (title, file_path, record_type, pet_id) VALUES (?, ?, ?, ?)',
      [title, file_path, record_type || 'General', pet_id]
    );
    const [rows] = await db.query('SELECT * FROM records WHERE id = ?', [result.insertId]);
    return rows[0];
  },

  // Delete a record
  delete: async (id) => {
    const [result] = await db.query('DELETE FROM records WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
};

module.exports = RecordModel;
