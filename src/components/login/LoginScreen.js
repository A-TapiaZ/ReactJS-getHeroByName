import React, { useContext } from 'react'
import { AuthContext } from '../../auth/AuthContext'
import { types } from '../../types/types';

const LoginScreen = ({history}) => {

  const {dispatch}= useContext(AuthContext)

  const handleLogin =() => {
    // History es una propiedad que trae por defecto el react router dom, este se puede desestructurar como un prop cualquiera. 
    // La funcion push permite redireccionar a una pagina, el problema es que me deja devolver y en el caso de un login no seria productivo devolverme a la pantalla del login de nuevo despues de haberme logueado.  
    // history.push("/")

    const lastPath= localStorage.getItem('lastPath') || '/'
    
    const newState={
      name:'Alejandro',
    }
    
    dispatch({
      type: types.login,
      payload: newState,
    })
    
    // Para evitar lo de regresar a la pantalla de login, despues de haberme logueado, usamos replace el cual me "forzara" a regresar a la pantalla especificada, a menos que en el caso de login, le haya dado a "Logout" para salir.
    history.replace(lastPath) 

  } 
  

  return (
    <div className="container mt-5">
      <h1>Login screen</h1>
      <hr/>

      <button
        className= "btn btn-primary"
        onClick={handleLogin}
      
      >Login</button>
    </div>
  )
}

export default LoginScreen
