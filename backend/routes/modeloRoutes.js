// modeloRoutes.js
const express = require('express');
const router = express.Router();
const modeloController = require('../controllers/modeloController');

router.get('/', modeloController.getAllModelo);
router.get('/:id_modelo', modeloController.getModeloById);
router.post('/', modeloController.createModelo);
router.delete('/:id_modelo', modeloController.deleteModelo);
router.put('/:id_modelo', modeloController.updateModelo);
router.get('/modelo/:id_modelo', modeloController.getModeloById);
router.get("/buscar/tipo/:tipo", modeloController.buscarModelosPorTipo);

module.exports = router;
