const PO = require('../../models/Store/P.o');
const StatusCodes = require('http-status-codes');
const { BadRequestError } = require('../../errors/');

// Fetch all purchase orders
const getAllPOs = async (req, res) => {
  const user = req.user;
  if (user.role !== 'admin') {
    throw new BadRequestError('Access Denied');
  }
  try {
    const pos = await PO.find({});
    res.status(StatusCodes.OK).json({ PO:pos });
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'An error occurred while fetching the purchase orders' });
  }
};

// Fetch a purchase order by ID
const getPOById = async (req, res) => {
  const user = req.user;
  if (user.role !== 'admin') {
    throw new BadRequestError('Access Denied');
  }
  const { id } = req.params;

  const po = await PO.findById({ _id: id });
  if (!po || !id) {
    throw new BadRequestError('Please provide a valid Purchase Order ID');
  }

  res.status(StatusCodes.OK).json(po);
};

// Create a new purchase order
const createPO = async (req, res) => {
  const user = req.user;
  if (user.role !== 'admin') {
    throw new BadRequestError('Access Denied');
  }

  const newPO = await PO.create(req.body);
  res.status(StatusCodes.OK).json(newPO);
};

// Update a purchase order by ID
const updatePOById = async (req, res) => {
  const user = req.user;
  if (user.role !== 'admin') {
    throw new BadRequestError('Access Denied');
  }
  const { id } = req.params;
  const updateData = req.body;

  const updatablePO = await PO.findById(id);
  if (!updatablePO) {
    throw new BadRequestError('Please provide a valid Purchase Order ID');
  }

  const updatedPO = await PO.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });

  res.status(StatusCodes.OK).json(updatedPO);
};

// Delete a purchase order by ID
const deletePOById = async (req, res) => {
  const user = req.user;
  if (user.role !== 'admin') {
    throw new BadRequestError('Access Denied');
  }
  const { id } = req.params;

  const deletablePO = await PO.findById(id);
  if (!deletablePO) {
    throw new BadRequestError('Please provide a valid Purchase Order ID');
  }

  await PO.findByIdAndDelete(id);
  res.status(StatusCodes.OK).json({ Deleted: true });
};

// Search purchase orders by purchase order name (using regex)
const searchPO = async (req, res) => {
  const user = req.user;
  if (user.role !== 'admin') {
    throw new BadRequestError('Access Denied');
  }

  const { PurchaseOrder } = req.body;
  if (!PurchaseOrder) {
    return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Please provide a search query.' });
  }

  const pos = await PO.find({
    PurchaseOrder: { $regex: PurchaseOrder, $options: 'i' },
  });

  if (pos.length === 0) {
    return res.status(StatusCodes.NOT_FOUND).json({ message: 'No purchase orders found.' });
  }

  res.status(StatusCodes.OK).json(pos);
};

module.exports = {
  getAllPOs,
  getPOById,
  createPO,
  updatePOById,
  deletePOById,
  searchPO,
};
