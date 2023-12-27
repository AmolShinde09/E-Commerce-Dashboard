import { BrowserRouter , Routes ,Route} from 'react-router-dom';
import './App.css';
import Nav from './Components/Nav';
import Footer from './Components/Footer';
import Singnup from './Components/Singnup';
import PrivateComponent from './Components/PrivateComponent';
import Login from './Components/Login';
import AddProduct from './Components/AddProduct';
import ProductList from './Components/ProductList';
import UpdateProduct from './Components/UpdateProduct';

function App() {
  return (
    <div>
      <BrowserRouter>
     <Nav/>

     <Routes>

      <Route element={<PrivateComponent/>}> //this is below all PrivateComponent show after uer login other wise not show
      
      <Route path='/' element={<ProductList/>}/>
      <Route path='/add' element={<AddProduct/>}/>
      <Route path='/update/:id' element={<UpdateProduct/>} />
      <Route path='/logout' element={<h1>Logout component</h1>}/>
      <Route path='/profile' element={<h1>Profile component</h1>}/>
    
      </Route>


     <Route path='singnup' element={<Singnup/>} />
     <Route path='login' element={<Login/>}/>
     </Routes>

     </BrowserRouter>
{/* <Footer/> */}
    
    </div>
  );
}

export default App;
