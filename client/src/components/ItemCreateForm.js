import { React,useState,useEffect } from 'react'
import axios from 'axios'

const ItemCardPreview = ({ src,name,price })=>{
    const style = {backgroundImage: `url("${src}")`,height:'12rem',width:'20rem'}
    return (
        <div className="card" style={style}>
                <div className="card__text">{name} for Rs.{price}</div>
        </div>
    )
}

const ItemCreateForm = () => {

    // Category List to append item to
    const [categoryList,setCategoryList] = useState([])
    const [selectedCategory,setSelectedCategory] = useState('')

    // Controlled Form Inputs State
    const [name,setName] = useState('')
    const [bgPic,setBgPic] = useState(null)
    const [category,setCategory] = useState('')
    const [price,setPrice] = useState('')

    // State to display image
    const [src,setSrc] = useState('')

    useEffect(()=>{
        axios.get('http://localhost:4000').then((res)=>{
            setCategoryList(res.data.data)
            setCategory(res.data.data[0]._id)
        })
    },[])

    useEffect(()=>{
        for(let cat of categoryList){
            if(cat.name === selectedCategory){
                setCategory(cat._id)
            }
        }
    },[selectedCategory,setCategory,categoryList])


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
        data.append('category',category)
        data.append('bgPic',bgPic)
        data.append('price',price)

        axios({
            method:'POST',
            url:'http://localhost:4000/admin/items',
            headers:{'content-type':'multipart/form-data'},
            data
        })
        .then((res)=>{
            setBgPic(null)
            setName('')
            setSrc('')
            setPrice('')
            alert(res.data.status)})
        .catch((err)=>alert(err.response.data.message))
    }

    return (
        <>
            <form className="primary-form" onSubmit={handleSubmit}>
                <div className="formfield">
                    <label htmlFor="select-category--items" className="formfield__label">Category</label>
                    <select id="select-category--items" className="formfield__select" value={selectedCategory} onChange={(e)=>{setSelectedCategory(e.target.value)}}>
                        {categoryList.map((cat)=><option>{cat.name}</option>)}
                    </select>
                </div>

                <div className="formfield">
                    <label htmlFor="item" className="formfield__label">Name</label>
                    <input type="text" id="item" className="formfield__text" placeholder="Enter name of Item" value={name} required onChange={(e)=>{setName(e.target.value)}}/>
                </div>
                
                <div className="formfield">
                    <label htmlFor="bg-img--item" className="formfield__label">background image</label>
                    <input id="bg-img--item" className="formfield__file" type="file" accept="image/*" onChange={handleChange}/>
                </div>

                <div className="formfield">
                    <label htmlFor="price" className="formfield__label">price</label>
                    <input type="number" id="price" className="formfield__select" placeholder="Enter Price" value={price} required onChange={(e)=>{setPrice(e.target.value)}}/>
                </div>

                <div className="formfield--row">
                    <input className="btn btn-secondary" type="submit" value="submit"/>
                </div>
                
            </form>
            {(src!=='') ? <><div style={{marginBottom:"1rem",fontSize:"1.4rem"}}>Preview</div><ItemCardPreview src={src} name={name} price={price}/></> : ""}
            
        </>
    )
}

export default ItemCreateForm
