import { React,useState,useEffect } from 'react'
import axios from 'axios'

const CategoryEditForm = () => {

    // States to help displaying category info
    const [bgPic,setBgPic] = useState('')
    const [name,setName] = useState('')
    const [src,setSrc] = useState('')

    // States to help selecting category to edit
    const [categoryList,setCategoryList] = useState([])
    const [selectedCategory,setSelectedCategory] = useState({})
    const [categoryId,setCategoryId] = useState(0)

    useEffect(()=>{
        axios.get('http://localhost:4000').then(res=>{
            setCategoryList(res.data.data)
            if(res.data.data.length > 0){
                setSelectedCategory(res.data.data[0].name)
            }
        })
    },[])

    useEffect(()=>{
        for(let category of categoryList){
            if(category.name === selectedCategory){
                setName(category.name)
                setSrc(category.bgPic)
                setCategoryId(category._id)
            }
        }
    },[selectedCategory, setName, setSrc])


    const handleSubmit = (e)=>{
        e.preventDefault()
        const data = {name:name}

        axios({
            method:'patch',
            url:'http://localhost:4000/admin/category',
            data:{
                id:categoryId,
                data:data
            }
        }).then((res)=>alert(res.data.status))

        setSrc('')
        setName('')
    }

    return (
        <>
            <form className="primary-form" onSubmit={handleSubmit}>

                <div className="formfield">
                    <label htmlFor = "select-category" className = "formfield__label">category</label>
                    <select className = "formfield__select" id="select-category" value={selectedCategory} onChange = {(e)=>{setSelectedCategory(e.target.value)}}>
                        {categoryList.map((cat)=><option>{cat.name}</option>)}
                    </select>
                </div>

                <div className="formfield">
                    <label htmlFor="category" className="formfield__label">Name</label>
                    <input type="text" id="category" className="formfield__text" placeholder="Enter name of category" value={name} required onChange={(e)=>{setName(e.target.value)}}/>
                </div>
                
                <div className="formfield--row">
                    <input className="btn btn-secondary" type="submit" value="submit"/>
                </div>
                
            </form>
            
        </>
    )
}

export default CategoryEditForm
