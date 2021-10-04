import { types } from "../types/types";


// Action para abrir el modal
export const uiOpenModal = () => ({ type: types.uiOpenModal });

// Action para cerrar el modal
export const uiCloseModal = () => ({ type: types.uiCloseModal });

// Action para abrir el modal de los cuadros
export const uiOpenPanelModal = () => ({ type: types.uiOpenPanelModal });

// Action para cerrar el modal de los cuadros
export const uiClosePanelModal = () => ({ type: types.uiClosePanelModal });

// Action para abrir el modal de los points
export const uiOpenPointModal = () => ({ type: types.uiOpenPointModal });

// Action para cerrar el modal de los points
export const uiClosePointModal = () => ({ type: types.uiClosePointModal });

// Action para abrir el modal de los fat points
export const uiOpenFatPointModal = () => ({ type: types.uiOpenFatPointModal });

// Action para cerrar el modal de los fat point
export const uiCloseFatPointModal = () => ({ type: types.uiCloseFatPointModal });