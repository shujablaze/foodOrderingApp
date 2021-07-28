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
            Spicy jalapeno bacon ipsum dolor amet chislic meatball boudin, buffalo drumstick strip steak esse ea capicola ribeye corned beef et. In salami velit pig strip steak officia. Id tri-tip velit meatball. Chislic pork landjaeger leberkas.
            </div>
            <div className="item__addons">

            </div>
            <div className="item__btn">
                <button className="btn btn-primary " onClick={handleClick}>Add to Cart</button>
            </div>
        </div>
    )
}

export default Item
