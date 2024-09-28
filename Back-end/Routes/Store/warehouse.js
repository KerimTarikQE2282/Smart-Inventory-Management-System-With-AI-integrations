const express = require('express');
const router = express.Router();

const {
  getAllWarehouses,
  getWarehouseById,
  createWarehouse,
  updateWarehouse,
  deleteWarehouse,
  searchWareHouse,
  getAllContainedWareHouseItems
} = require('../../Controllers/StoreControllers/warehouse');

router.get('/', getAllWarehouses);
router.get('/:id', getWarehouseById);
router.post('/', createWarehouse);
router.patch('/:id', updateWarehouse);
router.delete('/:id', deleteWarehouse);
router.post('/search', searchWareHouse);
router.get('/wareHouseItems/:wareHouseId', getAllContainedWareHouseItems);
module.exports = router;
