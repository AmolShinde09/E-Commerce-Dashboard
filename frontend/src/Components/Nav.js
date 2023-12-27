import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import './CssFiles/Nav.css';

const Nav = () => {

    const auth = localStorage.getItem('user');  // when user logined show logout oprtion on navbar or  user not logined show singup option on navbar

    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear(); // delete user value/data from local storage for user logout
        navigate('/singnup')
    }
    return (
        <>
            <div className="navbar">

                {auth ?
            
                <ul>
                        
                {/* <img
                style={{borderRadius:"20px",height:"20px"}}
                crossOrigin="anonymous" 
                alt="india"
                src="https://countryflagsapi.com/png/india"
                /> */}
                        <li><Link to='/'> Tech.com </Link></li>
                        <li> <Link to='/'>Products</Link></li>
                        <li> <Link to='/add'>Add Product</Link></li>
                        {/* <li> <Link to='/update'>Update Product</Link></li> */}
                        <li> <Link to='/profile'>Profile</Link></li>  
                                                                    {/* showing user name on navbar */}
                                                                    {/* ({JSON.parse(auth).name}) */}
                        <li><Link to='/singnup' onClick={logout}>Logout  </Link></li>

                        {/* <li>{ auth ?   <Link to='/singnup' onClick={logout}>Logout</Link> : <Link to='/singnup'>Singnup</Link> }</li> */}
                        {/* when user logined show logout when user l=not logined show singup  */}
                        {/* <li> <Link to='/login'>Login</Link></li> */}

                    </ul>
                    :
                    <ul>
                        <li>   <Link to='/singnup'>Singnup</Link> </li>
                        <li> <Link to='/login'>Login</Link></li>
                    </ul>
                }

            </div>
        </>
    )
}

export default Nav;