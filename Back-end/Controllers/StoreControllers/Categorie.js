const Category = require('../../models/Store/category'); // Adjust the path as necessary
const StatusCodes = require('http-status-codes');
const BadRequestError = require('../../errors'); // Adjust the path as necessary

// Fetch all categories
const getAllCategories = async (req, res) => {
  if(req.user.role !== 'admin') {
    throw new BadRequestError('Access Denied');
  }
  try {
    const categories = await Category.find({});
    res.status(StatusCodes.OK).json({"category": categories });
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'An error occurred while fetching the categories' });
  }
};

// Fetch a category by ID
const getCategoryById = async (req, res) => {
  if(req.user.role !== 'admin') {
    throw new BadRequestError('Access Denied');
  }
  const { id } = req.params;

  const category = await Category.findById(id);
  if (!category || !id) {
    throw new BadRequestError("Please provide a valid ID");
  }

  res.status(StatusCodes.OK).json(category);
};

// Create a new category
const createCategory = async (req, res) => {
  if(req.user.role !== 'admin') {
    throw new BadRequestError('Access Denied');
  }
  const newCategory = await Category.create(req.body);
  res.status(StatusCodes.CREATED).json(newCategory);
};

// Update a category by ID
const updateCategoryById = async (req, res) => {
  if(req.user.role !== 'admin') {
    throw new BadRequestError('Access Denied');
  }
  const { id } = req.params;
  console.log("🚀 ==> updateCategoryById ==> id:", id);

  const updateData = req.body;

  const UpdatableCategory = await Category.findOne({ _id: id });
  console.log("🚀 ==> updateCategoryById ==> UpdatableCategory:", UpdatableCategory);

  if (!UpdatableCategory || !id) {
    throw new BadRequestError("Please provide a valid ID");
  }

  const UpdatedCategory = await Category.findOneAndUpdate({ _id: id }, updateData, {

    new: true,
    runValidators: true
  });

  console.log("🚀 ==> file: Categorie.js:49 ==> updateCategoryById ==> updateData:", updateData);

  res.status(StatusCodes.OK).json(UpdatedCategory);
};

// Delete a category by ID
const deleteCategoryById = async (req, res) => {
  if(req.user.role !== 'admin') {
    throw new BadRequestError('Access Denied');
  }
  const { id } = req.params;

  const DeletableCategory = await Category.findById({ _id: id });
  if (!DeletableCategory || !id) {
    throw new BadRequestError("Please provide a valid ID");
  }

  await Category.findOneAndDelete({ _id: id });
  res.status(StatusCodes.OK).json({ Deleted: true });
};


const searchCategory = async (req, res) => {
  if(req.user.role !== 'admin') {
    throw new BadRequestError('Access Denied');
  }

  const { Name } = req.body;
  console.log("🚀 ==> file: Categorie.js:76 ==> searchCategory ==> Name:",  req.query);


  if (!Name) {
    return res.status(400).json({ error: 'Please provide a search query.' });
  }

  const categories = await Category.find({
    title: { $regex: Name, $options: 'i' }
  });

  if (categories.length === 0) {
    return res.status(404).json({ message: 'No categories found.' });
  }

  res.status(200).json(categories);

};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategoryById,
  deleteCategoryById,
  searchCategory
};
