import './App.css';

import React from 'react'
import Nav from './components/Nav'
import Dashboard from './components/Dashboard'
import Cart from './components/Cart'

function App() {
  return (
    <div >
      <Nav/>
      <section className="container">
      <Dashboard/>
      <Cart/>
      </section>
    </div>
  )
}

export default App
