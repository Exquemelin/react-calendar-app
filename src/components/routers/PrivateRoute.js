import React from 'react'
import { Redirect, Route } from 'react-router-dom'


import PropTypes from 'prop-types';


// Desestructuramos las props que tenemos que pasar
// ...rest es el resgo de propiedades como el exact, el to, etc del Route que necesitamos
export const PrivateRoute = ({
    isLoggedIn,
    component: Component,
    ...rest
}) => {

    // Comprobamos si está autenticado o no. Si no lo está lo llevamos al login
    return (
        <Route { ...rest }
            component={ ( props ) => (
                ( isLoggedIn )
                    ? (<Component { ...props } />)
                    : (<Redirect to="/auth/login" />)
            )}
        />
    )

}

// Establecemos los PropTypes que debemos pasar
PrivateRoute.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired,
}
