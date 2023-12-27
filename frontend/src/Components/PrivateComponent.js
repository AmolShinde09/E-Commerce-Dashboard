import React from "react";
import {Navigate,Outlet } from 'react-router-dom'

const PrivateComponent =()=>{

    const auth = localStorage.getItem('user');  // user is key geting user value find then true not find false
    return( auth ? <Outlet/> : <Navigate to="/singnup"/>  // user not login show singnup page user login then show private component
    )
};

export default PrivateComponent;