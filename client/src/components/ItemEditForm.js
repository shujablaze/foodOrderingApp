import { React,useState,useEffect } from 'react'
import axios from 'axios'

const ItemEditForm = () => {

    const [categoryList,setCategoryList] = useState([])
    const [itemList,setItemList] = useState([])
    const [category,setCategory] = useState('')

    const [item,setItem] = useState('')
    const [itemId,setItemId] = useState('')

    const [name,setName] = useState('')
    const [price,setPrice] = useState(0)
    const [description,setDescription] = useState('')


    useEffect(() => {
        axios.get('http://localhost:4000').then((res)=>{
            setCategoryList(res.data.data)
            setCategory(res.data.data[0].name)
        })
    },[])

    useEffect(() => {
        if(category !== ''){

            axios.get('http://localhost:4000/' + category).then((res)=>{
                setItemList(res.data.data.items)

                if(res.data.data.items.length > 0){
                    setItem(res.data.data.items[0].name)
                }else{
                    setItem('')
                }
            })
        }
    },[category])

    useEffect(() => {
        if(item !== ''){
            for(let it of itemList){
                if(it.name === item){
                    setName(it.name)
                    setPrice(it.price)
                    setDescription(it.description)
                    setItemId(it._id)
                }
            }
        }else{
            setName('')
            setPrice('')
            setDescription('')
            setItemId('')
        }
    },[item,itemList])

    const handleSubmit = (e) => {
        e.preventDefault()

        const data = {name,price}

        axios({
            method:'PATCH',
            url:'http://localhost:4000/admin/items',
            data:{
                id:itemId,
                data
            }
        }).then((res)=>{alert(res.data.status)})
        
    } 


    return (
        <>
        <form className = "primary-form" onSubmit={handleSubmit}>
            <div className = "formfield">
                <label className = "formfield__label" htmlFor = "item-category">Category</label>
                <select className = "formfield__select" id = "item-category" value = {category} onChange = {(e)=>{setCategory(e.target.value)}}>
                    {categoryList.map((cat)=><option>{cat.name}</option>)}
                </select>
            </div>

            <div className = "formfield">
                <label className = "formfield__label" htmlFor = "item-edit">Item</label>
                <select className = "formfield__select" id = "item-edit" value = {item} onChange = {(e)=>{setItem(e.target.value)}}>
                    {itemList.map((it)=><option>{it.name}</option>)}
                </select>
            </div>
            <hr style={{margin:'2rem 0'}}/>
            <div className = "formfield">
                <label className = "formfield__label" htmlFor = "item-name">Name</label>
                <input className = "formfield__text" type = "text" value={name} onChange = {(e)=>{setName(e.target.value)}}/>
            </div>

            <div className = "formfield">
                <label className = "formfield__label" htmlFor = "item-price">price</label>
                <input className = "formfield__select" type = "number" value={price} onChange = {(e)=>{setPrice(e.target.value)}}/>
            </div>

            <div className = "formfield--row">
                <input type = "submit" value="submit" className = "btn btn-secondary"/>
            </div>
        </form>

        </>
    )
}

export default ItemEditForm
