
const mongoose=require('mongoose')


const itemSchema=new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide item title'],
        maxlength: 100,
        minlength: 3,
      },
      description: {
        type: String,
        required: [true, 'Please provide item description'],
        minlength: 3,
      },
      category: {
        type: mongoose.Types.ObjectId,
        ref:'Category',
        required:[true , 'please provide a category']
      },
          
      unit: {
        type:mongoose.Types.ObjectId,
        ref:'Unit'
      },
      brand: {
        type:mongoose.Types.ObjectId,
        ref:'Brand',
        required:[true,'please provide a Brand for the item ']
      },
      supplier: {
        type:mongoose.Types.ObjectId,
        ref:'Supplier',
        required:[true,'please provide a supplier for the item']
      },
      
      SKU: {
        type: String,
        required: [true, 'Please provide item SKU'],
        maxlength: 100,
        minlength: 3,
      },
      barcode: {
        type: String,
        //required: [true, 'Please provide item barcode'],
        maxlength: 100,
        minlength: 3,
      },

    costPrice: {
        type: Number,
        required: [true, 'Please provide item costPrice'],
   
      },
      sellingPrice: {
        type: Number,
        required: [true, 'Please provide item sellingPrice'],
 
      },
      reorderPoint: {
        type: Number,
        required: [true, 'Please provide item reorderPoint']
      },
      imagesUrl: {
        type: String,
            },
     weight: {
        type: String,
        },
        dimensions: {
        type: String,
        required: [true, 'Please provide item dimensions'],
      },
      taxRate: {
        type: Number,
        required: [true, 'Please provide item taxRate'],
      
      },
      notes: {
        type: String
      }},
     {timestamps: true}

)

module.exports=mongoose.model('Item',itemSchema)