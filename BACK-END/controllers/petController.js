// ============================================================
// backend/controllers/petController.js
// Business logic for pet CRUD operations
// ============================================================

const PetModel = require('../models/petModel');

const PetController = {

  // GET /api/pets
  getAll: async (req, res) => {
    try {
      const pets = await PetModel.getAll();
      res.json({ success: true, data: pets });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  // GET /api/pets/:id
  getOne: async (req, res) => {
    try {
      const pet = await PetModel.getById(req.params.id);
      if (!pet) return res.status(404).json({ success: false, message: 'Pet not found' });
      res.json({ success: true, data: pet });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  // POST /api/pets
  create: async (req, res) => {
    try {
      const { name, breed, age, weight, species, notes } = req.body;
      if (!name || !breed || !age || !weight) {
        return res.status(400).json({ success: false, message: 'name, breed, age, weight are required' });
      }
      const pet = await PetModel.create({ name, breed, age, weight, species, notes });
      res.status(201).json({ success: true, data: pet });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  // PUT /api/pets/:id
  update: async (req, res) => {
    try {
      const pet = await PetModel.update(req.params.id, req.body);
      res.json({ success: true, data: pet });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  // DELETE /api/pets/:id
  delete: async (req, res) => {
    try {
      const deleted = await PetModel.delete(req.params.id);
      if (!deleted) return res.status(404).json({ success: false, message: 'Pet not found' });
      res.json({ success: true, message: 'Pet deleted successfully' });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }
};

module.exports = PetController;
