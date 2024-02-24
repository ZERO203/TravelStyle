import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { CartContextProvider } from "./context/cartContext";
import Navbar from "./components/Navbar";
import Home from "./views/Home"
import AllProduct from "./views/AllProduct";
import ProductDetail from "./views/ProductDetail";
import Dashboard from "./views/admin/Dashboard";
import ManageProduct from "./views/admin/ManageProduct";
import DetailProduct from "./views/admin/DetailProduct";




export default function App() {

  return (

    <Router>
      <CartContextProvider>
        <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<AllProduct />} />
        <Route path='/detail/:id' element={<ProductDetail />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/crearproducto" element={<ManageProduct />} />
        <Route path="/producto/:id" element={<DetailProduct />}  />
        
        

      </Routes>
      </CartContextProvider>
    </Router>
    
  )
}
