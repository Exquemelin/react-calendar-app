import React, { useEffect } from 'react'

// Importamos ReadDom para gestionar las rutas. Se copia de la web
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
  } from "react-router-dom";

import { useDispatch, useSelector } from 'react-redux';
  
  
import { startChecking } from '../../actions/auth';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';


import { CalendarScreen } from '../calendar/CalendarScreen';
import { LoginScreen } from '../auth/LoginScreen';
import { PYDScreen } from '../pyd/PydScreen';
import { PanelScreen } from '../pyd/panels/PanelScreen';
import { TestScreen } from '../pyd/tests/TestScreen';
import { PointsScreen } from '../pyd/tests/PointsScreen';
import { FatScreen } from '../pyd/tests/FatScreen';
import { FatInspectionScreen } from '../pyd/tests/FatInspectionScreen';
import { FatReviewScreen } from '../pyd/tests/FatReviewScreen';


export const AppRouter = () => {

    // Declaramos la variable dispatch para utilizarla
    const dispatch = useDispatch();

    // Tomtamos el valor de checking y del uid desde el store
    const { checking, uid } = useSelector( state => state.auth );

    // Con el useEffect disparamos el dispatch para que haga el checking
    useEffect(() => {

        // Hacemos el disptach de la accion que comprueba si el token almacenado es válido
        dispatch( startChecking() );

    }, [dispatch]);

    // Si estamos comprobando lanzamos un mensaje de espera
    if ( checking ) {
        return (<h5>Espere ....</h5>);
    }

    return (
        <Router>
            <div>
                <Switch>

                    <PublicRoute
                        exact
                        path="/login"
                        component={ LoginScreen }
                        isLoggedIn={ !!uid } // Usamos la doble negación porque "uid" no es nulo, con una negación "!uid" nos da false, con doble "!!uid" nos da true
                    />

                    {/* <Route exact path="/login" component={ LoginScreen } /> */}
                    <PrivateRoute 
                        exact 
                        path="/" 
                        component={ CalendarScreen } 
                        isLoggedIn={ !!uid }  // En este caso si no hay nada, la doble negación nos devolverá false
                    />

                    <PrivateRoute 
                        exact 
                        path="/pyd" 
                        component={ PYDScreen } 
                        isLoggedIn={ !!uid }  // En este caso si no hay nada, la doble negación nos devolverá false
                    />

                    <PrivateRoute 
                        exact 
                        path="/serials" 
                        component={ PanelScreen } 
                        isLoggedIn={ !!uid }  // En este caso si no hay nada, la doble negación nos devolverá false
                    />

                    <PrivateRoute 
                        exact 
                        path="/tests" 
                        component={ TestScreen } 
                        isLoggedIn={ !!uid }  // En este caso si no hay nada, la doble negación nos devolverá false
                    />

                    <PrivateRoute 
                        exact 
                        path="/tests/points" 
                        component={ PointsScreen } 
                        isLoggedIn={ !!uid }  // En este caso si no hay nada, la doble negación nos devolverá false
                    />

                    <PrivateRoute 
                        exact 
                        path="/tests/fat" 
                        component={ FatScreen } 
                        isLoggedIn={ !!uid }  // En este caso si no hay nada, la doble negación nos devolverá false
                    />

                    <PrivateRoute 
                        exact
                        path="/tests/fat/inspection"
                        component={ FatInspectionScreen }
                        isLoggedIn={ !!uid } // En este caso si no hay nada, la doble negación nos devolverá false
                    />

                    <PrivateRoute 
                        exact
                        path="/tests/fat/review"
                        component={ FatReviewScreen }
                        isLoggedIn={ !!uid } // En este caso si no hay nada, la doble negación nos devolverá false
                    />

                    <Redirect to="/login" />

                </Switch>
            </div>
        </Router>
    )
}
