import React from 'react'
import {BrowserRouter as Router,Route} from 'react-router-dom'
import Categories from './Categories'
import CategoryMenu from './CategoryMenu'
import Item from './Item'

function Dashboard() {
    return (
        <Router>
        <div className="dashboard">
            <Route path="/" exact>
                <Categories/>
            </Route>
            <Route path="/:cateogry" exact>
                <CategoryMenu/>
            </Route>
            <Route path="/:category/:item">
                <Item/>
            </Route>
        </div>
        </Router>
    )
}

export default Dashboard
