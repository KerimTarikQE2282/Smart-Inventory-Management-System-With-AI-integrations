const mongoose = require('mongoose');

const GeneralSaleSchema = new mongoose.Schema({
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
    enum: ["pending", "shipped", "delivered"],
    default: "pending"
  },
  orderTotal: {
    type: Number,
    required: [true, "Please provide the order total"],
    min: [0, "Order total cannot be negative"]
  },
  billingStatus:{
    type: String,
    enum: ["paid", "unpaid", "partially paid"],
    default: "pending"
  },
  paymentMethod: {
    type: String,
    enum: ["Cash", "Tele Birr", "Cbe birr", "Other bank transfer"],
    required: [true, "Please provide a payment method"]
  },
  salesRepresentative: {
    type: mongoose.Types.ObjectId,
    ref: "SalesRepresentative"
  },
  unpayedAmount:{
    type:Number
  },
  payment:[{
    payedAmount:{
      type:Number,
    },
    date:{
      type:Date
    }
  }]
}, { timestamps: true });



module.exports = mongoose.model('GeneralSale', GeneralSaleSchema);;
