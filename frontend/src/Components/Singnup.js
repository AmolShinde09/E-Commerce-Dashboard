import React from "react";
import './CssFiles/Singnup.css';
import { useState ,useEffect} from "react";
import {json, useNavigate } from 'react-router-dom';
import axios  from "axios";

const Singnup=()=>{


  useEffect(()=>{    // access using direct url that time used

    const auth = localStorage.getItem('user'); //when user value true not show singnup page false show singnup page

    if(auth){           // user logined after not show singup page thats why used this condition
        navigate('/');
    }
 })


    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const navigate = useNavigate();


    const collectData= async()=>{
      

       let result = await fetch(`http://localhost:5000/register`,{
        method:'post',
        body:JSON.stringify({name,email,password}),
        headers:{
          'Content-Type':'application/json'
        }
      });
    

    
     result = await result.json();
     
     console.log(result);

    if(result){
      localStorage.setItem('user',JSON.stringify(result.result))
      localStorage.setItem('token',JSON.stringify(result.auth))

        navigate('/');
    }

    };


    return(
        <>
        <h1 id="w">Register</h1>
    <input type='text' value={name} onChange={(e)=>{setName(e.target.value)}} className="inputBox" placeholder="Enter Name"/>
   <input type='email' value={email}  onChange={(e)=>{setEmail(e.target.value)}} className="inputBox" placeholder="Enter Email-Id "/>
     <input type='password' value={password}  onChange={(e)=>{setPassword(e.target.value)}} className="inputBox" placeholder="Enter Password"/>

<button onClick={collectData} id="singUpButton">Submit</button>
        </>
    )

}

export default Singnup;