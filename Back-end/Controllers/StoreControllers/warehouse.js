const Warehouse =require('../../models/Store/warehouse');
const WareHouseItem = require('../../models/Store/WareHouseItem');
const InventoryAdjustments=require('../../models/Store/WareHouseItem')  
const { StatusCodes } = require('http-status-codes');
const ItemModel=require('../../models/Store/item')
const  {BadRequestError} =require ( '../../errors/index')
const getAllWarehouses = async (req, res) => {
  if(req.user.role !== 'admin' && req.user.role !== 'warehouse_personnel') {
    throw new BadRequestError('Access Denied');
  }
  try {
    const warehouses = await Warehouse.find({});
    res.status(200).json({ WareHouse:warehouses,number:(warehouses.length) });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'An error occurred while fetching the warehouses' });
  }
};

const createWarehouse = async (req, res) => {
  if(req.user.role !== 'admin' && req.user.role !== 'warehouse_personnel') {
    throw new BadRequestError('Access Denied');
  }
  try {
    const { WareHouseName, WareHouseLocation, WareHouseDescription, WareHouseType,Capacity } = req.body;
    const newWarehouse = await Warehouse.create({ WareHouseName, WareHouseLocation, WareHouseDescription, WareHouseType,Capacity });
    res.status(201).json({ newWarehouse });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'An error occurred while creating the warehouse' });
  }
};

const updateWarehouse = async (req, res) => {
  if(req.user.role !== 'admin' && req.user.role !== 'warehouse_personnel') {
    throw new BadRequestError('Access Denied');
  }
  try {
    const { id } = req.params;
    const warehouseExists = await Warehouse.findById(id);

    if (!warehouseExists) {
      return res.status(404).json({ message: "Warehouse Not Found." });
    }

    const updatedWarehouse = await Warehouse.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedWarehouse);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'An error occurred while updating the warehouse' });
  }
};

const deleteWarehouse = async (req, res) => {
  if(req.user.role !== 'admin' && req.user.role !== 'warehouse_personnel') {
    throw new BadRequestError('Access Denied');
  }
  try {
    const { id } = req.params;
    const warehouseExists = await Warehouse.findById(id);

    if (!warehouseExists) {
      return res.status(404).json({ message: "Warehouse Not Found." });
    }

    await Warehouse.findByIdAndDelete(id);
    res.status(204).send();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'An error occurred while deleting the warehouse' });
  }
};

const getWarehouseById = async (req, res) => {
  if(req.user.role !== 'admin' && req.user.role !== 'warehouse_personnel') {
    throw new BadRequestError('Access Denied');
  }
  try {
    const { id } = req.params;
    const warehouseExists = await Warehouse.findById(id);

    if (!warehouseExists) {
      return res.status(404).json({ message: "Warehouse Not Found." });
    }

    res.status(200).json(warehouseExists);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'An error occurred while fetching the warehouse' });
  }
};



const searchWareHouse = async (req, res) => {
  if(req.user.role !== 'admin' && req.user.role !== 'warehouse_personnel') {
    throw new BadRequestError('Access Denied');
  }

  const { Name } = req.body;

  if (!Name) {
    return res.status(400).json({ error: 'Please provide a search query.' });
  }

  const warehouses = await Warehouse.find({
    $or: [
      { WareHouseName: { $regex: Name, $options: 'i' } },
      { WareHouseLocation: { $regex: Name, $options: 'i' } }
    ]
  });

  if (warehouses.length === 0) {
    return res.status(404).json({ message: 'No warehouses found.' });
  }

  res.status(200).json(warehouses);

};
const getAllContainedWareHouseItems = async (req, res) => {
  if(req.user.role !== 'admin' && req.user.role !== 'warehouse_personnel') {
    throw new BadRequestError('Access Denied');
  }
 
    const wareHouseId = req.params.wareHouseId;


    // Fetch items that belong to the specific warehouse
    const wareHouseItems = await InventoryAdjustments.find({ });
    const matchingItems = wareHouseItems.filter(item => {
      const itemWentTo = item.itemWentTo;

   

      return itemWentTo[itemWentTo.length - 1] .equals(wareHouseId);
    });
    const newMatchingItems = await Promise.all(
      matchingItems.map(async (item) => {
        const itemName = await ItemModel.findById(item?.item);
        return { ...item, itemName: itemName?.title }; // Add the title from itemName
      })
    );
    

    var myItemDisplacement={}

      for (var i=0;i<newMatchingItems.length;i++){
          if(myItemDisplacement[newMatchingItems[i].itemName]==null){
            myItemDisplacement[newMatchingItems[i].itemName]=1

          }
          else{
            myItemDisplacement[newMatchingItems[i].itemName]=myItemDisplacement[newMatchingItems[i].itemName]+1
          }
      }
    // Send a successful response with the warehouse items
    res.status(StatusCodes.OK).json(myItemDisplacement);

};

const getAllContainedWareHouseItemsDetailed = async (req, res) => {
  console.log("🚀 ==> file: warehouse.js:163 ==> getAllContainedWareHouseItemsDetailed ==> eq.user.role:", req.user.role);

  if(req.user.role !== 'admin' && req.user.role !== 'warehouse_personnel') {

    throw new BadRequestError('Access Denied');
  }
  try {
    const wareHouseId = req.params.wareHouseId;

    // Fetch items that belong to the specific warehouse
    const wareHouseItems = await InventoryAdjustments.find({});
    
    // Filter items based on the warehouse they were last sent to
    const matchingItems = wareHouseItems.filter(item => {
      const itemWentTo = item.itemWentTo;
      return itemWentTo[itemWentTo.length - 1].equals(wareHouseId);
    });

    // Retrieve item names and map the results to include only Carton_Number and itemName
    const newMatchingItems = await Promise.all(
      matchingItems.map(async (item) => {
        const itemName = await ItemModel.findById(item?.item);
        return {
          Carton_Number: item?.Carton_Number,
          itemName: itemName?.title || 'Unknown Item'  // Default to 'Unknown Item' if title is not found
        };
      })
    );

    // Send the filtered data with only Carton_Number and itemName
    res.status(StatusCodes.OK).json({details:newMatchingItems});
  } catch (error) {
    // Handle any errors that occur
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Error fetching warehouse items' });
  }
};







module.exports = { getAllWarehouses, 
  createWarehouse,
   updateWarehouse,
    deleteWarehouse,
     getWarehouseById,
      searchWareHouse ,
      getAllContainedWareHouseItems,
      getAllContainedWareHouseItemsDetailed,
      };
