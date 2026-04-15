// ============================================================
// backend/models/petModel.js
// All SQL queries related to pets
// ============================================================

const db = require('../config/db');

const PetModel = {

  // Return every pet in the database
  getAll: async () => {
    const [rows] = await db.query('SELECT * FROM pets ORDER BY created_at DESC');
    return rows;
  },

  // Return a single pet by primary key
  getById: async (id) => {
    const [rows] = await db.query('SELECT * FROM pets WHERE id = ?', [id]);
    return rows[0];
  },

  // Insert a new pet and return the new record
  create: async ({ name, breed, age, weight, species, notes }) => {
    const [result] = await db.query(
      'INSERT INTO pets (name, breed, age, weight, species, notes) VALUES (?, ?, ?, ?, ?, ?)',
      [name, breed, age, weight, species || 'Dog', notes || '']
    );
    return PetModel.getById(result.insertId);
  },

  // Update an existing pet by id
  update: async (id, { name, breed, age, weight, species, notes }) => {
    await db.query(
      'UPDATE pets SET name=?, breed=?, age=?, weight=?, species=?, notes=? WHERE id=?',
      [name, breed, age, weight, species, notes, id]
    );
    return PetModel.getById(id);
  },

  // Delete a pet (cascades to reminders & records via FK)
  delete: async (id) => {
    const [result] = await db.query('DELETE FROM pets WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
};

module.exports = PetModel;
