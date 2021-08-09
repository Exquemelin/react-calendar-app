import { useState } from "react"

export const useForm = ( initialState = {} ) => {
    
    // Creamos el setState para almacenar las variables, con el estado inicial que entre por la llamada
    const [values, setValues] = useState(initialState);

    // Con este reset vamos a resetear los cambios
    const reset = () => {
        setValues(initialState)
    }

    // Creamos una función que nos vaya modificamos los archivos como los tenemos
    const handleInputChange = ( { target } ) => {

        setValues({
            ...values,
            [ target.name ]: target.value
        });

    };

    // Retornamos los valores y la función que los modifica
    return [ values, handleInputChange, reset ];



}