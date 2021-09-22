import { types } from "../types/types";



// Definimos una constante para establecer el estado inicial
const initialState = {
    starting: true, // Variable para establecer que se está haciendo la consulta en la DB
    checked: false, // Variable para establecer cuando a un cuadro se le hicieron todas las pruebas
    panel: {},
    points: []
}

// Hacemos la exportación del Reducer
export const fatReducer = ( state = initialState, action ) => {

    // Definimos el switch con todas las variables que nos podrían llegar
    switch ( action.type ) {
        
        case types.fatStarting:

            return {
                ...state,
                starting: false,           
            }    
    
        case types.fatClean:

            return {
                starting: true, // Variable para establecer que se está haciendo la consulta en la DB
                checked: false,
                panel: {},
                points: []           
            }    
    
        case types.fatSetActive:

            return {
                ...state,
                panel: action.payload
            }

        case types.fatLoadPoints:

            return {
                ...state,
                points: action.payload
            }

        case types.fatUpdatePoint:

            return {
                ...state,
                points: state.points.map( (point, i ) => i === action.payload.index 
                    ? ( action.payload.point )
                    : ( point )
                )   
            }

        case types.fatPanelChecked:

            return {
                ...state,
                checked: true,
            }
        
        default:

        // Por defecto devolvemos el state
        return state;
    }


}
