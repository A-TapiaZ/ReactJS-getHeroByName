import React, { useReducer, useEffect } from 'react'
import AppRouter from './routers/AppRouter'
import { AuthContext } from './auth/AuthContext'
import { authReducer } from './auth/authReducer'


// Este es el estado inicial del logged, va a buscar al localstorage a ver si existe un usuario logueado, de lo contrario solo se inicializara con el estado logged en false. 
// Vale la pena aclarar que esto se hace así por el momento porque esta aplicacion no tiene Backend, solo esta lo que usamos en el navegador.
const init= () => {
  return JSON.parse(localStorage.getItem('user')) || {logged:false}
}


const HeroesApp = () => {
  
  const [user, dispatch] = useReducer(authReducer, {}, init)

  useEffect(() => {
    
    localStorage.setItem('user',JSON.stringify(user));

  }, [user])

  return (
    <>
      <AuthContext.Provider value={{user,dispatch}}>
        <AppRouter/>
      </AuthContext.Provider>
    </>
  )
}

export default HeroesApp
