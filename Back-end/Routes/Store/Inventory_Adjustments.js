const express = require('express');
const router = express.Router();
const {add_New_Item_To_wareHouse,Adjust_wareHouse_Item}  =require('./../../Controllers/StoreControllers/WareHouseAdjustments')
const {WareHouseAddedItems,WareHouseTransferedItems}=require('./../../Controllers/StoreControllers/getWareHouseAdjustments')
const {Send_Item_to_Store}=require('./../../Controllers/StoreControllers/wareHouseToStoreAdjustments')

// Define routes
router.route('/').post(add_New_Item_To_wareHouse)
router.route('/adjust').post(Adjust_wareHouse_Item)
router.route('/NewItems').get(WareHouseAddedItems)
router.route('/AllStock').get(WareHouseTransferedItems)
router.route('/sendtostore').post(Send_Item_to_Store)

module.exports = router;
