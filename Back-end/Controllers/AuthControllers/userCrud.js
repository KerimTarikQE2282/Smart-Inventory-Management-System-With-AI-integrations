const User=require('../../models/User/User');
const StatusCodes = require('http-status-codes');
const { BadRequestError } = require('../../errors/');

// Fetch all users
const getAllUsers = async (req, res) => {
  const user = req.user;
  if (req.user.role !== 'admin') {
    throw new BadRequestError('Access Denied');
  }
  try {
    const user = await User.find({});
    res.status(StatusCodes.OK).json({ user });
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'An error occurred while fetching the users' });
  }
};

// Fetch a user by ID
const getUserById = async (req, res) => {
  if (req.user.role !== 'admin') {
    throw new BadRequestError('Access Denied');
  }
  const { id } = req.params;

  const user = await User.findById({ _id: id });
  if (!user || !id) {
    throw new BadRequestError("Please provide a valid ID");
  }

  res.status(StatusCodes.OK).json(user);
};

// Create a new user


// Update a user by ID
const updateUserById = async (req, res) => {
  if (req.user.role !== 'admin') {
    throw new BadRequestError('Access Denied');
  }
  const { id } = req.params;

  const updateData = req.body;
  console.log("🚀 ==> file: userCrud.js:46 ==> updateUserById ==> updateData:", updateData);


  const updatableUser = await User.findOne({ _id: id });
  if (!updatableUser || !id) {
    throw new BadRequestError("Please provide a valid ID");
  }

  const updatedUser = await User.findOneAndUpdate({ _id: id }, updateData, {
    new: true,
    runValidators: true
  });

  res.status(StatusCodes.OK).json(updatedUser);
};

// Delete a user by ID
const deleteUserById = async (req, res) => {
  const { id } = req.params;

  const deletableUser = await User.findById({ _id: id });
  if (!deletableUser || !id) {
    throw new BadRequestError("Please provide a valid ID");
  }

  await User.findOneAndDelete({ _id: id });
  res.status(StatusCodes.OK).json({ Deleted: true });
};

// Search for users by name
const searchUser = async (req, res) => {
  if (req.user.role !== 'admin') {
    throw new BadRequestError('Access Denied');
  }
  const { name } = req.body;

  if (!name) {
    return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Please provide a search query.' });
  }

  const users = await User.find({
    name: { $regex: name, $options: 'i' } // Assuming the user's name field is called "name"
  });

  if (users.length === 0) {
    return res.status(StatusCodes.NOT_FOUND).json({ message: 'No users found.' });
  }

  res.status(StatusCodes.OK).json(users);
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  searchUser
};
