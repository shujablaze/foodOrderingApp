const { findOneAndUpdate, findByIdAndDelete } = require('../Models/Item')
const Item = require('../Models/Item')

exports.newItem = async (req,res,next) => {
    try{
        const newItem = await Item.create(req.body)

        res.status(201).json({
            status:'Success',
            data:newItem
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