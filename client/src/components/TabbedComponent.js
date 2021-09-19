import {React,useState} from 'react'


const TabbedComponent = ({label1,label2,label3,state1,state2,state3}) => {

    const [activeLabel,setActiveLabel] = useState(label1)

    const getCurrentState = () => {
        if(activeLabel === label1){
            return state1
        }
        else if(activeLabel === label2){
            return state2
        }
        else{
            return state3
        }
    }

    return(
        <div className="tabbed-component">
            <div className="tabbed-component__nav">
                <div className = "tabbed-component__label tabbed-component__label--1" onClick = {()=>setActiveLabel(label1)}>{label1}</div>
                <div className = "tabbed-component__label tabbed-component__label--2" onClick = {()=>setActiveLabel(label2)}>{label2}</div>
                <div className = "tabbed-component__label tabbed-component__label--3" onClick = {()=>setActiveLabel(label3)}>{label3}</div>
            </div>
            <div className = "tabbed-component__body">
                {
                    getCurrentState()
                }
            </div>
        </div>
    )
}


export default TabbedComponent
