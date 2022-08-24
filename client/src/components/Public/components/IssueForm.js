import React, { useState,useContext } from 'react'
import { UserContext } from '../../../context/UserProvider.js'
const initInputs = {
  title: "",
  description: "",
  writer: JSON.parse(localStorage.getItem("user")) || ''
}

export default function IssueForm(props){
    const [inputs, setInputs] = useState(initInputs)
    const { addIssue } = props
    const { userState,  } = useContext(UserContext)
    function handleChange(e){
        const {name, value} = e.target
       
        setInputs(prevInputs => ({
          ...prevInputs,
          [name]: value
        }))
    }
    
    function handleSubmit(e){
        e.preventDefault()
        addIssue(inputs)
        setInputs(initInputs)
    }

    const { title, description, } = inputs
    
    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                name="title" 
                value={title} 
                onChange={handleChange} 
                placeholder="Title"/>
            <input 
                type="text" 
                name="description" 
                value={description} 
                onChange={handleChange} 
                placeholder="Description"/>
            <button>Add Todo</button>
        </form>
    )
}