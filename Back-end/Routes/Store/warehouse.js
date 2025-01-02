const express = require('express');
const router = express.Router();

const {
  getAllWarehouses,
  getWarehouseById,
  createWarehouse,
  updateWarehouse,
  deleteWarehouse,
  searchWareHouse,
  getAllContainedWareHouseItems,
  getAllContainedWareHouseItemsDetailed
} = require('../../Controllers/StoreControllers/warehouse');

router.get('/', getAllWarehouses);
router.get('/:id', getWarehouseById);
router.post('/', createWarehouse);
router.patch('/:id', updateWarehouse);
router.delete('/:id', deleteWarehouse);
router.post('/search', searchWareHouse);
router.get('/wareHouseItems/:wareHouseId', getAllContainedWareHouseItems);
router.get('/wareHouseItemsDetailed/:wareHouseId', getAllContainedWareHouseItemsDetailed);
module.exports = router;
