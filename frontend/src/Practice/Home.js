import Reacr from 'react'
import {Routes,Route,Link} from 'react-router-dom'
import AccessDataFromLocalStorage from './AccessDataFromLocalStorage'
import DataStoreInLocalStore from './DataStoreInLocalStorage'



const Home=()=>{

    let auth = localStorage.getItem("user");

    auth = JSON.parse(auth);
    return(
        <>
        <h1>Home</h1>
{

    auth ?
    <>        <Link to="/profile">profile</Link>
        <Link to="/logout">logout</Link>
</>
 :
    <>    <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
</>
}

        <Routes>
        <Route path="/login" element={<AccessDataFromLocalStorage/>}/>
        <Route path="/register" element={<DataStoreInLocalStore/>} />
        <Route path="/profile" element={<h1>profile</h1>} />
        <Route path="/logout" element={<h1>logout</h1>}/>
        </Routes>
        
        </>
    )
}

export default Home;