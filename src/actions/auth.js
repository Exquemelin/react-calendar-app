import Swal from "sweetalert2";


import { fetchConToken, fetchSinToken } from "../helpers/fetch"
import { types } from "../types/types";
import { eventLogout } from "./events";


// Definimos la acción para hacer el login
export const startLogin = ( email, password ) => {

    // Hacemos un return para que sea una funcion asíncrona
    return async ( dispatch ) => {

        // console.log(email, password);
        
        // Hacemos una petición de fechtSinToken pasándole todos los datos que necesita
        // Y almacenamos la respuesta en una variable
        const resp = await fetchSinToken( 'auth', { email, password }, 'POST' );
        const body = await resp.json();

        console.log(body);

        // Si la respuesta nos devuelve un OK true, es que todo ha ido bien. Lo almacenamos en el localstorage
        if( body.ok ) {

            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime() );

            // Hacemos el dispatch de la acción
            dispatch( login({
                uid: body.uid,
                name: body.name,
            }) );

        } else {

            // Si hay algún problema con la autenticación devolvemos un error
            // En el cuerpo ponemos el body.msg, que nos viene del backend
            Swal.fire('Error', body.msg, 'error');

        }

    }

}

// Definimos la acción para hacer el register
export const startRegister = ( email, password, name ) => {

    return async ( dispatch ) => {

        // Hacemos una petición de fechtSinToken pasándole todos los datos que necesita
        // Y almacenamos la respuesta en una variable
        const resp = await fetchSinToken( 'auth/new', { email, password, name }, 'POST' );
        const body = await resp.json();

        console.log(body);

        // Si la respuesta nos devuelve un OK true, es que todo ha ido bien. Lo almacenamos en el localstorage
        if( body.ok ) {

            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime() );

            // Hacemos el dispatch de la acción
            dispatch( login({
                uid: body.uid,
                name: body.name,
            }) );

        } else {

            // Si hay algún problema con la autenticación devolvemos un error
            // En el cuerpo ponemos el body.msg, que nos viene del backend
            Swal.fire('Error', body.msg, 'error');

        }

    } 

}

// Con esta acción haremos la comprobación de si el token es válido o no
export const startChecking = () => {

    return async ( dispatch ) => {

        // Hacemos una petición de fetchConToken y en este caso no necesitamos pasarle ningún dato
        // Renovamos el token y  almacenamos la respuesta en una variable
        const resp = await fetchConToken( 'auth/renew' );
        const body = await resp.json();

        console.log('start checking');

        console.log(body);

        // Si la respuesta nos devuelve un OK true, es que todo ha ido bien. Lo almacenamos en el localstorage
        if( body.ok ) {

            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime() );

            // Hacemos el dispatch de la acción
            dispatch( login({
                uid: body.uid,
                name: body.name,
            }) );

        } else {

            //Si hubo algún error, o el token no es válido lanzamos la acción de finalizar el checking
            dispatch( checkingFinish() );

        }
    }
}

// Creamos una acción para finalizar el checking del token
const checkingFinish = ( user ) => ({ type: types.authCheckingFinish, });

// Creamos una acción directamente, y la ponemos entre paréntesis para exportarla
const login = ( user ) => ({

    type: types.authLogin,
    payload: user
    
});

// Creamos la función para hacer el logout del calendario
export const startLogout = () => {

    return ( dispatch ) => {

        // Borramos la información del localstorage
        localStorage.clear();

        // Hacemos el dispatch de la acción que borrará los datos de eventos del store
        dispatch( eventLogout() );

        // Hacemos el disptach de la acción que borrará los datos del store
        dispatch( logout() );

    }

}

// Creamos una acción para borrar los datos del storage
const logout = () => ({ type: types.authStartLogout });