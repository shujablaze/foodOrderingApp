import './App.css';

import {React,useReducer,createContext} from 'react'
import Nav from './components/Nav'
import Dashboard from './components/Dashboard'
import Cart from './components/Cart'


export const cartContext = createContext(null)

function App() {

  const dispatch = (state,action)=>{
    switch(action.type){
      case "add":
        return [...state,action.data]

      case "changeQuantity":
        let newState = state.map(item=>{
          if(item._id === action.data.id) item.quantity = action.data.quantity
          return item
        })
        return newState
      
      case "delete":
        return state.filter(item=>item._id!==action.data.id)
      default:
        return new Error('Invalid action')

    }
  }

  const [cart,setCart] = useReducer(dispatch,[])

  return (
    <div >
      <Nav/>
      <section className="container-app">
      <cartContext.Provider value={{cart,setCart}}>
        <Dashboard/>
        <Cart/>
      </cartContext.Provider>
      </section>
    </div>
  )
}

export default App
