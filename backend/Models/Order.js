const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    items:[{
        name:String,
        quantity:Number,
        price:Number
    }],
    completed:{
        type:Boolean,
        default:false
    },
    total:{
        type:Number,
        required:[true,'An order must have a total']
    },
    userId:{
        type:Number,
        required:[true,'An order must belong to a user']
    }
})

const Order = mongoose.model('Order',orderSchema)

module.exports = Order