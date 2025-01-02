const express = require('express');
const router = express.Router();
const {
    getAllBrands,
    createBrand,
    updateBrandById,
    getBrandById,
    deleteBrandById,searchBrand
  } = require('../../Controllers/StoreControllers/brand');    

// Define routes
router.route('/').get(getAllBrands).post(createBrand)
router.route('/:id').get(getBrandById).patch(updateBrandById).delete(deleteBrandById)
router.route('/search').post(searchBrand)
module.exports = router;
