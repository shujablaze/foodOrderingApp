import { React,useState,useEffect } from 'react'
import axios from 'axios'

const DeleteItemForm = () => {

    const [ categoryList, setCategoryList ] = useState([])
    const [ itemList, setItemList ] = useState([])
    const [ category, setCategory ] = useState('')
    const [ item, setItem ] = useState('')
    const [ itemId, setItemId ] = useState('')


    const getItemList = () => {
        if(category !== ''){
            axios.get(`http://localhost:4000/` + category).then((res)=>{
            
            setItemList(res.data.data.items)

            if(res.data.data.items.length > 0){
                setItem(res.data.data.items[0].name)
            }
            else{
                setItem('')
                setItemId('')
            }
            })
        }
    }

    useEffect(()=>{
        axios.get('http://localhost:4000').then((res)=>{
            setCategory(res.data.data[0].name)
            setCategoryList(res.data.data)
        })
    },[])

    useEffect(()=>{
        getItemList();
    },[category])
    
    useEffect(()=>{
        for(let it of itemList){
            if(it.name === item){
               setItemId(it._id)
               return
            }
        }
        setItemId('')
    },[item,itemList,setItemId])

    const handleSubmit = (e)=>{
        e.preventDefault()

        axios({
            method:"DELETE",
            url : "http://localhost:4000/admin/items",
            data : {
                id:itemId
                }
            }).then((res)=>{
                alert('Success')
                getItemList()
            })
    }

    return (
        <>
        <form className="primary-form" onSubmit = {handleSubmit}>
            <div className="formfield">
                <label className="formfield__label" htmlFor="item-delete-category">Category</label>
                <select id = "item-delete-category"  className = "formfield__select" value={category} onChange={(e)=>{setCategory(e.target.value)}}>
                    {categoryList.map((cat)=>(<option>{cat.name}</option>))}
                </select>
            </div>

            <div className="formfield">
                <label className="formfield__label" htmlFor="item-delete-item">Item</label>
                <select id="item-delete-item" className="formfield__select" value={item} onChange={(e)=>{setItem(e.target.value)}}>
                    {itemList.map((it)=>(<option>{it.name}</option>))}
                </select>
            </div>

            <div className="formfield--row">
                <input type="submit" value="Delete" className="btn btn-secondary"/>
            </div>
        </form>
        </>
    )
}

export default DeleteItemForm
