

// Tomamos la url base del enviroment
const baseUrl = process.env.REACT_APP_API_URL


// Creamos un fecth en el que no vamos a usar el token
// Va a recibir el argumento, por ejemplo '/auth', que será el endpoint
// Luego va la data, y por úlitmo el método, que si no viene usaremos el GET por defecto
const fetchSinToken = ( endpoint, data, method = 'GET' ) => {

    // Montamos la url completa y la pasamos a una variable
    const url = `${ baseUrl }/${ endpoint }`; // localhost:4010/api/

    // Si el método es un GET lo lanzamos directamente
    if ( method === 'GET' ) {

        return fetch( url );

    } else {

        // Si no es un GET, tendremos que pasarle más configuraciones
        return fetch( url, {
            method,
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify( data ),
        });

    }

}

// Creamos una función para hacer el fecth, pero esta vez con token
const fetchConToken = ( endpoint, data, method = 'GET' ) => {

    // Montamos la url completa y la pasamos a una variable
    const url = `${ baseUrl }/${ endpoint }`; // localhost:4010/api/

    // Obtenemos el token del local storage para comprobar si es válido
    // Si viniese un null, ponemos las '' para mandar un string vacío por defecto y evitar el null
    const token = localStorage.getItem('token') || '';

    // Si el método es un GET lo lanzamos añadiendo los headers
    if ( method === 'GET' ) {

        return fetch( url, {
            method,
            headers: {
                'x-token': token,
            }
        } );

    } else {

        // Si no es un GET, tendremos que pasarle más configuraciones
        return fetch( url, {
            method,
            headers: {
                'Content-type': 'application/json',
                'x-token': token,
            },
            body: JSON.stringify( data ),
        });

    }

}

// Exportamos las funciones
export {
    fetchSinToken,
    fetchConToken
}