const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const storeSchema = new Schema({
  StoreName: {
    type: String,
    required: [true, 'Please provide store name'],
  },
  StoreLocation: {
    type: String,
    required: [true, 'Please provide store location'],
  },
  Capacity:{
    type:Number,
    required:[true, 'Please provide store capacity'],
  },
  StoreDescription: {
    type: String,
    default: null,
  },
 
});

module.exports = mongoose.model('Store', storeSchema);
