const mongoose = require('mongoose')
const fs = require('fs/promises')

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
        ref:'Category',
        required:[true,"An item must have a category"]
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

itemSchema.pre('findOneAndDelete',async function(){
    const {bgPic} = await this.findOne()
    
    await fs.rm(`../client/public/img/${bgPic}`)
})

itemSchema.pre('deleteMany',async function(){
    const items = await this.find()
    
    for(item of items){
        await fs.rm(`../client/public/img/${item.bgPic}`)
    }
})

const Item = mongoose.model('Item',itemSchema)

module.exports = Item