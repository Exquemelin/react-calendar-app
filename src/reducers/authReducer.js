import { types } from "../types/types";


// Definimos una constante para establecer el estado inicial
const initialState = {
    checking: true, // Variable para establecer si se está haciendo la consulta de estar logueado o no.
    // uid: null,
    // name: null,
}

// Hacemos la exportación del Reducer
export const authReducer = ( state = initialState, action ) => {

    // Definimos el switch con todas las variables que nos podrían llegar
    switch ( action.type ) {

        // Almacenamos en el store los datos del usuario, y ponemos el checking en false porque ya hemos obtenido una respuesta
        case types.authLogin:

            return {
                ...state,
                ...action.payload,
                checking: false,
            }

        // Al finalizar la consulta ponemos el checking en false
        case types.authCheckingFinish:

            return {
                ...state,
                checking: false,
            }

        // Al hacer logout borramos el store
        case types.authStartLogout:

            return {
                checking: false,
            }

        default:

            // Por defecto devolvemos el state
            return state;

    }

}