const StatusCodes=require('http-status-codes')
const Item=require('../../models/Store/item')
const { BadRequestError } = require('../../errors/')
const InventoryAdjustments=require('../../models/Store/WareHouseItem')  
const warehouse = require('../../models/Store/warehouse')


//TODO  dont forget to specify created by after specifyint 
const addItem = async (req,res) => {
  if(req.user.role !== 'admin') {
    throw new BadRequestError('Access Denied');
  }
  console.log("🚀 ==> file: items.js:8 ==> addItem ==> req:", req);

  const myNewItem=await Item.create(req.body)
  res.status(StatusCodes.OK).json(myNewItem)
}

const getAllItems=async(req,res)=>{
  const AllItems=await Item.find({})
  res.status(StatusCodes.OK).json({items:AllItems,lenght:AllItems.length})
}
const getItemsByID=async (req,res)=>{
  if(req.user.role !== 'admin' && req.user.role !== 'warehouse_personnel') {
    throw new BadRequestError('Access Denied');
  }
  const {id}=req.params;
  if(!id){
    throw new BadRequestError("please provide Id")
  }
  const MyItem=await Item.findOne({_id:id})
  res.status(StatusCodes.OK).json(MyItem);
}


const updateItems=async(req,res)=>{
  if(req.user.role !== 'admin' ) {
    throw new BadRequestError('Access Denied');
  }
  const {id}=req.params;
  console.log("🚀 ==> file: items.js:28 ==> updateItems ==> id:", id);

  const MyData=req.body;
 
  const UpdatableItem=await Item.findOne({_id:id});
  console.log("🚀 ==> file: items.js:31 ==> updateItems ==> UpdatableItem:", UpdatableItem);

  if(!UpdatableItem || !id){
    throw new BadRequestError("please provide valid Id");
  }
  const UpdatedItem=await Item.findOneAndUpdate({_id:id},MyData,{
    new:true,
    runValidators:true
  })
  res.status(StatusCodes.OK).json(UpdatedItem)
}

const removeItems=async(req,res)=>{
  if(req.user.role !== 'admin' ) {
    throw new BadRequestError('Access Denied');
  }
  const {id}=req.params;
  const DeletableItem=await Item.findById({_id:id});
  if(!DeletableItem || !id){
    throw new BadRequestError("please provide valid Id");
  }
  await Item.findOneAndDelete({_id:id});
  res.status(StatusCodes.OK).json({Deleted:true})
}


const searchItem = async (req, res) => {
  if(req.user.role !== 'admin' && req.user.role !== 'warehouse_personnel') {
    throw new BadRequestError('Access Denied');
  }
    const { Name } = req.body;

    if (!Name) {
      return res.status(400).json({ error: 'Please provide a search query.' });
    }

    const items = await Item.find({
      title: { $regex: Name, $options: 'i' }
    })
    .populate('category')
    .populate('unit')
    .populate('brand')
    .populate('supplier');

    if (items.length === 0) {
      return res.status(404).json({ message: 'No items found.' });
    }

    res.status(200).json(items);

};


const getAllContainedWareHouseItems = async (req, res) => {
  if(req.user.role !== 'admin' && req.user.role !== 'warehouse_personnel') {
    throw new BadRequestError('Access Denied');
  }
  const ItemId = req.params.itemId;

  var itemPlacements={}

  const ItemsInWareHouse=await InventoryAdjustments.find({item:ItemId})
  console.log("🚀 ==> file: items.js:92 ==> getAllContainedWareHouseItems ==> ItemsInWareHouse:", ItemsInWareHouse);




  for(var i=0;i<ItemsInWareHouse.length;i++){
    const myWareHouse=await warehouse.findOne({_id:ItemsInWareHouse[i].itemWentTo[ItemsInWareHouse[i].itemWentTo.length-1]})
    console.log("🚀 ==> file: items.js:100 ==> getAllContainedWareHouseItems ==> myWareHouse:", myWareHouse.WareHouseName);
    if(itemPlacements[myWareHouse.WareHouseName]==null){
      const myWareHouse=await warehouse.findOne({_id:ItemsInWareHouse[i].itemWentTo[ItemsInWareHouse[i].itemWentTo.length-1]})
      console.log("🚀 ==> file: items.js:100 ==> getAllContainedWareHouseItems ==> myWareHouse:", myWareHouse.WareHouseName);

      itemPlacements[myWareHouse.WareHouseName]=1
    }
    else{
      const myWareHouse=await warehouse.findOne({_id:ItemsInWareHouse[i].itemWentTo[ItemsInWareHouse[i].itemWentTo.length-1]})
      console.log("🚀 ==> file: items.js:100 ==> getAllContainedWareHouseItems ==> myWareHouse:", myWareHouse.WareHouseName);
      itemPlacements[myWareHouse.WareHouseName]++
      
    }
  }
 



  res.status(StatusCodes.OK).json(itemPlacements);

};



  module.exports = { addItem,getAllItems,getItemsByID,updateItems,removeItems,searchItem,getAllContainedWareHouseItems};
  