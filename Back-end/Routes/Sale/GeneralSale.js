const express=require('express')
const router=express.Router()
const { addGeneralSale,payCredit}=require('../../Controllers/SalesControllers/GeneralSale')
const {getAllPayedGeneralSales,getAllunPayedGeneralSales,getGeneralSalesByOrderNumber,updateGeneralSale}=require('../../Controllers/SalesControllers/ViewSalesGeneral')
router.route('/').post(addGeneralSale).get(getAllPayedGeneralSales)
router.route('/unpayed').get(getAllunPayedGeneralSales)
router.route('/pay').post(payCredit)
router.route('/OrderNumber/:OrderNumber').get(getGeneralSalesByOrderNumber)

module.exports=router;
