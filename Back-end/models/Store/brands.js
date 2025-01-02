

const mongoose=require('mongoose')

const brandSchema = mongoose.Schema({
   
    BrandName: {
      type: String,
      required: [true, 'Please provide brand description'],
    }
   
  }, {
    timestamps: true
  });
  
  // Create and export the Brands model
module.exports = mongoose.model('Brand', brandSchema);
  
