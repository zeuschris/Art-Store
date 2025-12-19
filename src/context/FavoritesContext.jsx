import { createContext, useContext, useState, useEffect } from 'react';
import { 
  collection, 
  doc, 
  setDoc, 
  deleteDoc, 
  getDoc,
  getDocs,
  query,
  where
} from 'firebase/firestore';
import { db } from '../service/firebase';
import { useAuth } from './AuthContext';
import { toast } from 'react-toastify';

const FavoritesContext = createContext();

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites debe ser usado dentro de un FavoritesProvider');
  }
  return context;
};

export const FavoritesProvider = ({ children }) => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadFavorites = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const favoritesRef = collection(db, 'favorites');
      const q = query(favoritesRef, where('userId', '==', user.uid));
      const querySnapshot = await getDocs(q);
      
      const favoritesList = [];
      querySnapshot.forEach((docSnapshot) => {
        favoritesList.push({
          id: docSnapshot.id,
          ...docSnapshot.data()
        });
      });
      
      setFavorites(favoritesList);
    } catch (error) {
      console.error('Error al cargar favoritos:', error);
      toast.error('Error al cargar favoritos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      loadFavorites();
    } else {
      setFavorites([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const addToFavorites = async (product) => {
    if (!user) {
      toast.error('Debes iniciar sesión para agregar productos a favoritos');
      return false;
    }

    try {
      const favoriteRef = doc(db, 'favorites', `${user.uid}_${product.id}`);
      const favoriteDoc = await getDoc(favoriteRef);

      if (favoriteDoc.exists()) {
        toast.info('Este producto ya está en tus favoritos');
        return false;
      }

      await setDoc(favoriteRef, {
        userId: user.uid,
        productId: product.id,
        product: {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.images?.[0] || product.image,
          category: product.category
        },
        addedAt: new Date().toISOString()
      });

      setFavorites([...favorites, { 
        id: favoriteRef.id, 
        productId: product.id,
        product: {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.images?.[0] || product.image,
          category: product.category
        }
      }]);

      toast.success('Producto agregado a favoritos');
      return true;
    } catch (error) {
      console.error('Error al agregar a favoritos:', error);
      toast.error('Error al agregar producto a favoritos');
      return false;
    }
  };

  const removeFromFavorites = async (productId) => {
    if (!user) return false;

    try {
      const favoriteRef = doc(db, 'favorites', `${user.uid}_${productId}`);
      await deleteDoc(favoriteRef);

      setFavorites(favorites.filter(fav => fav.productId !== productId));
      toast.success('Producto eliminado de favoritos');
      return true;
    } catch (error) {
      console.error('Error al eliminar de favoritos:', error);
      toast.error('Error al eliminar producto de favoritos');
      return false;
    }
  };

  const isFavorite = (productId) => {
    return favorites.some(fav => fav.productId === productId);
  };

  const toggleFavorite = async (product) => {
    if (!user) {
      toast.error('Debes iniciar sesión para agregar productos a favoritos');
      return;
    }

    if (isFavorite(product.id)) {
      await removeFromFavorites(product.id);
    } else {
      await addToFavorites(product);
    }
  };

  const value = {
    favorites,
    loading,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    toggleFavorite
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

