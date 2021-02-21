import { combineReducers } from "redux";
import { calendarReducer } from "./calendarReducer";


import { uiReducer } from "./uiReducer";


// Combinamos los reducers en uno solo para utilizar Redux
export const rootReducer = combineReducers({
    ui: uiReducer,
    calendar: calendarReducer,
    // TODO: AuthReducer
})

