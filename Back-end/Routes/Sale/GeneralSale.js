const express=require('express')
const router=express.Router()
const { addGeneralSale,payCredit,TodaysSales,weeklySales,weekwholesales}=require('../../Controllers/SalesControllers/GeneralSale')
const {getAllPayedGeneralSales,getAllunPayedGeneralSales,getGeneralSalesByOrderNumber,updateGeneralSale}=require('../../Controllers/SalesControllers/ViewSalesGeneral')
router.route('/').post(addGeneralSale).get(getAllPayedGeneralSales)
router.route('/unpayed').get(getAllunPayedGeneralSales)
router.route('/pay').post(payCredit)
router.route('/OrderNumber/:OrderNumber').get(getGeneralSalesByOrderNumber)
router.route('/TodaySales').get(TodaysSales)
router.route('/weeklySales').get(weeklySales)

module.exports=router;
