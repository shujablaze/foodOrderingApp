const express = require('express')
const cors = require('cors')
const { newCategory,getAllCategories,getCategory,deleteCategory,updateCategory,upload } = require('./controllers/categoryController')
const { newItem,getItem,deleteItem,updateItem } = require('./controllers/itemController')
const { placeOrder,getAllOrders } = require('./controllers/orderController')

const app = express()

// CORS
app.use(cors())

// TO PARSE REQ BODY
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// ROUTES TO HANDLE ORDERING
app.route('/order')
    .get(getAllOrders)
    .post(placeOrder)

// ROUTES TO HANDLE CATEGORY MANIPULATIONS
app.route('/admin/category')
    .post(upload.single('bgPic'),newCategory)
    .delete(deleteCategory)
    .patch(updateCategory)

// ROUTES TO HANDLE ITEM MANIPULATIONS
app.route('/admin/items')
    .post(upload.single('bgPic'),newItem)
    .delete(deleteItem)
    .patch(updateItem)

// GET ROUTES FOR USER INTERACTION
app.get('/',getAllCategories)
app.get('/:category',getCategory)
app.get('/:category/:item',getItem)

// GLOBAL ERROR HANDLER
app.use((err,req,res,next)=>{
    const message = err.message
    res.status(400).json({
        status:'Error',
        message
    })
})

module.exports = app