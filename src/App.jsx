import './App.css'
import { Route, Routes } from 'react-router';
import HomeNav from './Components/HomeNav';
import ProductHome from './Components/ProductHome';
import ProductDetails from './Components/ProductDetails';

function App(props) {
  return (
    <div>
     <Routes>
      <Route path='/' element={<HomeNav/>}>
        <Route index element={<ProductHome/>}/>
        <Route path='/product-detail/:id' element={<ProductDetails/>}/>
      </Route>
     </Routes>
    </div>
  );
}

export default App;