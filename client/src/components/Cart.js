import {React,useContext} from 'react'
import {cartContext} from '../App'

function CartItem(props) {
    const {setCart} = useContext(cartContext)
    const handleChange = (e)=>{
        const val = e.target.value
        setCart({type:"changeQuantity",data:{quantity:val,id:props._id}})
    }
    return(
        <div className="cart-item">
            <div>{props.name}</div>
            <div className><input type="number" value={props.quantity} onChange={handleChange} min="1" max="9"/></div>
            <div>Rs.{props.price}</div>
            <button className="btn btn-danger" onClick={()=>setCart({type:"delete",data:{id:props._id}})}>Remove</button>
        </div>
    )
}


function Cart() {

    const {cart} = useContext(cartContext)

    return (
        <div className="cart">
            <h2>Order Summary</h2>
            {cart.map((el)=><CartItem key={el._id} _id={el._id} name={el.name} quantity={el.quantity} price={el.price*el.quantity}></CartItem>)}
        </div>
    )
}

export default Cart
