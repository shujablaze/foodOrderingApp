import {React,useContext} from 'react'
import {cartContext} from '../App'

function Item() {

    const {setCart} =  useContext(cartContext)

    const handleClick = ()=>{
        setCart({type:"add",data:{_id:1,name:"shuja",quantity:1,price:100}})
    }

    return (
        <div className="itempage">
            <div className="banner">
                <div className="banner-text">Nice Pizza</div>
            </div>
            <div className="item__description">
                lorem ipsum dolor sit amet lorem dolor ipsum amet dolor amet
            </div>
            <div className="item__addons">

            </div>
            <div className="item__btn">
                <button onClick={handleClick}>Order</button>
            </div>
        </div>
    )
}

export default Item
