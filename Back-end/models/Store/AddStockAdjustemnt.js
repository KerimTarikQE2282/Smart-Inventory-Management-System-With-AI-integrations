const mongoose = require('mongoose');

const transferSchema = new mongoose.Schema({
  item: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Item', 
    required: true 
  },
  From_warehouse: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Warehouse', 
    required: true 
  },
  ToWarehouse: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Warehouse', 
    required: true 
  },
  Carton_number: { 
    type: Number, 
    required: true 
  }
});

const Transfer = mongoose.model('Transfer', transferSchema);

module.exports = Transfer;
