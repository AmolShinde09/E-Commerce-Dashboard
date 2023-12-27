import React from 'react';
import Home from './Home.js';
import {BrowserRouter} from 'react-router-dom'

const Index=()=>{

    let auth = localStorage.getItem('user');

    auth = JSON.parse(auth);
    return(
        <BrowserRouter>
        <h1>Index</h1>
        <Home/>
       
      </BrowserRouter>
    )
}

export default Index;