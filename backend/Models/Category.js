const mongoose = require('mongoose')
const fs = require('fs/promises')
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
},{toJSON:{virtuals:true,versionKey:false},toObject:{virtuals:true},id:false})

categorySchema.virtual('items',{
    ref:'Item',
    foreignField:'category',
    localField:'_id'
})

categorySchema.pre('findOneAndDelete',async function(){
    const {_id,bgPic} = await this.findOne()

    await Item.deleteMany({category:_id})

    if(!bgPic.endsWith('bg-pic--default.jpg')){
        await fs.rm(`../client/public/img/${bgPic}`)
    }
})

const Category = mongoose.model('Category',categorySchema)

module.exports = Category