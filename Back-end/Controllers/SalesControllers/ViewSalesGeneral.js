const StatusCodes=require('http-status-codes')
const GeneralSaleModel=require('../../models/Sale/GeneralSale')
const { BadRequestError } = require('../../errors');
const OrderItem = require('../../models/Sale/OrderItem');
const CustomerModel=require('../../models/Store/Customer')


//Get All Fully Payed Sales  
const getAllPayedGeneralSales = async (req, res) => {
  if(req.user.role !== 'admin' && req.user.role !== 'sales_personnel') {
    throw new BadRequestError('Access Denied');
  }
      const AllGeneralSales = await GeneralSaleModel.find(
        { billingStatus: "paid" },
        { _id: 0, customer: 1, orderDate: 1, orderTotal: 1, paymentMethod: 1 }
      );
  
      const SalesPromises = AllGeneralSales.map(async sale => {
        const { customer, orderDate, orderTotal, paymentMethod } = sale;
        const myCustomerName = await CustomerModel.findOne({ _id: customer });

        return {
          orderDate,
          orderTotal,
          paymentMethod,
          customer: myCustomerName ? myCustomerName.customerName : 'Unknown' 
        };
      });
  
      const Sales = await Promise.all(SalesPromises);
  
      res.status(StatusCodes.OK).json({'GeneralSales':Sales} );
    
  };

//Get all fully Unpayed Sales
  const getAllunPayedGeneralSales = async (req, res) => {
    if(req.user.role !== 'admin' && req.user.role !== 'sales_personnel') {
      throw new BadRequestError('Access Denied');
    }
   
    const AllGeneralSales = await GeneralSaleModel.find(
      {  billingStatus: { $in: ["unpaid", "partially paid"] } },
      { _id: 0, customer: 1, orderDate: 1, orderTotal: 1, paymentMethod: 1 ,orderNumber:1}
    );

    const SalesPromises = AllGeneralSales.map(async sale => {
      const { customer, orderDate, orderTotal, paymentMethod,orderNumber } = sale;
      const myCustomerName = await CustomerModel.findOne({ _id: customer });

      return {
        orderDate,
        orderTotal,
        paymentMethod,
        orderNumber,
        customer: myCustomerName ? myCustomerName.customerName : 'Unknown' 
      };
    });

    const Sales = await Promise.all(SalesPromises);

    res.status(StatusCodes.OK).json({'GeneralSales':Sales} );
  
};
//Get Specific Unpayed General Sales
const getAllunPayedGeneralSalesByOrderNumber = async (req, res) => {
  if(req.user.role !== 'admin' && req.user.role !== 'sales_personnel') {
    throw new BadRequestError('Access Denied');
  }
   
  const AllGeneralSales = await GeneralSaleModel.find(
    {  billingStatus: { $in: ["unpaid", "partially paid"],
      orderNumber:req.params.orderNumber } },
    { _id: 0, customer: 1, orderDate: 1, orderTotal: 1, paymentMethod: 1 ,orderNumber:1}
  );

  const SalesPromises = AllGeneralSales.map(async sale => {
    const { customer, orderDate, orderTotal, paymentMethod,orderNumber } = sale;
    const myCustomerName = await CustomerModel.findOne({ _id: customer });

    return {
      orderDate,
      orderTotal,
      paymentMethod,
      orderNumber,
      customer: myCustomerName ? myCustomerName.customerName : 'Unknown' 
    };
  });

  const Sales = await Promise.all(SalesPromises);

  res.status(StatusCodes.OK).json({'GeneralSales':Sales} );

};
  
//get general Sales by order Number
const getGeneralSalesByOrderNumber = async (req, res) => {
  if(req.user.role !== 'admin' && req.user.role !== 'sales_personnel') {
    throw new BadRequestError('Access Denied');
  }
  const { OrderNumber } = req.params;

  if (!OrderNumber) {
    throw new BadRequestError("Please provide an OrderNumber");
  }

  const MySale = await GeneralSaleModel.findOne({ orderNumber: OrderNumber });

  if (!MySale) {
    throw new BadRequestError("Please provide a valid OrderNumber");
  }

  const MyOrderItem = await OrderItem.find({ orderNumber: MySale._id });
  const Customer=await CustomerModel.findOne({_id:MySale.customer})
  const Sale = {
    ...MySale.toObject(), 
    OrderedItems: MyOrderItem,
    customer:Customer.customerName,
    Customeradress:Customer.address1,
    CustomerPhone:Customer.phone1

  };

  res.status(StatusCodes.OK).json(Sale);
};



const updateGeneralSale=async(req,res)=>{
  if(req.user.role !== 'admin' && req.user.role !== 'sales_personnel') {
    throw new BadRequestError('Access Denied');
  }
    const {OrderNumber}=req.params;
    const MyData=req.body;
   
    const UpdatableGeneralSale=await GeneralSaleModel.findOne({orderNumber:OrderNumber});
    if(!UpdatableGeneralSale || !OrderNumber){
      throw new BadRequestError("please provide valid Order Number");
    }
    const UpdatedGeneralSale=await GeneralSaleModel.findOneAndUpdate({orderNumber:OrderNumber},MyData,{
      new:true,
      runValidators:true
    })
    res.status(StatusCodes.OK).json(UpdatedGeneralSale)
  }


  module.exports={getAllPayedGeneralSales,getAllunPayedGeneralSales,getGeneralSalesByOrderNumber,getAllunPayedGeneralSalesByOrderNumber,updateGeneralSale}