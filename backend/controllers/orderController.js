const Order = require('../Models/Order')


exports.getAllOrders = async (req,res,next) => {
    
    try{
        //const {userId} = req.body
        const userId = 470.888178578003
        const orders = await Order.find({userId})

        res.status('200').json({
            status : 'Success',
            data : orders
        })
    }
    catch(err){
        console.log(err)
        next(err)
    }
}

exports.placeOrder = async (req,res,next) => {

    try{
        const {data} = req.body
    
        const newOrder = new Order()
        let orderTotal = 0

        newOrder.userId = Math.random() * 1000
        newOrder.items = data
        
        for(let item of newOrder.items){
            orderTotal += item.price
        }

        newOrder.total = orderTotal

        await newOrder.save()

        res.status('201').json({
            status:'Success',
            data : newOrder
        })
    }
    catch(err){
        next(err)
    }
}


