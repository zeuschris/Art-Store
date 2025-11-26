import { getProducts } from '../mock/Data';
import ItemList from './ItemList';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { RingLoader } from 'react-spinners';
import ItemSkeleton from './ItemSkeleton'; 
import { Row, Col } from 'react-bootstrap'

const ItemListContainer = ({message}) => {

  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);
  const {categoryId} = useParams();

  useEffect(() => {
    setLoader(true)
    getProducts()
    .then(res => {
      categoryId ? setData(res.filter((item) => item.category === categoryId)) : setData(res)
    })
    .catch(err => console.log(err))
    .finally(() => setLoader(false))
  },[categoryId])

  console.log('data', data)

  return (
    <div>
        <h1 style={{color:'#cf51a5ff', fontSize:'60px', fontWeight:'bold', textShadow: '1px 1px 2px #EC6EAD', fontFamily: '"Sansita", sans-serif'}} className='text-center my-4 text-uppercase '>{message} 
        {
        categoryId && 
        <span style={{textTransform:'capitalize', color:'#cf51a5ff', fontFamily: '"Sansita", sans-serif'}}>
            {categoryId}
        </span>
        }
        </h1>

      {
        loader 
        ?
        <div className='d-flex justify-content-evenly flex-wrap py-5'>
          <ItemSkeleton />
          <ItemSkeleton />
          <ItemSkeleton />
        </div>
        :
        <ItemList data = {data}/> 
      }
    </div>
  );
};

export default ItemListContainer;