// marcaRoutes.js
const express = require('express');
const router = express.Router();
const marcaController = require('../controllers/marcaController');

router.get('/', marcaController.getAllMarca);
router.get('/:id_marca', marcaController.getMarcaById);
router.post('/', marcaController.createMarca);
router.put('/:id_marca', marcaController.updateMarca);
router.delete('/:id_marca', marcaController.deleteMarca);
router.get('/marca/:id_marca', marcaController.getMarcaById);
router.get("/buscar/pais/:pais", marcaController.buscarMarcasPorPais);

module.exports = router;
