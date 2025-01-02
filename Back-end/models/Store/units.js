const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const unitSchema = new Schema({
  UnitName: {
    type: String,
    required: [true, 'Please provide unit name'],
  },
  UnitAbreviation: {
    type: String,
    default: null,


  },
 

}, {
  timestamps: true
});

module.exports = mongoose.model('Unit', unitSchema);
