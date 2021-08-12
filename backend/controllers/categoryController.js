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