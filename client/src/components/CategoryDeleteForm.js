import {React,useEffect,useState} from 'react'
import axios from 'axios'


const DeleteForm = () => {

    const [categoryList,setCategoryList] = useState([])
    const [selectedCategory,setSelectedCategory] = useState('')
    const [categoryId,setCategoryId] = useState('')


    const getCategoryList = () => {
        axios.get('http://localhost:4000').then((res)=>{
            setCategoryList(res.data.data)
            setSelectedCategory(res.data.data[0])
            setCategoryId(res.data.data[0]._id)
        })
    }


    useEffect(()=>{
        getCategoryList()
    },[])

    useEffect(()=>{
        for(let cat of categoryList){
            if(cat.name === selectedCategory){
                setCategoryId(cat._id)
            }
        }
    },[selectedCategory])

    const handleSubmit = (e)=>{
        e.preventDefault()
        axios({
            method:'DELETE',
            url:'http://localhost:4000/admin/category',
            data:{id:categoryId}
        }).then(()=>{getCategoryList()})
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="formfield">
                    <label htmlFor="select-id--delete" className="formfield__label">category</label>
                    <select id="select-id--delete" className="formfield__select" value={selectedCategory} onChange={(e)=>{setSelectedCategory(e.target.value)}}>
                        {categoryList.map((cat)=><option>{cat.name}</option>)}
                    </select>
                </div>
                <div className="formfield--row">
                    <input className="btn btn-secondary" type="submit" value="submit"/>
                </div>
            </form>
        </>
    )
}

export default DeleteForm
