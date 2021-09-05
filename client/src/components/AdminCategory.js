import {React,useState} from 'react'
import axios from 'axios'

const AdminCategory = () => {

    const [bgPic,setBgPic] = useState('')
    const [name,setName] = useState('')
    const [src,setSrc] = useState('')

    const handleChange = (e)=>{
        setBgPic(e.target.files[0])

        // Setting Src for Image Preview
        const fileReader = new FileReader()
        fileReader.readAsDataURL(e.target.files[0])
        fileReader.onloadend=()=>setSrc(fileReader.result)
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
            <form onSubmit={handleSubmit}>
                <input type="text" value={name} required onChange={(e)=>{setName(e.target.value)}}/>
                <input type="file" onChange={handleChange}/>
                <input type="submit" value="submit"/>
            </form>
            {(src!=='') ? <img src={src} alt="background"/> : "NO IMAGE SELECTED"}
            
        </>
    )
}

export default AdminCategory
