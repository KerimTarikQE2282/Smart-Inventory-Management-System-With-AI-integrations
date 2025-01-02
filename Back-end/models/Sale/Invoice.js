const mongoose = require('mongoose');

const InvoiceSchema = new mongoose.Schema({
   orderNumber: {
      type: Number,
      required: [true, "Please provide an order number"],
      unique: true // Assuming each order number is unique
   },
  productName: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  unitPrice: {
    type: Number,
    required: true,
    min: 0
  }
});

const Invoice = mongoose.model('Invoice', InvoiceSchema);

module.exports = Invoice;
