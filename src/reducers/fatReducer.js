import { types } from "../types/types";



// Definimos una constante para establecer el estado inicial
const initialState = {
    starting: true, // Variable para establecer que se está haciendo la consulta en la DB
    checked: false, // Variable para establecer cuando a un cuadro se le hicieron todas las pruebas
    ready: false, // Variable para establecer cuando un cuadro está listo
    panel: {}, // Variable para introducir los datos del cuadro
    points: [], // Variable para introducir los fat points
    categories: [], // Variable con las categorías de las pruebas
    steps: [], // Variable con los steps de las pruebas
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
                ready: false,
                panel: {},
                points: [],
                active: {},
                categories: [],
                steps: [],     
            }    
    
        case types.fatSetActive:

            return {
                ...state,
                panel: action.payload
            }

        case types.fatLoadPoints:

            return {
                ...state,
                points: action.payload,
            }

        case types.fatAddPoint:

            return {
                ...state,
                points: [
                    ...state.points,
                    action.payload,
                ],
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
                checked: action.payload.checked,
                ready: action.payload.ready,
            }

        case types.fatLoadCategories:

            return {
                ...state,
                categories: action.payload.categories,
                steps: action.payload.steps,
            }

        case types.fatSetActivePoint:

            return {
                ...state,
                active: {
                    point: action.payload.point,
                    index: action.payload.index,
                }
            }

        case types.fatClearActivePoint:

            return {
                ...state,
                active: {},
            }
        
        default:

        // Por defecto devolvemos el state
        return state;
    }


}
