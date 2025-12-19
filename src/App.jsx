import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'
import ItemListContainer from './components/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer';
import CartContainer from './components/CartContainer';
import Nosotros from './components/Nosotros';
import Contacto from './components/Contacto';
import AdminMessages from './components/AdminMessages';
import Checkout from './components/Checkout';
import Error from './components/Error';
import Footer from './components/Footer';
import Login from './components/Login';
import Favorites from './components/Favorites';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { ToastContainer } from 'react-toastify';



function App() {

  return (
    <BrowserRouter>
        <AuthProvider>
          <CartProvider>
            <FavoritesProvider>
              <Navbar/>
              <Routes>
                <Route path='/' element={<ItemListContainer message={'Nuestros Productos'}/>}/>
                <Route path='/category/:categoryId' element={<ItemListContainer/>}/>
                <Route path='/item/:itemId' element={<ItemDetailContainer/>}/>
                <Route path='/cart' element={<CartContainer/>}/>
                <Route path='/nosotros' element={<Nosotros/>}/>
                <Route path='/contacto' element={<Contacto/>}/>
                <Route path="/admin/mensajes" element={<AdminMessages/>} />
                <Route path='/checkout' element={<Checkout/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/favoritos' element={<Favorites/>}/>
                <Route path='*' element={<Error/>}/>
              </Routes>
              <Footer/>
              <ToastContainer position="bottom-right" autoClose={3000} />
            </FavoritesProvider>
          </CartProvider>
        </AuthProvider>
    </BrowserRouter>
  )
}

export default App
