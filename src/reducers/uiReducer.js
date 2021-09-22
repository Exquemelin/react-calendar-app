import { types } from "../types/types";


// estado inicial, con el modalOpen en false
const initialState = {
    modalOpen : false,
    panelModalOpen: false,
    pointModalOpen: false,
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

        case types.uiOpenPanelModal:

            // Establecemos la apertura del modal del cuadro en true
            return {
                ...state,
                panelModalOpen: true,
            }

        case types.uiClosePanelModal:

            // Establecemos la apertura del modal del cuadro en false
            return {
                ...state,
                panelModalOpen: false,
            }
    
        case types.uiOpenPointModal:

            // Establecemos la apertura del modal del cuadro en true
            return {
                ...state,
                pointModalOpen: true,
            }

        case types.uiClosePointModal:

            // Establecemos la apertura del modal del cuadro en false
            return {
                ...state,
                pointModalOpen: false,
            }
    
        default:
            
            return state;
    }

}