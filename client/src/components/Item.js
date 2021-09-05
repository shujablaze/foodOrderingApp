import {React,useContext,useState,useEffect} from 'react'
import axios from 'axios'
import {cartContext} from '../App'
import {useParams} from 'react-router-dom'

function Item() {
    const {cart,setCart} =  useContext(cartContext)
    const [foodItem,setItem] = useState({})
    const {category,item} = useParams()

    useEffect(()=>{
        axios.get(`http://localhost:4000/${category}/${item}`).then(res=>{
            setItem(res.data.data)
        })
    },[foodItem,category,item])

    const handleClick = ()=>{
        let presentInCart = false
        let quantity = 1 
        
        for (let it of cart){
            if(it._id === foodItem._id){
                presentInCart = true
                quantity = it.quantity + 1
                break
            }
        } 

        if(!presentInCart){
            setCart({type:"add",data:{_id:foodItem._id,name:foodItem.name,quantity,price:foodItem.price}})
        }else{
            setCart({type:"changeQuantity",data:{quantity,id:foodItem._id}})
        }
    }

    return (
        <div className="itempage">
            <div className="banner">
                <div className="banner-text">{foodItem.name}</div>
            </div>
            <div className="item__description">
            {foodItem.description}
            </div>
            <div className="item__btn">
                <button className="btn btn-primary " onClick={handleClick}>Add to Cart</button>
            </div>
        </div>
    )
}

export default Item
