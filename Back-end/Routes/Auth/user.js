const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  updateUserById,
  getUserById,
  deleteUserById,
  searchUser
} = require('../../Controllers/AuthControllers/userCrud'); // Adjust the path to your User controller

// Define routes
router.route('/').get(getAllUsers);
router.route('/:id').get(getUserById).patch(updateUserById).delete(deleteUserById);
router.route('/search').post(searchUser);

module.exports = router;
