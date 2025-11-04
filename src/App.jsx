import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar'
import ItemListContainer from './components/ItemListContainer';
import Footer from './components/Footer';


function App() {

  return (
    <>
      <Navbar/>
      <ItemListContainer message={"¡Bienvenido a Art Store!"}/>
      <Footer/>
    </>
  )
}

export default App
