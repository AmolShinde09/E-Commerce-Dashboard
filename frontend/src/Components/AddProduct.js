import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './CssFiles/AddProduct.css';


const AddProduct= ()=>{

    const [name,setName]=useState('');
    const [price,setPrice]=useState('');
    const [category,setCategory]=useState('');
    const [company,setCompany]=useState('');
    const [error,setError]=useState(false);
    const navigate = useNavigate();

    const addProduct= async()=>{

        console.log(!name)

        if(!name || !price || !category || !company){
            setError(true);
         return false;
        }
       
        let userId = localStorage.getItem('user');
        userId = JSON.parse(userId)
        console.log(price,name,category,company,userId)

        let result = await fetch("http://localhost:5000/addproduct",{
            method:"post",
            body:  JSON.stringify({price,name,category,company,userId}),
            headers:{
                "Content-Type":"application/json",  // this is importnt for get req data

                 // get jwt token in api  // this is mid advance part
                   // this below jwt token importnt  here focus on space between bearer & jwt token
                authorization :`beare ${JSON.parse(localStorage.getItem('token'))}`
    
        }
    });

        result = await result.json();
        console.log(result);

        navigate('/');
      
    }

    return(
        <>
        <h1>Add Product</h1>
        <div className="addProduct">
        <input type="tex" placeholder="Enter Product Name" value={name} onChange={(e)=>{setName(e.target.value)}}/><br/>
       {error && !name && <span>Enter valid name</span> }<br/><br/>
        <input type="tex" placeholder="Enter Product Price" value={price}  onChange={(e)=>{setPrice(e.target.value)}} /><br/>
        {error && !price && <span>Enter valid price</span> }<br/><br/>
        <input type="tex" placeholder="Enter Product Category" value={category}  onChange={(e)=>{setCategory(e.target.value)}}/><br/>
        {error && !category && <span>Enter valid category</span> }<br/><br/>
        <input type="tex" placeholder="Enter Product Company" value={company}  onChange={(e)=>{setCompany(e.target.value)}}/><br/>
        {error && !company && <span>Enter valid company</span> }<br/><br/>
        <button onClick={addProduct} id="addProductButton">Add Product</button>
        </div>
        </>
    )
}

export default AddProduct;