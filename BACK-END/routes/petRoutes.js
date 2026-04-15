// ============================================================
// backend/routes/petRoutes.js
// Express router for /api/pets
// ============================================================

const express    = require('express');
const router     = express.Router();
const PetCtrl    = require('../controllers/petController');

router.get('/',       PetCtrl.getAll);    // GET  /api/pets
router.get('/:id',    PetCtrl.getOne);    // GET  /api/pets/:id
router.post('/',      PetCtrl.create);    // POST /api/pets
router.put('/:id',    PetCtrl.update);    // PUT  /api/pets/:id
router.delete('/:id', PetCtrl.delete);   // DEL  /api/pets/:id

module.exports = router;
