// ============================================
//   Pantalla copiada del github del profesor
// ============================================

import React from 'react';
import { useDispatch } from 'react-redux';
import './login.css';
import Swal from 'sweetalert2';


import { useForm } from "../../hooks/useForm";
import { startLogin, startRegister } from '../../actions/auth';


export const LoginScreen = () => {

    // Declaramos la variable dispatch para lanzar las acciones al store
    const dispatch = useDispatch();

    // Esta variable la utilizaremos en nuestro custom hook useForm.js, pero el initialState lo establecemos directamente
    const [ formLoginValues, handleLoginInputChange ] = useForm ({ 

        lEmail: 'exquemelin@gmail.com',
        lPassword: '123456',

    });

    // Variable para manejar el registro de un usuario
    // Esta variable la utilizaremos en nuestro custom hook useForm.js, pero el initialState lo establecemos directamente
    const [ formRegisterValues, handleRegisterInputChange ] = useForm ({ 

        rName: 'Iván',
        rEmail: 'exquemelin@gmail.com',
        rPassword1: '123456',
        rPasswrod2: '123456',

    });

    // Desestructuramos las variables del registro.
    const { rName, rEmail, rPassword1, rPasswrod2 } = formRegisterValues;

    // Extraemos las variables del state del login
    const { lEmail, lPassword } = formLoginValues;

    // Definimos el método para hacer el login con los datos introducidos en el formulario
    const handleLogin = ( e ) => {

        e.preventDefault();

        // Hacemos el dispatch de la acción para empezar a hacer el login
        dispatch( startLogin( lEmail, lPassword ) );

    }

    // Definimos el método para hacer el registro con los datos introducidos en el formulario
    const handleRegister = ( e ) => {

        e.preventDefault();

        // Vamos a coprobar si los dos password son iguales, y lanzamos un error
        if ( rPassword1 !== rPasswrod2 ) {

            //Al no serlo lanzamos la alerta.
            Swal.fire('Error', 'Las contraseñas deben ser iguales', 'error' );

        }

        // Hacemos el dispatch de la acción para empezar a hacer el login
        dispatch( startRegister( rEmail, rPassword1, rName ) );

    }



    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={ handleLogin }>
                        <div className="form-group">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name="lEmail"
                                value={ lEmail }
                                onChange={ handleLoginInputChange }
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name="lPassword"
                                value={ lPassword }
                                onChange={ handleLoginInputChange }
                            />
                        </div>
                        <div className="form-group">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={ handleRegister }>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name="rName"
                                value={ rName }
                                onChange={ handleRegisterInputChange } 
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                name="rEmail"
                                value={ rEmail }
                                onChange={ handleRegisterInputChange } 
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña" 
                                name="rPassword1"
                                value={ rPassword1 }
                                onChange={ handleRegisterInputChange } 
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña" 
                                name="rPasswrod2"
                                value={ rPasswrod2 }
                                onChange={ handleRegisterInputChange } 
                            />
                        </div>

                        <div className="form-group">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}