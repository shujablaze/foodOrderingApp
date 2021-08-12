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