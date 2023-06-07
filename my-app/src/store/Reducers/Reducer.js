import ACTION_TYPES from "../Constans/ActionTypes"

const { WEATHER } = ACTION_TYPES

const defaultValue = {
    weather: [],
    error: null,
    loading: false
}

export function ReducerWeather(state = defaultValue, action) {
    switch (action.type) {
        case WEATHER.GET_WEATHER_START:
            return { ...state, loading: true }
        case WEATHER.GET_WEATHER_FAILED:
            return { ...state, error: action.payload, loading: false }
        case WEATHER.GET_WEATHER_SUCCESS:
            return { ...state, weather: action.payload, loading: false }
        default:
            return state;
    }
}