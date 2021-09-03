import {React,useState,useEffect} from 'react'
import axios from 'axios'
import {Link,useParams} from 'react-router-dom'


const ItemCard = ({data,category}) => {
    const style = {backgroundImage: `url("${process.env.PUBLIC_URL +"/img/"+ data.bgPic}")`}
    return (
        <Link to={"/"+category+"/"+data.name} className="card" style={style}>
                <div>{data.name}</div>
        </Link>
    )
}

function CategoryMenu() {

    const [items,setItems] = useState([])
    const {category} = useParams()
    useEffect ( () => {
        axios.get(`http://localhost:4000/${category}`).then((res)=>{
            setItems(res.data.data.items)
        })
    }, [category])

    return (
        <div className="grid">
            {items.map((item)=> <ItemCard category={category} data={item} key={item._id}></ItemCard>)}
        </div>
    )
}

export default CategoryMenu
