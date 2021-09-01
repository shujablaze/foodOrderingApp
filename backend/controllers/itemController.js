const fs = require('fs/promises')
const Item = require('../Models/Item')


exports.newItem = async (req,res,next) => {
    try{
        var bgPic

        (req.file) ? bgPic = req.file.filename : 'itembg--default'
        const{name,category,price,description} = req.body
        const newItem = new Item({name,bgPic,category,price,description})
        await newItem.save();

        res.status(201).json({
            status:'Success',
            data:newItem
        })

    }catch(err){
        await fs.rm(`../client/public/img/${bgPic}`)
        next(err)
    }
}

exports.getItem = async (req,res,next) => {
    try{
        const { item } = req.params
        const data = await Item.findOne({'name':item})

        if(!data) throw new Error('Invalid Item')

        res.status(200).json({
            status:'Success',
            data
        })

    }catch(err){
        next(err)
    }
}

exports.updateItem = async (req,res,next) => {
    try{
        const { id,data } = req.body

        const updatedItem = await Item.findByIdAndUpdate(id,data,{
            new:true,
            runValidators:true
        })
        res.status(200).json({
            status:"Success",
            data : updatedItem
        })
    }catch(err){
        next(err)
    }
}

exports.deleteItem = async (req,res,next) => {
    try{
        await Item.findByIdAndDelete(req.body.id)

        res.status(204).json({
            status:"Success"
        })
    }catch(err){
        next(err)
    }
}