import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";


import { rootReducer } from "../reducers/rootReducer";

// ==============================================================
//      Hay que usar el store en un nivel alto de la app, en CalendarApp.js
// ==============================================================

// función copiada de redux-devtools-extension
// https://github.com/zalmoxisus/redux-devtools-extension
// Hay que importar el compose de redux
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

// Creamos el store de Redux
// Le decimos el middleware que vamos a utilizar, que es Thunk
export const store = createStore(
    rootReducer,
    composeEnhancers(
        applyMiddleware( thunk )
    )
)