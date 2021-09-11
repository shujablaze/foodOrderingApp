import {React,useState} from 'react'
import axios from 'axios'


const CategoryCardPreview = ({src,name}) => {
    const style = {backgroundImage: `url("${src}")`,height:'12rem',width:'20rem'}
    return (
        <div className="card" style={style}>
                <div className="card__text">{name}</div>
        </div>
    )
}

const CategoryCreateForm = () => {

    const [bgPic,setBgPic] = useState('')
    const [name,setName] = useState('')
    const [src,setSrc] = useState('')

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
            method:'post',
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
                    <label htmlFor="category" className="formfield__label">Name</label>
                    <input type="text" id="category" className="formfield__text" placeholder="Enter name of category" value={name} required onChange={(e)=>{setName(e.target.value)}}/>
                </div>
                
                <div className="formfield">
                    <label htmlFor="bg-img" className="formfield__label">background image</label>
                    <input id="bg-img" className="formfield__file" type="file" accept="image/*" onChange={handleChange}/>
                </div>

                <div className="formfile--row">
                    <input className="btn btn-secondary" type="submit" value="submit"/>
                </div>
                
            </form>
            {(src!=='') ? <><div style={{marginBottom:"1rem",fontSize:"1.4rem"}}>Preview</div><CategoryCardPreview src={src} name={name}/></> : ""}
            
        </>
    )
}

export default CategoryCreateForm
