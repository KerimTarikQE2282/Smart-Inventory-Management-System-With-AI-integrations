const express = require('express');
const router = express.Router();



const { getAllUnits,getUnitById,createUnit,updateUnitById ,deleteUnitById,searchUnit} = require('../../Controllers/StoreControllers/units');  

// Define routes
router.route('/').get(getAllUnits).post(createUnit)
router.route('/:id').get(getUnitById).patch(updateUnitById).delete(deleteUnitById)
router.route('/search').post(searchUnit)

module.exports = router;
