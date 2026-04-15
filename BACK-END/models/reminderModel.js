// ============================================================
// backend/models/reminderModel.js
// All SQL queries related to reminders
// ============================================================

const db = require('../config/db');

const ReminderModel = {

  // Get all reminders (joined with pet name for display)
  getAll: async () => {
    const [rows] = await db.query(`
      SELECT r.*, p.name AS pet_name
      FROM reminders r
      JOIN pets p ON r.pet_id = p.id
      ORDER BY r.date ASC
    `);
    return rows;
  },

  // Get reminders for a specific pet
  getByPet: async (petId) => {
    const [rows] = await db.query(
      'SELECT * FROM reminders WHERE pet_id = ? ORDER BY date ASC',
      [petId]
    );
    return rows;
  },

  // Create a new reminder
  create: async ({ type, date, notes, pet_id }) => {
    const [result] = await db.query(
      'INSERT INTO reminders (type, date, notes, pet_id) VALUES (?, ?, ?, ?)',
      [type, date, notes || '', pet_id]
    );
    const [rows] = await db.query('SELECT * FROM reminders WHERE id = ?', [result.insertId]);
    return rows[0];
  },

  // Update a reminder
  update: async (id, { type, date, notes, pet_id }) => {
    await db.query(
      'UPDATE reminders SET type=?, date=?, notes=?, pet_id=? WHERE id=?',
      [type, date, notes, pet_id, id]
    );
    const [rows] = await db.query('SELECT * FROM reminders WHERE id = ?', [id]);
    return rows[0];
  },

  // Delete a reminder
  delete: async (id) => {
    const [result] = await db.query('DELETE FROM reminders WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
};

module.exports = ReminderModel;
