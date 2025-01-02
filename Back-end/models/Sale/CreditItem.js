const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CreditItemsSchema = new Schema({
    orderNumber: {
        type: mongoose.Types.ObjectId,
        ref: "GeneralSale",
        required: [true, "Please provide an order number"],
    
      },

      Item: {
        type: mongoose.Types.ObjectId,
        ref: "Item",
        required: [true, "Please provide a product name"],
   
      },


  quantity: {
     type:Number,
     required: [true, "Please provide quantity of the item"]
      },

  unitPrice: { 
    type: Number,
     required: true },
  
});

module.exports = mongoose.model('CreditItems', CreditItemsSchema);

