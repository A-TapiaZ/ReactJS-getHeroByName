import React, { useContext } from "react";
import {
BrowserRouter as Router,
Switch,
} from "react-router-dom";
import LoginScreen from "../components/login/LoginScreen";
import DashboardRoutes from "./DashboardRoutes";
import PrivateRoute from "./PrivateRoute";
import { AuthContext } from "../auth/AuthContext";
import PublicRoute from "./PublicRoute";

// Sistema de rutas ppal
const AppRouter = () => {

  const {user} = useContext(AuthContext);

  return (
     
    <Router>
      <div>
        <Switch>
          <PublicRoute 
          exact 
          path="/login" 
          component={LoginScreen}
          isAuthenticated={user.logged}
          />
          
          
          {/* Para este caso el route no tiene que tener la propiedad exact ya que como contiene mas direcciones dentro, no funcionaría */}
          {/* Ojo a donde lo estoy enviando, es otro componente creado para evitar que un usuario no registrado ingrese a las rutas "privadas" */}

          <PrivateRoute 
            path="/" 
            component={DashboardRoutes}
            isAuthenticated={user.logged}
          />
        
        
        </Switch>
      </div>
    </Router>
  );
}


export default AppRouter
