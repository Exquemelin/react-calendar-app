import { types } from "../types/types";


// Action para añadir un nuevo evento al store
export const eventAddNew = ( event ) => ({
    type: types.eventAddNew,
    payload: event,
});

// Action para establecer el evento activo en el store
export const eventSetActive = ( event ) => ({
    type: types.eventSetActive,
    payload: event,
});

// ACtion para limpiar el evento activo en el store
export const eventClearActiveEvent = () => ({ type: types.eventClearActiveEvent })

// Action para actualizar el evento
export const eventUpdated = ( event ) => ({
    type: types.eventUpdate,
    payload: event,
})

// Actin para borrar el evento
export const eventDelete = () => ({ type: types.eventDelete });