const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const supplierSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please provide the supplier name'],
  },
  phone: {
    type: String,
    default: null,
  },
  email: {
    type: String,
    default: null,
  },
  address: {
    type: String,
    default: null,
  },
  contactPerson: {
    type: String,
    default: null,
  },
  supplierCode: {
    type: String,
    required: [true, 'Please provide the supplier code'],
    unique: true,
  },
  PaymentTerms: {
    type: String,
    default: null,
  },
  taxID: {
    type: String,
    default: null,
  },
  notes: {
    type: String,
    default: null,
  },
  items: [{
    type: Schema.Types.ObjectId,
    ref: 'Item'
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Supplier', supplierSchema);
