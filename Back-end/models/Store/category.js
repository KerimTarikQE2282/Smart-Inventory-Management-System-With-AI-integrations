

const mongoose = require('mongoose');



const categorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide Category Name'],
  },

  description: {
    type: String,
   
  }
}, {
  timestamps: true 
});


module.exports = mongoose.model('Category', categorySchema);


