const express=require('express')
const router=express.Router()
const {MakesingleItemsSale,getAllSales,getSalesByOrderNumber}=require('../../Controllers/SalesControllers/SingleItemSellingRegister')

router.route('/').post(MakesingleItemsSale).get(getAllSales)
router.route('/:OrderNumber').get(getSalesByOrderNumber)
module.exports=router;
