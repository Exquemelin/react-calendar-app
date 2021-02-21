import React from 'react'

// Importamos ReadDom para gestionar las rutas. Se copia de la web
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
  } from "react-router-dom";


import { LoginScreen } from '../auth/LoginScreen';
import { CalendarScreen } from '../calendar/CalendarScreen';


export const AppRouter = () => {
    return (
        <Router>
            <div>
                <Switch>

                    <Route exact path="/login" component={ LoginScreen } />
                    <Route exact path="/" component={ CalendarScreen } />
                    <Redirect to="/login" />

                </Switch>
            </div>
        </Router>
    )
}
