import moment from 'moment'


import { types } from '../types/types';


// Creamos un initalState con un array que serán los eventos, y un objeto que será el evento activo
const initialState = {

    events: [{
            id: new Date().getTime(),
            title: 'Cumpleaños del jefe',
            start: moment().toDate(), // new Date() obtenemos la fecha actual
            end: moment().add(2, 'hours').toDate(),
            bgcolor: '#fafafa',
            notes: 'Comprar el pastel',
            user: {
                _id: '1234',
                name: 'Iván',
            }
    }],
    activeEvent: null,


}


// Creamos el reducer
export const calendarReducer = ( state = initialState, action ) =>{


    switch (action.type) {

        case types.eventSetActive:
            
            // Modificamos el activeEvent en el store
            return {
                ...state,
                activeEvent: action.payload,
            };

        case types.eventAddNew:

            console.log('Nuevo evento')

            // Modificamos el array de eventos en el store
            return {
                ...state,
                events: [
                    ...state.events,
                    action.payload,
                ]
            }

        case types.eventClearActiveEvent:

            // Limpiamos el evento activo devolviendo un null
            return {
                ...state,
                activeEvent: null,
            }

        case types.eventUpdate:

            // Actualizamos un evento del listado
            return {
                ...state,
                events: state.events.map(
                    // Por cada evento comprobamos si su id coincide con el que nos llega en el payload
                    // Si es el mismo, se actualiza, en caso contrario se toma el existente
                    e => ( e.id === action.payload.id ) ? action.payload : e
                )
            }

        case types.eventDelete:

            // Eliminamos el evento activo
            return {
                ...state,
                events: state.events.filter(
                    // Filtramos el array devolviendo aquellos eventos que su id no coincide con el activo
                    e => ( e.id !== state.activeEvent.id )
                ),
                activeEvent: null,
            }
    
        default:

            // Por defecto devolvemos el state
            return state;

    }

}