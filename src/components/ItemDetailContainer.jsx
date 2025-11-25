import { useEffect,useState } from 'react'
import ItemDetail from './ItemDetail';
import { getProductById } from '../mock/Data';
import { useParams } from 'react-router-dom';
import { RingLoader } from 'react-spinners';

const ItemDetailContainer = () => {
    const [detail, setDetail] = useState({})
    const [loader, setLoader] = useState(false);
    const {itemId} = useParams()

    useEffect(() => {
      setLoader(true)
        getProductById(itemId)
          .then( res => setDetail(res))
          .catch( err => console.log(err.message))
          .finally(() => setLoader(false))
    }, [itemId])
  return (
    
      loader 
          ?
          <div className='d-flex justify-content-center my-5'>
            <RingLoader color="#EC6EAD" size={150} speedMultiplier={2} />
          </div>
          :
      <ItemDetail detail={detail}/> 
    
  )
}

export default ItemDetailContainer