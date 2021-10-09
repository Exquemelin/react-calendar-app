import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'


import { fetchAsana } from '../../../helpers/fetch'
import { Navbar } from '../../ui/Navbar'


// Creamos un proyecto inicial para ir añadiendo los datos
const initProject = {
    number: "",
    client: "",
    description: "",
    engineering: false,
    workshop: false,
    // owner: "",
    // team: "",
    // sections: [
    //     {
    //         name: "",
    //         tasks: [
    //             {
    //                 assignee: null,
    //                 followers: [],
    //                 name: "",
    //                 notes: "",
    //                 workspace: '1143339169851116'
    //             }
    //         ]
    //     }
    // ]
}

export const ProjectScreen = () => {

    // Creamos un useState para el control de los datos introducidos por pantalla
    const [formValues, setformValues] = useState( initProject )
    
    // Desestructuramos el formValues para usar sus variables
    const { number, client, description, engineering, workshop } = formValues
    
    // Definimos la función que lanzaremos al pular el botón lanzar
    const handleLaunch = () => {

        console.log('LANZAR')

        fetchAsana();

    }

    // Creamos una función para cambiar el valor de una variable input
    const handleInputChange = ({ target }) =>{

        const value = target.type === 'checkbox' ? target.checked : target. value;

        // Le pasamos al useState la variable target, extraída del global de info del input
        // Será el que sea
        setformValues({
            ...formValues,
            [target.name]: value
        })

    }

    // Función para guardar el formulario cuando se lance el submit
    const handleSubmitForm = ( e ) => {

        // Prevenimos la propagación del formulario
        e.preventDefault();

        // Hacemos la petición al fetch para crear el proyecto y le pasamos la información
        fetchAsana( formValues );
        
    }


    return (

        <div>

            <Navbar />

            <h1> LANZAMIENTO DE PROYECTO </h1>

            <form
                className="container"
                onSubmit={ handleSubmitForm }
            >
                <div className="form-group">
                    <label>Número</label>
                    <input 
                        type="text" 
                        // className={`form-control ${ !titleValid && 'is-invalid' } `} // Si el title no es válido, añadimos una classname para informar
                        className="form-control"
                        placeholder="POAANNN"
                        name="number"
                        autoComplete="off"
                        value={ number }
                        onChange={ handleInputChange }
                    />
                    <small id="emailHelp" className="form-text text-muted">Introduce el número de proyecto</small>
                </div>
                <div className="form-group">
                    <label>Cliente</label>
                    <input 
                        type="text" 
                        // className={`form-control ${ !titleValid && 'is-invalid' } `} // Si el title no es válido, añadimos una classname para informar
                        className="form-control"
                        placeholder="Cliente"
                        name="client"
                        autoComplete="off"
                        value={ client }
                        onChange={ handleInputChange }
                    />
                    <small id="emailHelp" className="form-text text-muted">Introduce el nombre del cliente</small>
                </div>
                <div className="form-group">
                    <label>Descripción</label>
                    <input 
                        type="text" 
                        // className={`form-control ${ !titleValid && 'is-invalid' } `} // Si el title no es válido, añadimos una classname para informar
                        className="form-control"
                        placeholder="Descripción del proyecto"
                        name="description"
                        autoComplete="off"
                        value={ description }
                        onChange={ handleInputChange }
                    />
                    <small id="emailHelp" className="form-text text-muted">Introduce una breve descripción del proyecto</small>
                </div>
                    <h2>DISEÑO</h2>
                <div className="form-group">
                    <label className="row">
                        <h3>Ingeniería</h3>
                    <input 
                        type="checkbox" 
                        // className={`form-control ${ !titleValid && 'is-invalid' } `} // Si el title no es válido, añadimos una classname para informar
                        className="form-control"
                        // placeholder="Descripción del proyecto"
                        name="engineering"
                        // autoComplete="off"
                        checked={ engineering }
                        onChange={ handleInputChange }
                        />
                    {/* <small id="emailHelp" className="form-text text-muted">Introduce una breve descripción del proyecto</small> */}
                        
                    </label>
                </div>
                <div className="form-group">
                    <label className="row">
                        <h3>Taller</h3>
                    <input 
                        type="checkbox" 
                        // className={`form-control ${ !titleValid && 'is-invalid' } `} // Si el title no es válido, añadimos una classname para informar
                        className="form-control"
                        // placeholder="Descripción del proyecto"
                        name="workshop"
                        // autoComplete="off"
                        checked={ workshop }
                        onChange={ handleInputChange }
                        />
                    {/* <small id="emailHelp" className="form-text text-muted">Introduce una breve descripción del proyecto</small> */}
                        
                    </label>
                </div>
                {
                    ( workshop )
                        ? ( <div><h4>Hay cuadros</h4></div>)
                        : ( "" )
                }
                <button 
                    className="btn btn-primary pyd-button"
                    type="submit"
                    // onClick={ handleLaunch }
                >
                    <h3>Lanzar Proyecto</h3>
                </button>
            </form>



        </div>
    )

}
