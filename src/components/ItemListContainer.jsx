import ItemList from './ItemList';
import { useState, useEffect, useRef } from 'react'; 
import { useParams } from 'react-router-dom';
import ItemSkeleton from './ItemSkeleton'; 
import LoadingBar from 'react-top-loading-bar'; 
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../service/firebase';

const ItemListContainer = ({message}) => {

    const [data, setData] = useState([]);
    const [loader, setLoader] = useState(false);
    const {categoryId} = useParams();

    const loadingBarRef = useRef(null); 
    const SITE_NAME = 'Art Store';

    useEffect(() => {
        let title = `${SITE_NAME} - Productos personalizados`;

        if (categoryId) { 
            const categoryName = categoryId.charAt(0).toUpperCase() + categoryId.slice(1);
            title = `${SITE_NAME} - ${categoryName}`;
        }
        document.title = title;

        return () => {
            document.title = `${SITE_NAME} - Productos Personalizados`;
        };
    }, [categoryId]); 



    useEffect(() => {
        if (loadingBarRef.current) {
            loadingBarRef.current.continuousStart();
        }
        setLoader(true)

        const prodCollection = categoryId ? query(collection(db, 'items'), where('category', '==', categoryId)) : collection(db, 'items')
        getDocs(prodCollection)
          .then((resp) => {
            const products = resp.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
            setData(products)
          })
          .catch((error) => console.log(error.message))
          .finally(() => {
            setLoader(false);

            if (loadingBarRef.current) {
                loadingBarRef.current.complete();
            }
        })
    }, [categoryId])

    return (
        <>
            <LoadingBar color="#EC6EAD" shadow={true} height={3} ref={loadingBarRef} style={{
            boxShadow: `0 0 15px #EC6EAD, 0 0 8px #cf51a5`}}/>

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
        </>
    );
};

export default ItemListContainer;