const app = require('./app')
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/food_ordering',{
useNewUrlParser:true,
useCreateIndex:true,
useFindAndModify:false,
useUnifiedTopology:true})
.then(con=>{console.log("DB connected")});

app.listen(4000,'localhost',()=>{
    console.log("server started at ",new Date().toTimeString())
})