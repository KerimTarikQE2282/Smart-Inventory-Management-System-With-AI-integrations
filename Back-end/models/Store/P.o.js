

const mongoose=require('mongoose')

const POSchema = mongoose.Schema({
   
    PurchaseOrderId: {
      type: String,
      required: [true, 'Please provide Purchase Order Id'],
    },
    PurchaseOrder: {
        type: String,
        required: [true, 'Please provide Purchase Order'],
      }
  }, {
    timestamps: true
  });
  
  // Create and export the Brands model
module.exports = mongoose.model('PO', POSchema);
  
