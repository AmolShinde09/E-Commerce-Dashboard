import React,{useState} from 'react';

const AccessDataFromLocalStorage =()=>{

    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

    const collectData= async()=>{
     
        let result = localStorage.getItem("user"); //storing data in local storage

        result = JSON.parse(result);
        console.log(result);
        if(result.email === email && result.password === password){
            alert("Your login successfully")
        }else{
            alert("please Enter correct details")
        }
    }

    return(
        <>
        <h1>Login</h1>
      
        <input type="text" placeholder="Enter Email" value={email} onChange={(e)=>setEmail(e.target.value)} /><br/><br/>
        <input type="text" placeholder="Enter Password" value={password} onChange={(e)=>setPassword(e.target.value)}/><br/><br/><br/>
        <button onClick={collectData} >Log-In</button>
        </>
    )
}

export default AccessDataFromLocalStorage;