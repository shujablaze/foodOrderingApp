const mongoose = require('mongoose')

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

const Category = mongoose.model('Category',categorySchema)

module.exports = Category