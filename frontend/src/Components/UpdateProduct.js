import React,{useEffect, useState} from "react";
import { useNavigate, useParams } from "react-router-dom";
import './CssFiles/UpdateProduct.css';

const UpdateProduct=()=>{

    
    const [name,setName]=useState('');
    const [price,setPrice]=useState('');
    const [category,setCategory]=useState('');
    const [company,setCompany]=useState('');
    const params = useParams();
    const navigate = useNavigate();


    useEffect(()=>{
        getProductDetails();
    },[])

    const getProductDetails=async()=>{
//  console.log(params.id)
        let result= await fetch(`http://localhost:5000/product/${params.id}`,{
            headers:{
                authorization :`beare ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        // console.log("result",result);
        setName(result.name);
        setPrice(result.price);
        setCategory(result.category);
        setCompany(result.company);

    }
   
    const updateProduct=async()=>{
        console.log(params.id)

        let result = await fetch(`http://localhost:5000/product/${params.id}`,{
            method:"put",
            body: JSON.stringify({ name,price,category,company  }),
            headers:{
                authorization :`beare ${JSON.parse(localStorage.getItem('token'))}`,
                "Content-Type":"application/json",
                 // get jwt token in api  // this is mid advance part
                  // this below jwt token importnt  here focus on space between bearer & jwt token
             }
             } );
        result =  await result.json();
        console.log(result);

        navigate('/')
    }

    return(
        <>
        <h1>updateProduct</h1>
        <div className="addProduct">
        <input type="tex" placeholder="Enter Product Name" value={name} onChange={(e)=>{setName(e.target.value)}}/><br/><br/>
    
        <input type="tex" placeholder="Enter Product Price" value={price}  onChange={(e)=>{setPrice(e.target.value)}} /><br/><br/>
     
        <input type="tex" placeholder="Enter Product Category" value={category}  onChange={(e)=>{setCategory(e.target.value)}}/><br/><br/>
     
        <input type="tex" placeholder="Enter Product Company" value={company}  onChange={(e)=>{setCompany(e.target.value)}}/><br/><br/><br/>

        <button onClick={updateProduct} id="upDateProduct">updateProduct</button>
        </div>
        </>
    )
}

export default UpdateProduct;