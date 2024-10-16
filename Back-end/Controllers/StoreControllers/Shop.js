const Store = require('../../models/Store/Shop');

const getAllStores = async (req, res) => {
  try {
    const stores = await Store.find({});
    res.status(200).json({ stores, number: stores.length });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'An error occurred while fetching the stores' });
  }
};

const createStore = async (req, res) => {
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

module.exports = { getAllStores, createStore, updateStore, deleteStore, getStoreById,searchStore  };
