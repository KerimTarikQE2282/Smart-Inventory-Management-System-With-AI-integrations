const StatusCodes=require('http-status-codes')
const { BadRequestError } = require('../../errors')
const ContainedItemsModel=require('../../models/Store/WareHouseItem');
const { findByIdAndUpdate } = require('../../models/Store/AddStockAdjustemnt');
const WareHouseItem = require('../../models/Store/WareHouseItem');
const warehouse = require('../../models/Store/warehouse');
const itemModel = require('../../models/Store/item');
const Store = require('../../models/Store/Shop');




// Send Item to store
const Send_Item_to_Store=async (req,res)=>{
  if(req.user.role !== 'admin' && req.user.role !== 'warehouse_personnel') {
    throw new BadRequestError('Access Denied');
  }

  const {item,From_warehouse,To_WareHouse,Carton_number,from_Carton_Number,to_Carton_Number}=req.body;
 const MyCarton_number=Carton_number


  if(!item || !MyCarton_number || !To_WareHouse || !From_warehouse){
    if(!from_Carton_Number || !to_Carton_Number || !item  || !To_WareHouse || !From_warehouse){
      throw new BadRequestError("Please provide Valid values")
}



 else{
  const my_item= await itemModel.findOne({_id:item})
  const my_from_wareHoue=await warehouse.findOne({_id:From_warehouse})
  const my_to_wareHoue=await Store.findOne({_id:To_WareHouse})
  const start=parseInt(from_Carton_Number)
  const end= parseInt(to_Carton_Number)
  const my_wareHouse_items=[];
  

  for(var i=start;i<=end;i++){
    console.log('here')
    const item_is_in_my_wareHouse=await ContainedItemsModel.findOne({item:item,Carton_Number:i,StoredAt:my_from_wareHoue})
    if(item_is_in_my_wareHouse==null){
      throw new BadRequestError("Please provide Valid values for the wareHouse items")
    }
    my_wareHouse_items.push(item_is_in_my_wareHouse);
  }

  for(var i=start;i<=end;i++){
    if(!my_item || !my_from_wareHoue || !my_to_wareHoue ){
      throw new BadRequestError("Please provide Valid values for the wareHouse items")
  }
  }
  for (var i=start;i<=end;i++){
    
  const updated_Carton = await ContainedItemsModel.findOneAndUpdate(
    {
      item:my_item,
      Carton_Number: i,
      StoredAt: my_from_wareHoue,
     
      __v: 0
    }, 
      {
        $set: { StoredAt: my_to_wareHoue }, 
        $push: { itemWentTo: To_WareHouse } 
      },
      { new: true, runValidators: true } );
      console.log("🚀 ==> file: WareHouseAdjustments.js:116 ==> constAdjust_wareHouse_Item= ==> updated_Carton:", updated_Carton);

      



    
    }

}
res.status(StatusCodes.OK).json({msg:"multiple Item Adjustment Succesfull"})
  }
else{
  const my_item= await itemModel.findOne({_id:item})
  const my_from_wareHoue=await warehouse.findOne({_id:From_warehouse})
  const my_to_wareHoue=await Store.findOne({_id:To_WareHouse})
  const item_is_in_my_wareHouse=await ContainedItemsModel.findOne({item:item,Carton_Number:MyCarton_number,StoredAt:my_from_wareHoue})
  console.log("🚀 ==> file: wareHouseToStoreAdjustments.js:82 ==> constSend_Item_to_Store= ==> my_from_wareHoue:", my_from_wareHoue);

  if(!my_item || !my_from_wareHoue || !my_to_wareHoue || !item_is_in_my_wareHouse){
    throw new BadRequestError("Please provide Valid values for the wareHouse items single")
}


const updated_Carton = await ContainedItemsModel.findOneAndUpdate(
  { _id: item_is_in_my_wareHouse._id }, 
  {
    $set: { StoredAt: To_WareHouse }, 
    $push: { itemWentTo: To_WareHouse } 
  },
  { new: true, runValidators: true } 
);
console.log("🚀 ==> file: WareHouseAdjustments.js:139 ==> constAdjust_wareHouse_Item= ==> updated_Carton:", updated_Carton);

res.status(StatusCodes.OK).json({msg:"Single Item Adjustment Succesfull"})

  
}
}

module.exports={Send_Item_to_Store};