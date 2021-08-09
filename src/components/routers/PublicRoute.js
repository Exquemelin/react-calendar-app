import React from 'react'
import { Redirect, Route } from 'react-router-dom'

import PropTypes from 'prop-types';


// Elemento con props que vamos a necesitar
export const PublicRoute = ({
    isLoggedIn,
    component: Component,
    ...rest
}) => {

    // Si está autenticado lo redirigimos al raíz, si no, lo llevamos al login
    return (
        <Route { ...rest }
            component={ ( props ) => (
                (isLoggedIn)
                    ? ( <Redirect to="/" /> )
                    : ( <Component { ...props } /> )
            )}
        />
    )

}

// Declaramos las proptypes que tenemos que pasar
PublicRoute.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired,
}
