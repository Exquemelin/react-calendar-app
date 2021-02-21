import React from 'react'
import { useDispatch } from 'react-redux'


import { uiOpenModal } from '../../actions/ui'
import { eventClearActiveEvent } from '../../actions/events'


// Creamos un Floting Action Button, con una clase fab personalizada
// Y llevará un icono 
export const AddNewFab = () => {

    // Creamos una variable dispatch para modificar el store
    const dispatch = useDispatch()

    // Creamos una función que se disparará cuando se habla click en el button
    const handleFAB = () => {

        // Hacemos el dispatch para limpiar el elemento activo para que abra el modal vacío
        dispatch( eventClearActiveEvent() );

        // Hacemos el dispatch para activar el modal
        dispatch( uiOpenModal() );

    }

    return (
        <div
            className="btn btn-primary fab"
            onClick={ handleFAB }
        >
            <i className="fas fa-plus"></i>
        </div>
    )
}

