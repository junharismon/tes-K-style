import { legacy_createStore as createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { ReducerWeather } from "./Reducers/Reducer";
const rootReducer = combineReducers({
    ReducerWeather,
})

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store