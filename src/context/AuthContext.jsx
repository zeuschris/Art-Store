import { createContext, useContext, useState, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import { auth } from '../service/firebase';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider')
  }
  return context;
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })

    return () => unsubscribe();
  }, [])

  const register = async (email, password, displayName) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      
      if (displayName && displayName.trim()) {
        try {
          await updateProfile(userCredential.user, { displayName: displayName.trim() })
          await userCredential.user.reload()
        } catch (profileError) {
          console.warn('Error al actualizar el perfil, pero el usuario fue creado:', profileError)
        }
      }
      
      toast.success('¡Registro exitoso!')
      return userCredential.user;
    } catch (error) {
      let errorMessage = 'Error al registrar usuario'
      
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'Este correo electrónico ya está en uso'
          break
        case 'auth/weak-password':
          errorMessage = 'La contraseña debe tener al menos 6 caracteres'
          break
        case 'auth/invalid-email':
          errorMessage = 'Correo electrónico inválido'
          break
        case 'auth/operation-not-allowed':
          errorMessage = 'El método de autenticación no está habilitado. Por favor, contacta al administrador.'
          break
        case 'auth/network-request-failed':
          errorMessage = 'Error de red. Por favor, verifica tu conexión a internet.'
          break
        case 'auth/too-many-requests':
          errorMessage = 'Demasiados intentos. Por favor, intenta más tarde.'
          break
        default:
          errorMessage = `Error al registrar: ${error.message || 'Acción inválida'}`
          console.error('Error completo de registro:', error)
      }
      
      toast.error(errorMessage)
      throw error
    }
  }

  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      toast.success('¡Inicio de sesión exitoso!');
      return userCredential.user;
    } catch (error) {
      let errorMessage = 'Error al iniciar sesión'
      if (error.code === 'auth/user-not-found') {
        errorMessage = 'Usuario no encontrado'
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'Contraseña incorrecta'
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Correo electrónico inválido'
      }
      toast.error(errorMessage);
      throw error;
    }
  }

  const logout = async () => {
    try {
      await signOut(auth);
      toast.success('Sesión cerrada exitosamente')
    } catch (error) {
      toast.error('Error al cerrar sesión')
      throw error;
    }
  }

  const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider()
      const userCredential = await signInWithPopup(auth, provider)
      toast.success('¡Inicio de sesión con Google exitoso!')
      return userCredential.user;
    } catch (error) {
      let errorMessage = 'Error al iniciar sesión con Google'
      if (error.code === 'auth/popup-closed-by-user') {
        errorMessage = 'Ventana de autenticación cerrada'
      } else if (error.code === 'auth/cancelled-popup-request') {
        errorMessage = 'Solicitud cancelada'
      }
      toast.error(errorMessage)
      throw error
    }
  }

  const value = {
    user,
    loading,
    register,
    login,
    logout,
    loginWithGoogle
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

