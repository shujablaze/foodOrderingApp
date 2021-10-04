const multer = require('multer')
const fs = require('fs/promises')
const Category = require('../Models/Category')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../client/public/img')
    },
    filename: function (req, file, cb) {
      const extension = file.originalname.split('.').pop()
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + '.' + extension)
    },
})

const filterFiles = (req,file,cb)=>{
    const allowed = ['jpg','jpeg','png']
    const extension = file.originalname.split('.').pop()
    const mimetype = file.mimetype.split('/')[1]

    if(allowed.indexOf(extension)!==-1 && allowed.indexOf(mimetype)!==-1){
        return cb(null,true)
    }
    else{
        return cb('Only Images are allowed',false)
    }
}
  
exports.upload = multer({ 
    storage: storage,limit:{fileSize:100000 },fileFilter:filterFiles})

exports.newCategory = async (req,res,next) => {
    try{
        var filename

        (req.file) ? filename = req.file.filename : 'bg-pic--default.jpg'

        const newCategory = new Category({name:req.body.name,bgPic:filename})
        await newCategory.save()

        res.status(201).json({
        status : 'Success',
        data : newCategory
        })

    }catch(err){
        await fs.rm(`../client/public/img/${filename}`)
        next(err)
    }
}

exports.getAllCategories = async (req,res,next)=>{
    try{
        const categories = await Category.find()
        res.status(200).json({
            status:'Success',
            data:categories
        })
    }catch(err){
        next(err)
    }
}

exports.getCategory = async (req,res,next) => {
    try{
        const { category }= req.params
        const data = await Category.findOne({'name':`${category}`}).populate( {path:'items', select:'name price bgPic '} )

        if(!data) throw new Error('Invalid Category')

        res.status(200).json({
            status:'Success',
            data
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