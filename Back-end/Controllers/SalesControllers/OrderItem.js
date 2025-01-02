const StatusCodes=require('http-status-codes')
const OrderItem =require('../../models/Sale/OrderItem')
const { BadRequestError } = require('../../errors')

const addOrderItem=async (req,res)=>{
  if(req.user.role !== 'admin' && req.user.role !== 'sales_personnel') {
    throw new BadRequestError('Access Denied');
  }
    res.status(StatusCodes.OK).json(newOrderItem)
}

const getAllOrderItems=async (req,res) =>{
  if(req.user.role !== 'admin' && req.user.role !== 'sales_personnel') {
    throw new BadRequestError('Access Denied');
  }
    const AllOrderItem=await OrderItem.find({})
    res.status(StatusCodes.OK).json({AllOrderItem:AllOrderItem,lenght:AllOrderItem.length})
  }
  
  const updateOrderItem=async(req,res)=>{
    if(req.user.role !== 'admin' || req.user.role !== 'sales_personnel') {
      throw new BadRequestError('Access Denied');
    }
    const {OrderNumber}=req.params;
    const MyData=req.body;
   
    const UpdatableOrderItem=await OrderItem.findOne({orderNumber:OrderNumber});
    if(!UpdatableOrderItem || !OrderNumber){
      throw new BadRequestError("please provide valid Order Number");
    }
    const UpdatedOrderItem=await OrderItem.findOneAndUpdate({orderNumber:OrderNumber},MyData,{
      new:true,
      runValidators:true
    })
    res.status(StatusCodes.OK).json(UpdatedOrderItem)
  }

module.exports = { addOrderItem,getAllOrderItems,updateOrderItem};
  

