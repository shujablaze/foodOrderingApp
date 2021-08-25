const multer = require('multer');
const Category = require('../Models/Category')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../client/public/img')
    },
    filename: function (req, file, cb) {
      const extension = file.originalname.split('.').pop()
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + '.' + extension)
    }
})
  
exports.upload = multer({ storage: storage })

exports.newCategory = async (req,res,next) => {
    try{

        let filename

        (req.file) ? filename = req.file.filename : 'bg-pic--default.jpg'

        const newCategory = new Category({name:req.body.name,bgPic:filename})
        await newCategory.save()

        res.status(201).json({
        status : 'Success',
        data : newCategory
        })

    }catch(err){
        console.log(err)
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