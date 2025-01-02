const express = require('express');
const router = express.Router();
const { addItem,getAllItems,getItemsByID,updateItems,removeItems,searchItem,getAllContainedWareHouseItems } = require('../../Controllers/StoreControllers/items');    

// Define routes
router.route('/').get(getAllItems).post(addItem)
router.route('/:id').get(getItemsByID).post().patch(updateItems).delete(removeItems)
router.route('/search').post(searchItem)
router.route('/wareHouseItems/:itemId').get(getAllContainedWareHouseItems)




module.exports = router;
