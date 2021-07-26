import React from 'react'
import { Link } from 'react-router-dom'

function Categories() {
    return (
        <div className="grid">
            <Link to="/pizza" className="card">
                <div>Pizza</div>
            </Link>
            <Link className="card">
                <div>Pasta</div>
            </Link>
            <Link className="card">
                <div>North Indian</div>
            </Link>
            <Link className="card">
                <div>Continental</div>
            </Link>
            <Link className="card">
                <div>Burgers</div>
            </Link>
            <Link className="card">
                <div>Desert</div>
            </Link>
        </div>
    )
}

export default Categories
