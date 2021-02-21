import React from 'react'
import { useDispatch } from 'react-redux';


import { eventDelete } from '../../actions/events';


export const DeleteEventFab = () => {

    // Declaramos el dispatch para lanzar acciones
    const dispatch = useDispatch();

    // Función disparada por el botón
    const handleFAB = () =>{

        // Hacemos el dispatch de la acción de borrado del evento
        dispatch( eventDelete() );
    }

    return (
        <button
            className="btn btn-danger fab-danger"
            onClick={ handleFAB }
        >
            <i className="fas fa-trash"></i>
            <span> Borrar evento </span>
        </button>
    )
}
