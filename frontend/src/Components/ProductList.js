import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './CssFiles/ProductList.css';

const ProductList=()=>{

    const [product,setProduct]=useState([]);

    useEffect(()=>{
    getProducts();
    },[])

    const getProducts= async()=>{

        let result = await fetch('http://localhost:5000/products',{
            // get jwt token in api  // this is mid advance part
            headers:{        // this below jwt token importnt  here focus on space between bearer & jwt token
                authorization :`beare ${JSON.parse(localStorage.getItem('token'))}`
            }
        });

        result = await result.json();
        setProduct(result);
        // console.log(result);
    }

    const deleteProduct =async(id)=>{
        // console.log(id)
        let result = await fetch(`http://localhost:5000/product/${id}`,{
            method:"delete",
              // get jwt token in api  // this is mid advance part
              headers:{        // this below jwt token importnt  here focus on space between bearer & jwt token
                authorization :`beare ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        if(result){
            getProducts();  // after recored deleted then call productlist api rernder updated list 
        }

    }

    const searchHandle= async(e)=>{
        console.log(e.target.value)
        let key=e.target.value;

        if(key){
        let result = await fetch(`http://localhost:5000/search/${key}`,{
              // get jwt token in api  // this is mid advance part
              headers:{        // this below jwt token importnt  here focus on space between bearer & jwt token
                authorization :`beare ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result =await result.json();
        if(result){
            setProduct(result);
        }
    }else{
        getProducts();
    }
    }


    
    return(
        <>

        <h1>Product List</h1>
        <input type="text" placeholder="Search Product" id="search"
        onChange={searchHandle}/>

     
       
       <table>
        <th>Sr.no</th>
        <th>Model</th>
        <th>Price</th>
        <th>Category</th>
        <th>Company</th>
        <th>Delete</th>
        <th>Update</th>
       {
        product.length > 0 ?  product.map((item,index)=>{
        return(  <tr key={item._id}>
            <td>{index+1}</td>
            <td>{item.name}</td> 
            <td>{item.price}</td>
            <td>{item.category}</td>
            <td>{item.company}</td>
            <td> <button onClick={()=>deleteProduct(item._id)}>Delete Item </button></td>
            <td>  <button>     <Link to={`/update/${item._id}`} id="update-button">update</Link></button> </td>
 
            </tr>
         )
        }
        )  
        : <h1>No result Found</h1>
       }
         </table>

       
     

        </>
    )
}

export default ProductList;