const express = require('express')
const {newCategory} = require('./controllers/categoryController')
const {newItem} = require('./controllers/itemController')

const app = express()

//TO PARSE REQ BODY
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//ROUTES TO HANDLE CATEGORY MANIPULATIONS
app.route('/admin/category')
    .post(newCategory)
    //.delete(deleteCategory)
    //.patch(updateCategory)

//ROUTES TO HANDLE ITEM MANIPULATIONS
app.route('/admin/items')
    .post(newItem)
    //.delete(deleteItem)
    //.patch(updateItem)

//GLOBAL ERROR HANDLER
app.use((err,req,res,next)=>{
    const message = err.message
    res.status(400).json({
        status:'Error',
        message
    })
})

module.exports = app