const Category = require('../Models/Category')

exports.newCategory = async (req,res,next) => {
    try{
        const newCategory = await Category.create(req.body)
        
        res.status(201).json({
            status : 'Success',
            data : newCategory
        })

    }catch(err){
        next(err)
    }
}

exports.updateCategory = async (req,res,next) => {
    try{
        const { id,data } = req.body

        const updatedCategory = await Category.findByIdAndUpdate(id,data,{
            new:true,
            runValidators:true
        })
        res.status(200).json({
            status:"Success",
            data : updatedCategory
        })
    }catch(err){
        next(err)
    }
}

exports.deleteCategory = async (req,res,next) => {
    try{
        await Category.findByIdAndDelete(req.body.id)

        res.status(204).json({
            status:"Success"
        })
    }catch(err){
        next(err)
    }
}