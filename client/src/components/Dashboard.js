import React from 'react'
import {BrowserRouter as Router,Route} from 'react-router-dom'
import Categories from './Categories'
import CategoryMenu from './CategoryMenu'
import Admin from './Admin'
import Item from './Item'

function Dashboard() {
    return (
        <Router>
        <div className="dashboard">
            <Route path="/" exact>
                <Categories/>
            </Route>
            <Route path="/admin" exact>
                <Admin/>
            </Route>
            <Route path="/restraunt/:category" exact>
                <CategoryMenu/>
            </Route>
            <Route path="/restraunt/:category/:item">
                <Item/>
            </Route>
        </div>
        </Router>
    )
}

export default Dashboard
