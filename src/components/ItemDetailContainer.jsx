import { useEffect,useState } from 'react'
import ItemDetail from './ItemDetail';
import { Link, useParams } from 'react-router-dom';
import { Container, Alert, Button } from 'react-bootstrap';
import { FaHeartBroken } from 'react-icons/fa';
import LoaderComponent from './LoaderComponent';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../service/firebase';

const ItemDetailContainer = () => {
    const [detail, setDetail] = useState({})
    const [loader, setLoader] = useState(false);
    const [invalidId, setInvalidId] = useState(null);
    const {itemId} = useParams()

    useEffect(() => {
      setLoader(true)
      getDoc(doc(db, 'items', itemId))
        .then((resp) => {
          resp.data() ? setDetail({ id: resp.id, ...resp.data() }) : setInvalidId(true)
        })
        .catch((error) => console.log(error.message))
        .finally(() => setLoader(false))
    }, [itemId])

    if(invalidId){
      const primaryColor = '#cf51a5'
      const accentColor = '#EC6EAD'
      return (
        <Container className="my-5 py-5">
            <Alert 
                className="text-center p-5 shadow-lg border-3"
                style={{ backgroundColor: '#fff0f5', borderColor: primaryColor }}
            >
            
                <FaHeartBroken size={50} className="mb-3" style={{ color: accentColor }} />
                
                <h2 
                    className="alert-heading mb-3" 
                    style={{ fontSize: '2rem', fontWeight: 'bold', color: primaryColor }}
                >
                    Producto No Encontrado
                </h2>
                
                <p className="lead mb-4" style={{ color: primaryColor }}>
                    Parece que el ID del producto que ingresaste no existe.
                </p>
                
                <hr style={{ borderColor: accentColor, opacity: 0.5 }} />
                
                <p className="mb-4 text-muted">
                    Verifica si la dirección es correcta o regresa para seguir comprando.
                </p>
                
                <div className="d-grid gap-2 col-md-4 mx-auto">
                    <Button 
                        as={Link} 
                        to="/" 
                        size="lg"
                        className='btn-grad fw-bold'
                    >
                        Volver al Inicio
                    </Button>
                </div>
            </Alert>
        </Container>
      )
    }
    
  return (
      <>
        {
          loader ? <LoaderComponent/> : <ItemDetail detail={detail}/> 
        }
      </>
  )
}

export default ItemDetailContainer