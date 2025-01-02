const express = require('express');
const router = express.Router();
const {
    addCustomer,
    getAllCustomer,
    getCustomerByID,
    Update,
    Edit,
    Delete,
} = require('../../Controllers/SalesControllers/customer'); // Adjust the path as necessary

// Define routes
router.route('/')
  .get(getAllCustomer)
  .post(addCustomer);

router.route('/:id')
  .get(getCustomerByID)
  .patch(Update)
  .delete(Delete);

module.exports = router;
