import Swal from "sweetalert2";


import { fetchConToken } from "../helpers/fetch";
import { prepareEvents } from "../helpers/prepare-events";
import { types } from "../types/types";


export const eventStartAddNew = ( event ) => {

    return async ( dispatch, getState )  => {

        // Tomamos el state auth del store y lo desestructuramos para utilizar la información
        const { uid, name } = getState().auth;

        try {

            // Hacemos la petición de grabación en la base de datos y almacenamos la respuesta en una variable
            const resp = await fetchConToken( 'events', event, 'POST');
            const body = await resp.json()

            if ( body.ok ) {

                // Hacemos dispatch del evento para introducirlo en el store
                event.id = body.evento.id;
                // Los datos del user los obtenemos del store
                event.user = {
                    id: uid,
                    name: name,
                }

                // Hacemos el dispatch del evento para pasarlo al store
                dispatch( eventAddNew( event ) );

            }
            
        } catch (error) {
            console.log(error);
        }
        

    }

}

// Action para añadir un nuevo evento al store
// Solo lo vamos a utilizar aquí, así que no es necesario exportarlo
const eventAddNew = ( event ) => ({
    type: types.eventAddNew,
    payload: event,
});

// Action para establecer el evento activo en el store
export const eventSetActive = ( event ) => ({
    type: types.eventSetActive,
    payload: event,
});

// ACtion para limpiar el evento activo en el store
export const eventClearActiveEvent = () => ({ type: types.eventClearActiveEvent });

// Action para empezar a actualizar el evento en la DB
export const eventStartUpdate = ( event ) => {

    return async ( dispatch ) => {

        // Hacemos un try/catch para lanzar la actualización a la DB
        try {

            // Lanzamos la peticion con el endpoint, la información, y el tipo de petición
            // Almacenamos la respuesta en una variable y la transformamos en un json
            const resp = await fetchConToken( `events/${ event.id }`, event, 'PUT' );
            const body = await resp.json();

            if ( body.ok ) {
                
                // Si todo salió bien, hacemos el dispatch de la acción para actualizarlo en el Store
                dispatch( eventUpdated( event ) );

            } else {

                // En caso contrario activamos un mensaje de error
                Swal.fire('Error', body.msg, 'error' );

            }
            
        } catch (error) {
            console.log( error );
        }

    }

}

// Action para actualizar el evento
export const eventUpdated = ( event ) => ({
    type: types.eventUpdate,
    payload: event,
});


// Función para empezar el borrado del evento de la DB
export const eventStartDelete = () => {

    // Extraemos el estado del store para tener la información del evento a borrar con getState
    return async ( dispatch, getState ) => {

        // Desestrucutramos el id del evento activo en el store
        const { id } = getState().calendar.activeEvent;

        try {
            
            // Lanzamos la petición a la DB con el endpoint y el tipo de petición
            const resp = await fetchConToken( `events/${ id }`, {}, 'DELETE');
            const body = await resp.json();

            if ( body.ok ) {

                // Si todo fue bien borramos el evento del store
                dispatch( eventDelete() );

            } else {

                // En caso contrario lanzamos un mensaje de error
                Swal.fire('Error', body.msg, 'error' );

            }
            
        } catch (error) {
            console.log( error );
        }

    }

}

// Action para borrar el evento
const eventDelete = () => ({ type: types.eventDelete });

// Función para empezar la carga de eventos desde la DB
export const eventStartLoading = () => {

    return async ( disptach ) => {

        try {

            // Lanzamos la petición del get eventos a la DB. Al ser una petición GET solo hay que pasar el endpoint
            const resp = await fetchConToken( 'events' );
            const body = await resp.json();

            // Almacenamos los eventos en una variable, tras pasarlos por el helper
            const events = prepareEvents( body.eventos );

            // Hacemos el dispatch de los eventos recibidos para cargar en el store
            disptach( eventLoaded( events ) );
            
        } catch (error) {
            console.log(error);
        }
        
    }

}

// Acción para cargar los eventos en el store
const eventLoaded = ( events ) => ({

    type: types.eventLoaded,
    payload: events,
    
});

// Creamos una acción para borrar los eventos del store
export const eventLogout = () => ({ type: types.eventLogout });