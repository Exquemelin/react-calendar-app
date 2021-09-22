import { combineReducers } from "redux";


import { uiReducer } from "./uiReducer";
import { calendarReducer } from "./calendarReducer";
import { authReducer } from "./authReducer";
import { panelReducer } from "./panelReducer";
import { pointReducer } from "./pointReducer";
import { fatReducer } from "./fatReducer";


// Combinamos los reducers en uno solo para utilizar Redux
export const rootReducer = combineReducers({
    ui: uiReducer,
    calendar: calendarReducer,
    auth: authReducer,
    panel: panelReducer,
    point: pointReducer,
    fat: fatReducer,
})

