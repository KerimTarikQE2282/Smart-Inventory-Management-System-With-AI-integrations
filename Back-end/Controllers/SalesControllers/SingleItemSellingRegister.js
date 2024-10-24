const singleItemsSaleModel=require('../../models/Sale/SingleItemSale')
const StatusCodes=require('http-status-codes')
const { BadRequestError } = require('../../errors')

const MakesingleItemsSale=async (req,res)=>{
  if(req.user.role !== 'admin' && req.user.role !== 'sales_personnel') {
    throw new BadRequestError('Access Denied');
  }
    await singleItemsSaleModel.create(req.body);
    res.status(StatusCodes.OK).json({msg:"Sales Completed Succesfully"})
}

const getAllSales=async(req,res)=>{
  if(req.user.role !== 'admin' && req.user.role !== 'sales_personnel') {
    throw new BadRequestError('Access Denied');
  }
    const AllSales=await singleItemsSaleModel.find({})
    res.status(StatusCodes.OK).json({AllSales:AllSales,lenght:AllSales.length})
}
const getSalesByOrderNumber=async (req,res)=>{
  if(req.user.role !== 'admin' && req.user.role !== 'sales_personnel') {
    throw new BadRequestError('Access Denied');
  }
    const {OrderNumber}=req.params;
    if(!OrderNumber){
      throw new BadRequestError("please provide OrderNumber")
    }
    const MySale=await singleItemsSaleModel.find({OrderNumber:OrderNumber})
    if(MySale.length===0){
      
      throw new BadRequestError("please provide a valid  OrderNumber")
    }
    res.status(StatusCodes.OK).json(MySale);
}
  
  
//TODO do we need to update and delete sale
//   }
  module.exports={MakesingleItemsSale,getAllSales,getSalesByOrderNumber}