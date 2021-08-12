const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"An item must have a name"]
    },
    bgPic:{
        type:String,
        default:"itembg--default"
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Category'
    },
    price:{
        type:Number,
        required:[true,"An item must have a price"]
    },
    description:{
        type:String,
        default:"Try this offering and we promise you will ask for refill."
    }
})

const Item = mongoose.model('Item',itemSchema)

module.exports = Item