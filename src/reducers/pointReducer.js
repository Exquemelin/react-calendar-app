import { types } from "../types/types";



// Definimos una constante para establecer el estado inicial
const initialState = {
    loading: true, // Variable para establecer que se está haciendo la consulta en la DB
    points: []
}

// Hacemos la exportación del Reducer
export const pointReducer = ( state = initialState, action ) => {

    // Definimos el switch con todas las variables que nos podrían llegar
    switch ( action.type ) {
        
        case types.pointLoading:

            return {
                ...state,
                loading: false,  
                points: action.payload,             
            }    
    
        case types.pointAddNew:

            return {
                ...state,
                points: [
                    ...state.points,
                    action.payload,
                ]
            }
        
        default:

        // Por defecto devolvemos el state
        return state;
    }


}