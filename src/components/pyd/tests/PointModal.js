import React, { useEffect, useState } from 'react'
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import Swal from 'sweetalert2'
import { useDispatch, useSelector } from 'react-redux';


import { uiCloseModal, uiClosePanelModal, uiClosePointModal } from '../../../actions/ui';
import { eventAddNew, eventClearActiveEvent, eventStartAddNew, eventStartUpdate, eventUpdated } from '../../../actions/events';
import { pointStartAddNew } from '../../../actions/points';


// Copiado de la web npm del package
// Style para el modal
const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      overflow              : 'auto',
      WebkitOverflowScrolling: 'touch',
    }
}

// Copiado de la web npm del package
// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
// Tenemos que pasarle el elemento de nuestro index.html, es el #root
Modal.setAppElement('#root')

// varialbe para tomar la fecha inicial de un evento
// tomando la hora actual con minutos y segundos en 0 y añadiendo una hora
const now = moment().minutes(0).seconds(0).add(1, 'hours');

// varialbe para poner la fecha final de un evento
const nowPlus1 = now.clone().add(1, 'hours');

const initPoint = {
    step: "",
    category: "",
    description: "",
    // units: "",
    // project: "",
    // client: "",
    // timestamp: "dkslfajsdlfdfkjasdf"
}

// TODO: Hacer las validaciones de los campos introducidos porque son obligatorios
// TODO: Incluir el timestamp
// TODO: Limpiar código

// Modal para el Point que vamos a crear
export const PointModal = () => {

    // Control de fechas por medio de useState
    const [dateStart, setDateStart] = useState( now.toDate() )
    const [dateEnd, setDateEnd] = useState( nowPlus1.toDate() )

    // Creamos un useState para el control de los datos del point
    const [formValues, setFormValues] = useState( initPoint );

    // useState para almacenar si el formulario es válido
    const [titleValid, setTitleValid] = useState( true );

    // Extraemos la información del formValues para usarlo en el modal
    // Extraemos el start y el end para hacer una validación
    const { step, category, description } = formValues;

    // Declaramos la variable dispatch para realizar nuestros dispatch
    const dispatch = useDispatch();

    // Extraemos el state.ui del Store y nos quedamos con el pointModalOpen
    const { pointModalOpen } = useSelector(state => state.ui)

    // Extraemos el state.calendar del Store y nos quedamos con el activeEvent
    const { activeEvent } = useSelector(state => state.calendar)

    // Creamos una función para cambiar el valor de una variable input
    const handleInputChange = ({ target }) => {

        // Le pasamos al useState la variable target, extraída del global de info del input
        // Será el title o el notes
        setFormValues({
            ...formValues,
            [target.name]: target.value,
        })

    }

    // Establecemos un useEffect para controlar cuando cambia el elemento activo y cargar sus datos en el modal
    useEffect(() => {

        // Hay un momento que es null, y no lo podemos cargar al useState correspondiente
        if ( activeEvent ) {
            setFormValues( activeEvent );
        } else {
            setFormValues( initPoint );
        }
               
    }, [activeEvent, setFormValues]); // Establecemos como dependencias lo que cambia dentro
    
    // Función que se disparará cuando se quiera cerrar el modal
    const   closeModal = () => {

        // Cerramos el modal poniendo la variable del store [ui] en false
        dispatch( uiClosePointModal() );

        // Limpiamos el evento activo del store
        dispatch( eventClearActiveEvent() );

        // Reestablecemos el formValues a su estado inicial
        // Así cuando se abra el modal estará limpio
        // setFormValues( initEvent );
        
    }

    // Función para el resultado del datepicker para la fecha y hora inicial
    const handleStartDateChange = ( e ) => {

        // Modificamos la fecha de inicio, controlada por el useState
        setDateStart( e );

        // Modificamos la fecha de inicio en el evento
        setFormValues({
            ...formValues,
            start: e
        });

    }

    // Función para el resultado del datepicker para la fecha y hora final
    const handleEndDateChange = ( e ) => {

        // Modificamos la fecha final, controlada por el useState
        setDateEnd( e );

        // Modificamos la fecha de final en el evento
        setFormValues({
            ...formValues,
            end: e
        });

    }

    // Función para guardar el formulario cuando se lance el submit
    const handleSubmitForm = ( e ) => {

        // Prevenimos la propagación del formulario
        e.preventDefault();

        console.log( formValues );

        // Transformarmos la fecha de inicio y fin en formato moment para hacer la validación
        // const momentStart = moment( start );
        // const momentEnd = moment( end );

        // Si la fecha final no es mayor que la incial lanzamos una alerta de Sweet Alert 2
        // if ( momentStart.isSameOrAfter( momentEnd) ) {
            
        //     return Swal.fire('Error', 'La fecha fin debe de ser mayor a la fecha de inicio', 'error');

        // }

        // Si el título no contiene al menos dos caracteres no lo validaremos
        // if ( name.trim().length < 2 ) {

        //     // ponemos la variale del useState en false
        //     return setTitleValid( false );

        // } 

        // Si tenemos un evento activo quiere decir que estamos editando, si es null es uno nuevo
        if ( activeEvent ) {

            // Hacemos el dispatch para actualizar el evento en el store
            dispatch( eventStartUpdate( formValues ));
            
        } else {

            //TODO: realizar grabación en DB
            
            // Hacemos el dispatch para añadir el nuevo evento al store
            // Usamos el operador spread para extraer todos los datos y poder añadir un id
            // dispatch( eventAddNew({
            //     ...formValues,
            //     id: new Date().getTime(),
            //     user: {
            //         _id: '123',
            //         name: 'Iván'
            //     }
            // }) )
            
            // Ahora la grabación la haremos haciendo el dispatch de una acción de inicio de grabación
            dispatch( pointStartAddNew( formValues ));

        }


        // Si el title es válido, ponemos el estado en true
        setTitleValid( true );

        // Si todo es válido, cerramos el modal
        closeModal();

    }
    
    return (

        <Modal
            isOpen={ pointModalOpen } // Muestra u oculta el modal
        //   onAfterOpen={ afterOpenModal }
            onRequestClose={ closeModal } // Se dispara cuando se quiere cerrar pinchando fuera de él
            style={ customStyles } // Style del modal que ya hemos creado/copiado
            closeTimeoutMS={ 2000 } // Tiempo para ocultarse
            className="modal"
            overlayClassName="modal-fondo"
        >

            {/* Código de puro html copiado del gishub del profesor */}
            <h1> { (activeEvent) ? activeEvent.title : 'Nuevo Punto de Inspección' } </h1>
            <hr />
            <form 
                className="container"
                onSubmit={ handleSubmitForm }
            >   
                <div className="form-group">
                    <label>Sección</label>
                    <input 
                        type="text" 
                        className={`form-control ${ !titleValid && 'is-invalid' } `} // Si el title no es válido, añadimos una classname para informar
                        placeholder="Sección a la que pertenece el punto"
                        name="step"
                        autoComplete="off"
                        value={ step }
                        onChange={ handleInputChange }
                    />
                    <small id="emailHelp" className="form-text text-muted">Introduce la sección</small>
                </div>

                <div className="form-group">
                    <label>Tipo</label>
                    <input 
                        type="text" 
                        className="form-control"
                        placeholder="Categoría del punto"
                        name="category"
                        autoComplete="off"
                        value={ category }
                        onChange={ handleInputChange }
                    />
                    <small id="emailHelp" className="form-text text-muted">Establece la categoría</small>
                </div>

                <div className="form-group">
                    <label>Descripción</label>
                    <input 
                        type="text" 
                        className="form-control"
                        placeholder="Texto del punto"
                        name="description"
                        autoComplete="off"
                        value={ description }
                        onChange={ handleInputChange }
                    />
                    <small id="emailHelp" className="form-text text-muted">Introduce la descripción</small>
                </div>

                {/* <div className="form-group">
                    <label>Proyecto</label>
                    <input 
                        type="text" 
                        className="form-control"
                        placeholder="Número del proyecto"
                        name="project"
                        autoComplete="off"
                        value={ project }
                        onChange={ handleInputChange }
                    />
                    <small id="emailHelp" className="form-text text-muted">Introduce el número del proyecto</small>
                </div>

                <div className="form-group">
                    <label>Cliente</label>
                    <input 
                        type="text" 
                        className="form-control"
                        placeholder="Cliente"
                        name="client"
                        autoComplete="off"
                        value={ client }
                        onChange={ handleInputChange }
                    />
                    <small id="emailHelp" className="form-text text-muted">Introduce el nombre del Cliente</small>
                </div>

                <div className="form-group">
                    <label>Unidades</label>
                    <input 
                        type="text" 
                        className="form-control"
                        placeholder="Unidades"
                        name="units"
                        autoComplete="off"
                        value={ units }
                        onChange={ handleInputChange }
                    />
                    <small id="emailHelp" className="form-text text-muted">Introduce el número de unidades</small>
                </div> */}

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>

        </Modal>
    )
}
