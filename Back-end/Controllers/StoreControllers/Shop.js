const Store = require('../../models/Store/Shop');
const { StatusCodes } = require('http-status-codes');
const InventoryAdjustments=require('../../models/Store/WareHouseItem')  
const ItemModel=require('../../models/Store/item')

const getAllStores = async (req, res) => {
  if(req.user.role !== 'admin' ) {
    throw new BadRequestError('Access Denied');
  }
  try {
    const stores = await Store.find({});
    res.status(200).json({ stores, number: stores.length });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'An error occurred while fetching the stores' });
  }
};

const createStore = async (req, res) => {
  if(req.user.role !== 'admin' ) {
    throw new BadRequestError('Access Denied');
  }
  try {
    const { StoreName, StoreLocation,Capacity, StoreDescription, StoreType } = req.body;
    const newStore = await Store.create({ StoreName, StoreLocation, StoreDescription, StoreType ,Capacity});
    res.status(201).json({ newStore });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'An error occurred while creating the store' });
  }
};

const updateStore = async (req, res) => {
  if(req.user.role !== 'admin' ) {
    throw new BadRequestError('Access Denied');
  }
  try {
    const { id } = req.params;
    const storeExists = await Store.findById(id);

    if (!storeExists) {
      return res.status(404).json({ message: "Store Not Found." });
    }

    const updatedStore = await Store.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedStore);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'An error occurred while updating the store' });
  }
};

const deleteStore = async (req, res) => {
  if(req.user.role !== 'admin' ) {
    throw new BadRequestError('Access Denied');
  }
  try {
    const { id } = req.params;
    const storeExists = await Store.findById(id);

    if (!storeExists) {
      return res.status(404).json({ message: "Store Not Found." });
    }

    await Store.findByIdAndDelete(id);
    res.status(204).send();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'An error occurred while deleting the store' });
  }
};

const getStoreById = async (req, res) => {
  if(req.user.role !== 'admin' ) {
    throw new BadRequestError('Access Denied');
  }
  try {
    const { id } = req.params;
    const storeExists = await Store.findById(id);

    if (!storeExists) {
      return res.status(404).json({ message: "Store Not Found." });
    }

    res.status(200).json(storeExists);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'An error occurred while fetching the store' });
  }
};



const searchStore = async (req, res) => {
  if(req.user.role !== 'admin' && req.user.role !== 'sales_personnel') {
    throw new BadRequestError('Access Denied');
  }
  const { Name } = req.body;

  if (!Name) {
    return res.status(400).json({ error: 'Please provide a search query.' });
  }
  const stores = await Store.find({
    $or: [
      { StoreName: { $regex: Name, $options: 'i' } },
      { StoreLocation: { $regex: Name, $options: 'i' } }
    ]
  });
  

  if (stores.length === 0) {
    return res.status(404).json({ message: 'No stores found.' });
  }

  res.status(200).json(stores);

};

const getAllContainedShopItems = async (req, res) => {
  if(req.user.role !== 'admin' && req.user.role !== 'sales_personnel') {
    throw new BadRequestError('Access Denied');
  }
   try {
    const wareHouseId = req.params.wareHouseId;


    // Fetch items that belong to the specific warehouse from InventoryAdjustments
    const wareHouseItems = await InventoryAdjustments.find({});


    
    // Filter items based on the warehouse they were last sent to
    const matchingItems = wareHouseItems.filter(item => {

      const itemWentTo = item.itemWentTo;
      return itemWentTo[itemWentTo.length - 1].equals(wareHouseId);
    });

    // Retrieve item names and map the results
    const newMatchingItems = await Promise.all(
      matchingItems.map(async (item) => {
        const itemName = await ItemModel.findById(item?.item);
        return { ...item._doc, itemName: itemName?.title }; // Add title from itemName
      })
    );
    console.log("🚀 ==> file: Shop.js:126 ==> getAllContainedShopItems ==> newMatchingItems:", newMatchingItems);


    // Create an object to store item displacement count
    let myItemDisplacement = {};

    // Count occurrences of each item by name
    newMatchingItems.forEach(item => {
      if (!myItemDisplacement[item.itemName]) {
        myItemDisplacement[item.itemName] = 1;
      } else {
        myItemDisplacement[item.itemName]++;
      }
    });

    // Send a successful response with the item displacement counts
    res.status(StatusCodes.OK).json(myItemDisplacement);
  } catch (error) {
    // Handle any errors that occur
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Error fetching warehouse items' });
  }
};



module.exports = { getAllStores, createStore, updateStore, deleteStore, getStoreById,searchStore,getAllContainedShopItems  };
