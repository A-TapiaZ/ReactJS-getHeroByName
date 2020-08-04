import React, { useContext } from 'react'
import { Link, NavLink, useHistory } from 'react-router-dom'
import { AuthContext } from '../../auth/AuthContext'
import { types } from '../../types/types'

export const Navbar = () => {

    // user:{name}, extrae la propiedad name por destructuring
    const {user:{name}, dispatch} = useContext(AuthContext)

    // Este es un hook propio de react-router-dom, lo que pasa es que navbar al no ser una ruta (Route) en el dashboard (dirigirse al componente dashboard para verlo), no hereda el prop de history, por lo que nos toca heredarlo de otra forma, y es por medio del hook ya mencionado. 
    // El Router funciona como un contextProvider, por eso podemos acceder al hook de useHistory.
    const history=useHistory()

    const handleLogout = () => {
        
        dispatch({
            type:types.logout,
        })

        history.replace('/')
    }
    


    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
            
            <Link 
                className="navbar-brand" 
                to="/"
            >
                HEROES-APP
            </Link>

            <div className="navbar-collapse">
                <div className="navbar-nav">

                    <NavLink 
                        activeClassName="active"
                        className="nav-item nav-link" 
                        exact
                        to="/marvel"
                    >
                        Marvel
                    </NavLink>

                    <NavLink 
                        activeClassName="active"
                        className="nav-item nav-link" 
                        exact
                        to="/dc"
                    >
                        DC
                    </NavLink>
                    
                    <NavLink 
                        activeClassName="active"
                        className="nav-item nav-link" 
                        exact
                        to="/search"
                    >
                        Search
                    </NavLink>
                </div>
            </div>

            <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
                <ul className="navbar-nav ml-auto">
                    <span 
                        className="nav-item nav-link text-info" 
                        >{name}
                    </span>

                    <button 
                        
                        className="btn nav-item nav-link" 
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </ul>
            </div>
        </nav>
    )
}