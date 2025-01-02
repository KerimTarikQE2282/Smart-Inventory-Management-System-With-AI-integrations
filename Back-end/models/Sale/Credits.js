const mongoose = require('mongoose');



const creditSchema = new mongoose.Schema({
    orderNumber: {
      type: Number,
      required: [true, "Please provide an order number"],
      unique: true // Assuming each order number is unique
    },
    customer: {
      type: mongoose.Types.ObjectId,
      ref: "Customer",
      required: [true, "Please provide a customer"]
    },
    orderDate: {
      type: Date,
      default: Date.now
    },
    orderStatus: {
      type: String,
      enum: ["pending", "shipped", "delivered", "canceled"],
      default: "pending"
    },
  
    orderTotal: {
      type: Number,
      required: [true, "Please provide the order total"],
      min: [0, "Order total cannot be negative"]
    },
    paymentMethod: {
      type: String,
      enum: ["credit card", "debit card", "paypal", "bank transfer", "cash"],
      required: [true, "Please provide a payment method"]
    },
    salesRepresentative: {
      type: mongoose.Types.ObjectId,
      ref: "SalesRepresentative"
    }
  }, { timestamps: true });
  
module.exports = mongoose.model('Credit', creditSchema);
