import {React,useContext,useState,useEffect} from 'react'
import axios from 'axios'
import {cartContext} from '../App'
import {useParams} from 'react-router-dom'

function Item() {
    const {setCart} =  useContext(cartContext)
    const [foodItem,setItem] = useState({})
    const {category,item} = useParams()

    useEffect(()=>{
        axios.get(`http://localhost:4000/${category}/${item}`).then(res=>{
            setItem(res.data.data)
        })
    },[foodItem])

    const handleClick = ()=>{
        setCart({type:"add",data:{_id:foodItem._id,name:foodItem.name,quantity:1,price:foodItem.price}})
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
