import { types } from "../types/types";


// estado inicial, con el modalOpen en false
const initialState = {
    modalOpen : false,
}


// Reducer para la ui
export const uiReducer = ( state = initialState, action ) => {

    switch ( action.type ) {
        case types.uiOpenModal:
            
            // Establecemos la apertura del modal en true
            return {
                ...state,
                modalOpen: true,
            };

        case types.uiCloseModal:

            // Establecemos la apertura del modal en false
            return {
                ...state,
                modalOpen: false,
            };
    
        default:
            
            return state;
    }

}