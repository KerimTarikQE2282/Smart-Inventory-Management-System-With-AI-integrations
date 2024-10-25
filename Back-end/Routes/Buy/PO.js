const express = require('express');
const router = express.Router();

const {
  getAllPOs,
  getPOById,
  createPO,
  updatePOById,
  deletePOById,
  searchPO
} = require('../../Controllers/StoreControllers/PO');

router.get('/', getAllPOs);

router.get('/:id', getPOById);

router.post('/', createPO);

router.patch('/:id', updatePOById);

router.delete('/:id', deletePOById);

router.post('/search', searchPO);

module.exports = router;
