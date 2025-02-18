const Store = require('../../models/Store/Shop');
const { StatusCodes } = require('http-status-codes');
const InventoryAdjustments=require('../../models/Store/WareHouseItem')  
const ItemModel=require('../../models/Store/item')
const WareHouseItem = require('../../models/Store/WareHouseItem');

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

///////////////////////////////////////////////////////////////////////////////////////////////




// const getAllContainedWareHouseItems = async (req, res) => {
//   if(req.user.role !== 'admin' && req.user.role !== 'warehouse_personnel') {
//     throw new BadRequestError('Access Denied');
//   }
 
//     const wareHouseId = req.params.wareHouseId;


//     // Fetch items that belong to the specific warehouse
//     const wareHouseItems = await InventoryAdjustments.find({ });
//     const matchingItems = wareHouseItems.filter(item => {
//       const itemWentTo = item.itemWentTo;

   

//       return itemWentTo[itemWentTo.length - 1] .equals(wareHouseId);
//     });
//     const newMatchingItems = await Promise.all(
//       matchingItems.map(async (item) => {
//         const itemName = await ItemModel.findById(item?.item);
//         return { ...item, itemName: itemName?.title }; // Add the title from itemName
//       })
//     );
    

//     var myItemDisplacement={}

//       for (var i=0;i<newMatchingItems.length;i++){
//           if(myItemDisplacement[newMatchingItems[i].itemName]==null){
//             myItemDisplacement[newMatchingItems[i].itemName]=1

//           }
//           else{
//             myItemDisplacement[newMatchingItems[i].itemName]=myItemDisplacement[newMatchingItems[i].itemName]+1
//           }
//       }
//     // Send a successful response with the warehouse items
//     res.status(StatusCodes.OK).json(myItemDisplacement);

// };

const getAllContainedStoreItemsDetailed = async (req, res) => {
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




//////////////////////////////////////////////////////////////////////////////////////////

module.exports = { getAllStores, createStore, updateStore, deleteStore, getStoreById,searchStore,getAllContainedShopItems,getAllContainedStoreItemsDetailed  };
