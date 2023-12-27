import React,{useState} from 'react';
import {useNavigate} from 'react-router-dom';


const DataStoreInLocalStore = ()=>{

    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const navigate =useNavigate();

    const collectData= ()=>{
        let data = JSON.stringify({name,email,password});
        let result = localStorage.setItem('user',data); //storing data in local storage
        // result = JSON.parse(result)
   
        alert("Hello")
        // console.log(result)

        navigate("/profile");
       
    }

    return(
        <>
        <h1>Register</h1>
        <input type="text" placeholder="Enter Name" value={name} onChange={(e)=>setName(e.target.value)}/><br/><br/>
        <input type="text" placeholder="Enter Email" value={email} onChange={(e)=>setEmail(e.target.value)} /><br/><br/>
        <input type="text" placeholder="Enter Password" value={password} onChange={(e)=>setPassword(e.target.value)}/><br/><br/><br/>
        <button onClick={collectData} >SingUp</button>
        </>
    )
}

export default DataStoreInLocalStore;