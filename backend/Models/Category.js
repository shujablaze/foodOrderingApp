const mongoose = require('mongoose')
const Item = require('./Item')

const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"A category must have name"]
    },
    bgPic:{
        type:String,
        default:"bg-pic--default.jpg"
    }
})

categorySchema.pre('findOneAndDelete',async function(){
    const {_id} = await this.findOne()

    await Item.deleteMany({category:_id})
})

const Category = mongoose.model('Category',categorySchema)

module.exports = Category