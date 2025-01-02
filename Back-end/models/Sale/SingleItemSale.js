const mongoose=require('mongoose');

const singleItemsSaleSchema=mongoose.Schema({
    OrderNumber:{
        type:Number,
        required:[true,"please provide Order Number"]
    },
    item:{
        type:mongoose.Types.ObjectId,
        ref:"Item",
        required:[true,'please provide an item']

    },
    quantity:{
        type:Number,
        required:[true,"please provide Quantity of item sold"]
    },
    soldDate:{
        type:Date,
        default:Date.now
    },
    customer:{
        type:mongoose.Types.ObjectId,
        default:'66b392bb6c52103100e356b1'//TODO when Customer is finished make one default customer and make his id here because if a customer that has not been registered buys this will be used
    },
    status: {
        type: String,
        enum: ["pending", "completed", "canceled"],
        default: "completed",
      },
})

module.exports=mongoose.model('SingleItemSale',singleItemsSaleSchema);