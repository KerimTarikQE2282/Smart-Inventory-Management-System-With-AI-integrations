const Brand = require('../../models/Store/brands');
const StatusCodes = require('http-status-codes');
const { BadRequestError } = require('../../errors/')

// Fetch all brands
const getAllBrands = async (req, res) => {
  const user = req.user;
  if(req.user.role !== 'admin') {
    throw new BadRequestError('Access Denied');
  }
  try {
    const brands = await Brand.find({});
    res.status(StatusCodes.OK).json({ brands });
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'An error occurred while fetching the brands' });
  }
};

// Fetch a brand by ID
const getBrandById = async (req, res) => {
  if(req.user.role !== 'admin') {
    throw new BadRequestError('Access Denied');
  }
  const { id } = req.params;

  const brand = await Brand.findById({ _id: id });
  if (!brand || !id) {
    throw new BadRequestError("Please provide a valid ID");
  }

  res.status(StatusCodes.OK).json(brand);
};

// Create a new brand
const createBrand = async (req, res) => {
  if(req.user.role !== 'admin') {
    throw new BadRequestError('Access Denied');
  }
  const myNewBrand = await Brand.create(req.body);
  res.status(StatusCodes.OK).json(myNewBrand);
};

// Update a brand by ID
const updateBrandById = async (req, res) => {
  if(req.user.role !== 'admin') {
    throw new BadRequestError('Access Denied');
  }
  const { id } = req.params;
  console.log("🚀 ==> updateBrandById ==> id:", id);

  const updateData = req.body;

  const UpdatableBrand = await Brand.findOne({ _id: id });
  console.log("🚀 ==> updateBrandById ==> UpdatableBrand:", UpdatableBrand);

  if (!UpdatableBrand || !id) {
    throw new BadRequestError("Please provide a valid ID");
  }

  const UpdatedBrand = await Brand.findOneAndUpdate({ _id: id }, updateData, {
    new: true,
    runValidators: true
  });

  res.status(StatusCodes.OK).json(UpdatedBrand);
};

// Delete a brand by ID
const deleteBrandById = async (req, res) => {
  const { id } = req.params;

  const DeletableBrand = await Brand.findById({ _id: id });
  if (!DeletableBrand || !id) {
    throw new BadRequestError("Please provide a valid ID");
  }

  await Brand.findOneAndDelete({ _id: id });
  res.status(StatusCodes.OK).json({ Deleted: true });
};


const searchBrand = async (req, res) => {
  console.log(req.user.role)
  if(req.user.role !== 'admin') {
    throw new BadRequestError('Access Denied');
  }
    const { Name } = req.body;
    console.log("🚀 ==> file: brand.js:73 ==> searchBrand ==> Name:", Name);


    if (!Name) {
      return res.status(400).json({ error: 'Please provide a search query.' });
    }

    const brands = await Brand.find({
      BrandName: { $regex: Name, $options: 'i' }
    });

    if (brands.length === 0) {
      return res.status(404).json({ message: 'No brands found.' });
    }

    res.status(200).json(brands);
 
};





module.exports = {
  getAllBrands,
  getBrandById,
  createBrand,
  updateBrandById,
  deleteBrandById,
  searchBrand
};
