const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContainedItems = new Schema({

    item: {
        type: Schema.Types.ObjectId,
        ref: 'Item',
        required: [true, 'Please provide an item']
    },
    Carton_Number:{
        type:Number,
        required:[true,"please provide  carton number value "]
    },
    ItemEntryToWareHouseDate:[{
        type:Date,
        default:Date.now
    }],
    
    itemWentTo:[{
       type:mongoose.Types.ObjectId,
        ref:'WareHouse'
    }], 
    StoredAt:{
        type:Schema.Types.ObjectId,
        ref:'WareHouse'
    }
},
{timestamps: true});

module.exports = mongoose.model('ContainedItemsModel', ContainedItems);
