import React ,{useEffect, useState}from "react";
import {  useNavigate } from "react-router-dom";
import './CssFiles/Login.css';

const Login=()=>{

    const [email,setEmail]=useState();
    const [password,setPassword]=useState();
    const navigate =useNavigate();

    useEffect(()=>{
        const auth = localStorage.getItem("user");
        if(auth){
            navigate('/');
        }
    })

    const handelLogin= async()=>{
    // console.log(email,password)

    let result = await fetch("http://localhost:5000/login",{
        method:"post",
        body:JSON.stringify({email,password}),
        headers:{
            "Content-Type":"application/json",
            headers:{
                authorization :`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        }
    })
    result = await result.json();
    console.log(result)

    if(result.auth){
        localStorage.setItem("user",JSON.stringify(result.user));
        localStorage.setItem("token",JSON.stringify(result.auth));
        navigate("/");


    }else{
        alert("Not Valid Email & Password ");
    }
    }
 
return(
    <>
     <h1>Login</h1>
  <div className="login">
   
    <input type="text" placeholder="Enter Email" onChange={(e)=>{setEmail(e.target.value)}}/><br/><br/>
    <input type="password" placeholder="Enter Passowrd" onChange={(e)=>{setPassword(e.target.value)}}/><br/><br/>
    <button onClick={handelLogin}>Login</button>
  </div>
    </>
)
};
export default Login;