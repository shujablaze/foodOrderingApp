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

    useEffect(()=>{
        axios.get('http://localhost:4000').then(res=>{
            setCategoryList(res.data.data)
            if(res.data.data.length > 0){
                setSelectedCategory(res.data.data[0])
                setName(res.data.data[0].name)
                setSrc(res.data.data[0].bgPic)
            }
        })
    },[])

    useEffect(()=>{
        for(let category of categoryList){
            if(category.name === selectedCategory){
                setName(category.name)
                setSrc(category.bgPic)
            }
        }
    },[selectedCategory, setName,categoryList,setSrc])


    const handleChange = (e)=>{
        setBgPic(e.target.files[0])

        // Setting Src for Image Preview
        if(e.target.files[0]){
            const fileReader = new FileReader()
            fileReader.readAsDataURL(e.target.files[0])
            fileReader.onloadend = ()=>setSrc(fileReader.result)
        }else{
            setSrc('')
        }
        
    }

    const handleSubmit = (e)=>{
        e.preventDefault()

        const data = new FormData()

        data.append('name',name)
        data.append('bgPic',bgPic)

        axios({
            method:'patch',
            url:'http://localhost:4000/admin/category',
            headers:{'content-type':'multipart/form-data'},
            data
        }).then((res)=>alert(res.data.status))

        setBgPic('')
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
                
                <div className="formfield">
                    <label htmlFor="bg-img" className="formfield__label">background image</label>
                    <input id="bg-img" className="formfield__file" type="file" accept="image/*" onChange={handleChange}/>
                    
                </div>

                <div className="formfield--row">
                    <input className="btn btn-secondary" type="submit" value="submit"/>
                </div>
                
            </form>
            {(src!=='') ? <img src={`${process.env.PUBLIC_URL}/img/${src}`} alt="background"/> : ""}
            
        </>
    )
}

export default CategoryEditForm
