import {React,useState,useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'


const CategoryCard = ({data}) => {
    const style = {backgroundImage: `url("${process.env.PUBLIC_URL +"/img/"+ data.bgPic}")`}
    return (
        <Link to={"/restraunt/"+ data.name} className="card" style={style}>
                <div>{data.name}</div>
        </Link>
    )
}

function Categories() {

    const [categories,setCategories] = useState([])

    useEffect ( () => {
        axios.get('http://localhost:4000').then((res)=>{
            setCategories(res.data.data)
        })
    }, [])

    return (
        <div className="grid">
            {categories.map((item)=> <CategoryCard data={item} key={item._id}></CategoryCard>)}
        </div>
    )
}

export default Categories
