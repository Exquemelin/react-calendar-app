import { types } from "../types/types";



// Definimos una constante para establecer el estado inicial
const initialState = {

    loading: true, // Variable para establecer que se está haciendo la consulta en la DB
    panels: [],

};

// Hacemos la exportación del Reducer
export const panelReducer = ( state = initialState, action ) => {

    // Definimos el switch con todas las variables que nos podrían llegar
    switch ( action.type ) {
        
        case types.panelLoading:

            return {
                ...state,
                loading: false,  
                panels: action.payload,             
            }    

        case types.panelAddNew:

            return {
                ...state,
                panels: [
                    ...state.panels,
                    action.payload,
                ]
            }
    
        default:

            // Por defecto devolvemos el state
            return state;
    }


}