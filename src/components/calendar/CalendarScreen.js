import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';


import { Navbar } from '../ui/Navbar';
import { messages } from '../../helpers/calendar-messages-es';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { uiOpenModal } from '../../actions/ui';
import { eventClearActiveEvent, eventSetActive, eventStartLoading } from '../../actions/events';
import { AddNewFab } from '../ui/AddNewFab';


// Importaciones de moment para pasar la configuración del idioma a español
import 'moment/locale/es';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import { DeleteEventFab } from '../ui/DeleteEventFab';
import { useEffect } from 'react';


// Le decimos a moment el idioma a utilizar
moment.locale('es');

// constante copiada de la documentación de big calendar, pero haciendo desestructuración de la importación del package
const localizer = momentLocalizer(moment); // or globalizeLocalizer

// // Array con los eventos. En este caso uno creado a mano
// // Tiene algunos datos que son obligatorios title, start y end
// const events = [{
//     title: 'Cumpleaños del jefe',
//     start: moment().toDate(), // new Date() obtenemos la fecha actual
//     end: moment().add(2, 'hours').toDate(),
//     bgcolor: '#fafafa',
//     notes: 'Comprar el pastel',
//     user: {
//         _id: '1234',
//         name: 'Iván',
//     }
// }];

export const CalendarScreen = () => {
    
    // Declaramos la variable dispatch para lanzar las acciones al store
    const dispatch = useDispatch();

    // hacemos un useState para controlar la vista en la que nos encontramos
    // Si no hay nada en el localStorage, le decimos que tome 'month' como defecto
    const [lastView, setlastView] = useState( localStorage.getItem('lastView') || 'month' );

    // Obtenemos del store todos los eventos que tenemos
    // Obtenemos el activeEvent
    const { events, activeEvent } = useSelector(state => state.calendar);

    // Obtenemos la información del usuario del store
    const { uid } = useSelector( state => state.auth );

    // Utilizamos el useEffect para ver cuando se carga el calendario y solicitar los eventos a la dB
    useEffect(() => {
        
        // Hacemos el dispatch de la carga de los eventos
        dispatch( eventStartLoading() );
        
    }, [ dispatch ]);

    // Función que se lanzará cuando se haga doble click sobre un evento
    const onDoubleClick = (e) => {

        // Tenemos que abrir el modal. Para ello cambiamos la variable del Store de [ui] en true
        dispatch( uiOpenModal() );

        console.log('Open Modal');
        
    };

    // Función que se lanzará cuando se haga un solo click sobre un evento
    const onSeletectEvent = (e) => {

        // Hacemos el dispatch del event para ponerlo en el store como evento activo
        dispatch( eventSetActive( e ) );
        
    };

    // Función que se lanzará cuando se cambie la vista
    const onViewChange = (e) => {

        // Pasamos la vista al State
        setlastView(e);

        // Almacenamos en el localStorage la última vista utilizada
        localStorage.setItem('lastView', e);
;
    }

    // Función que se dispara cuando hacemos click en cualquier punto del calendario
    const onSelecSlot = ( e ) => {

        // Hacemos el dispatch de la acción para limpiar el elemento activo
        dispatch( eventClearActiveEvent() );

    }

    // Función para establecer el estilo de los eventos en el calendario
    // Esta función se dispara con algunas propiedades
    const eventStyleGetter = ( event, start, end, isSelected ) => {

        // Creamos una variable con un estilo del tipo css
        const style = {
            backgroundColor: ( uid === event.user._id ) ? '#367CF7' : '#455660',
            borderRadius: '5px',
            opacity: 0.8,
            display: 'block',
            color: 'white'
        };
        
        // Devolvemos un objeto que llamaremos style con el estilo para el evento
        return {
            style
        };

    };
    
    return (
        <div className="calendar-screen">
            <Navbar />

            <Calendar
                localizer={ localizer }
                events={ events }
                startAccessor="start"
                endAccessor="end"
                messages={ messages }
                eventPropGetter={ eventStyleGetter } //Le pasamos la variables donde están los mensajes en español
                onDoubleClickEvent={ onDoubleClick }
                onSelectEvent={ onSeletectEvent }
                onView={ onViewChange }
                onSelectSlot={ onSelecSlot } // Función para eliminar el evento activo al tocar fuera del evento
                selectable={ true } // Tenemos que ponerlo en true para usar el onSelectSlot
                view={ lastView }
                components={{ // Le decimos el componente que queremos utilizar
                    event: CalendarEvent
                }}
            />

            {
                ( activeEvent ) && <DeleteEventFab /> 
            }

            <AddNewFab />

            <CalendarModal />

        </div>
    )
}
