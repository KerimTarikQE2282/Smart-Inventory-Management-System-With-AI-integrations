const StatusCodes=require('http-status-codes')
const { BadRequestError } = require('../../errors')
const ContainedItemsModel=require('../../models/Store/WareHouseItem');
const { findByIdAndUpdate } = require('../../models/Store/AddStockAdjustemnt');
const WareHouseItem = require('../../models/Store/WareHouseItem');
const warehouse = require('../../models/Store/warehouse');
const itemModel = require('../../models/Store/item');

const WareHouseAddedItems = async (req, res) => {
    const addedItems = await ContainedItemsModel.find({ itemWentTo: { $size: 1 } });
const resJson = [];

for (const item of addedItems) {
    // Await the results of the asynchronous operations
    const itemDetails = await itemModel.findOne({ _id: item.item });
    const wareHouseDetails = await warehouse.findOne({ _id: item.StoredAt });
    console.log("🚀 ==> file: getWareHouseAdjustments.js:17 ==> WareHouseAddedItems ==> wareHouseDetails:", wareHouseDetails);


    // Push the resolved data into resJson
    resJson.push({
        item:itemDetails?.title,
        StoredAt: wareHouseDetails?.WareHouseName,
        createdAt: item?.createdAt,
        carton: item?.Carton_Number
    });
}
    res.status(StatusCodes.OK).json(resJson.reverse())
}

const WareHouseTransferedItems = async (req, res) => {
    const addedItems = await ContainedItemsModel.find({ });
    const resJson = [];
    
    for (const item of addedItems) {
        // Await the results of the asynchronous operations
        const itemDetails = await itemModel.findOne({ _id: item.item });
        const wareHouseDetails = await warehouse.findOne({ _id: item.StoredAt });
    
        // Push the resolved data into resJson
        resJson.push({
            item:itemDetails?.title,
        StoredAt: wareHouseDetails?.WareHouseName,
        createdAt: item?.createdAt,
        carton: item?.Carton_Number
        });
    }
        res.status(StatusCodes.OK).json(resJson.reverse())
}


const getTotalItemCounts=async(req,res)=>{
    const AllItems=await ContainedItemsModel.find({});
    
    const AvailableItemQuantities={}
    AllItems.map(data=>{
        if(data.item in AvailableItemQuantities){
            AvailableItemQuantities[data.item]=AvailableItemQuantities[data.item]+1
        }
        else{
            AvailableItemQuantities[data.item]=1
        }
    })
    const Items=await itemModel.find({})
    const AvailableItemQuantitiesfixed={}
    Items.map(data=>{
        
        if(data._id in AvailableItemQuantities){
            AvailableItemQuantitiesfixed[data.title]=AvailableItemQuantities[data._id]
        }
    })
    res.status(StatusCodes.OK).json(AvailableItemQuantitiesfixed)
}


module.exports={WareHouseAddedItems,WareHouseTransferedItems,getTotalItemCounts}