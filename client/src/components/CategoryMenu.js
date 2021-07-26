import React from 'react'
import {Link} from 'react-router-dom'

function CategoryMenu() {
    return (
        <div>
            <div className="grid">
            <Link to="/pizza/new" className="card">
                <div>Nice Pizza</div>
            </Link>
            <Link className="card">
                <div>Cheezy</div>
            </Link>
            <Link className="card">
                <div>Onion Delight</div>
            </Link>
            <Link className="card">
                <div>Masala Max</div>
            </Link>
        </div>
        </div>
    )
}

export default CategoryMenu
