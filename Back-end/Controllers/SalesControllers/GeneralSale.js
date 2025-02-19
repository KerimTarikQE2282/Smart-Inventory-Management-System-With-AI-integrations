const StatusCodes=require('http-status-codes')
const GeneralSaleModel=require('../../models/Sale/GeneralSale')
const { BadRequestError } = require('../../errors');
const OrderItem = require('../../models/Sale/OrderItem');

//TODO  dont forget to specify created by after specifyint 
// Add General sales
const addGeneralSale= async (req,res) => {
  if(req.user.role !== 'admin' && req.user.role !== 'sales_personnel') {
    throw new BadRequestError('Access Denied');
  }
console.log("🚀 ==> file: GeneralSale.js:9 ==> addGeneralSale ==> req:", req.body);


    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1; 
    const day = now.getDate();
    const {orderNumber,customer,orderStatus,billingStatus,orderTotal,paymentMethod,salesRepresentative,Order_item,payedAmount}=req.body;

    var unpayedAmount=orderTotal-payedAmount  

    const payment={
      payedAmount:payedAmount,
      date:`${year}-${month}-${day}`
    }
    console.log("🚀 ==> file: GeneralSale.js:23 ==> addGeneralSale ==> payment:", payment);



    if(billingStatus!='paid'){
      var Sale=await GeneralSaleModel.findOne({customer:customer})
      if(Sale){
      let TotalCredit = 0;
      for (let i = 0; i < Sale.length; i++) {
        TotalCredit += Sale[i].orderTotal;
        TotalCredit += unpayedAmount;
    if(TotalCredit>1000000){
      res.status(400).json({msg:"Credit Limit is exceeded"})
    }
      }
    }
    
  }


    Sale={
      orderNumber:orderNumber,
      customer:customer,
      orderDate:`${year}-${month}-${day}`,
      orderTotal:orderTotal,
      paymentMethod:paymentMethod,
      salesRepresentative:salesRepresentative,
      orderStatus:orderStatus,
      billingStatus:billingStatus,
      unpaidAmount:unpayedAmount,
      payment:[payment]
    }
    const myGeneralSale=await GeneralSaleModel.create(Sale)

    const OrderItemModified=Order_item.map((item)=>({
    ...item,
    orderNumber:myGeneralSale._id
  }))

  await OrderItem.create(OrderItemModified)


  res.status(StatusCodes.OK).json({msg:"Sale Completed Succesfully",body:req.body})

}





//Pay credits
const payCredit= async (req,res)=>{
  if(req.user.role !== 'admin' && req.user.role !== 'sales_personnel') {
    throw new BadRequestError('Access Denied');
  }
  const {OrderNumber,payedAmount}=req.body
  console.log("🚀 ==> file: GeneralSale.js:77 ==> payCredit ==> OrderNumber,payedAmount:", OrderNumber,payedAmount);

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1; // Months are zero-based (0-11)
  const day = now.getDate();

  const CustomerCredit = await GeneralSaleModel.findOne({ orderNumber: OrderNumber });
    
  if (!CustomerCredit) {
    return res.status(404).json({ msg: "Order not found" });
  }

  const TotalPayments = CustomerCredit.payment;
  var TotalPaymentAmount=0
  for (let i = 0; i < TotalPayments.length; i++) {
    TotalPaymentAmount += TotalPayments[i].payedAmount;
  }
  const DebtLeftToBePaid=CustomerCredit.orderTotal-TotalPaymentAmount
  if(payedAmount>DebtLeftToBePaid){
    return res.status(400).json({ msg: "Paid amount exceeds the remaining debt" });
  }
  else{
    CustomerCredit.payment.push({ payedAmount, payedDate:`${year}-${month}-${day}` });
    if(TotalPaymentAmount+payedAmount==CustomerCredit.orderTotal){
      console.log("🚀 ==> file: GeneralSale.js:100 ==> payCredit ==> TotalPaymentAmount+payedAmount:", TotalPaymentAmount+payedAmount);

      CustomerCredit.billingStatus="paid"
    }
    else{
      CustomerCredit.billingStatus="partially paid"

    }
    await CustomerCredit.save();
    return res.status(200).json({ msg: "Payment recorded successfully" });
  }
  

 
}

const TodaysSales=async (req,res)=>{
const Today=new Date()
const year = Today.getFullYear();
const month=Today.getMonth()+1
const day=Today.getDate()
const TodayDate=`${year}-${month}-${day}`
const TodaysSalesDaya=await GeneralSaleModel.find({orderDate:TodayDate})
res.status(200).json({msg:"Todays Sales",body:TodaysSalesDaya})

}
const weeklySales = async (req, res) => {
  const today = new Date();
  const weekAgo = new Date();
  weekAgo.setDate(today.getDate() - 7); // Corrected the subtraction

  try {
    const sales = await GeneralSaleModel.find({
      orderDate: { 
        $gte: weekAgo, 
        $lte: today 
      }
    });

    res.json(sales); // Send response with sales data
  } catch (error) {
    res.status(500).json({ error: error.message }); // Handle errors
  }
};


module.exports = { addGeneralSale,payCredit,TodaysSales,weeklySales};
  


