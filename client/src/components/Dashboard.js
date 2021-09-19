import React from 'react'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import Categories from './Categories'
import CategoryMenu from './CategoryMenu'
import Admin from './Admin'
import Item from './Item'

function Dashboard() {
    return (
        <Router>
        
        <div className="dashboard">
        <Switch>
            <Route path="/" exact>
                <Categories/>
            </Route>
            <Route path="/admin">
                <Admin/>
            </Route>
            
            <Route path="/restraunt/:category" exact>
                <CategoryMenu/>
            </Route>
            <Route path="/restraunt/:category/:item" exact>
                <Item/>
            </Route>

            <Route>
                <h1>Error 404! Page Not Found</h1>
            </Route>
        </Switch>
        </div>
        
        </Router>
    )
}

export default Dashboard
