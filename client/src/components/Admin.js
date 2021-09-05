import React from 'react'
import {BrowserRouter as Router,Route,Link} from 'react-router-dom'
import AdminCategory from './AdminCategory'
import AdminItem from './AdminItem'

const AdminCard = ({title,link,pic}) => {
    const style = {backgroundImage: `url("${process.env.PUBLIC_URL +"/img/"+ pic}")`}
    return (
        <Link to={"/admin/"+link} className="card" style={style}>
                <div>{title}</div>
        </Link>
    )
}

const Admin = () => {
    return (
        <div className="grid">
        <Router>
            <Route path="/admin" exact>
                <AdminCard title="Edit Categories" link="category" pic="cat-default"/>
                <AdminCard title="Edit Items" link="items" pic="item-default"/>
            </Route>
            <Route path="/admin/category" exact>
                <AdminCategory/>
            </Route>
            <Route path="/admin/items" exact>
                <AdminItem/>
            </Route>
        </Router>

        </div>
    )
}

export default Admin
