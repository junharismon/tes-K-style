import ACTION_TYPES from "../Constans/ActionTypes";

const BASE_URL = "https://api.openweathermap.org/data/2.5/forecast?lat=-6.302287708604747&lon=106.6541003450607&appid=f522b356070cd906504e0c5cde41e58e"
const { WEATHER } = ACTION_TYPES

export const getAllWeather = () => async (dispatch) => {
    try {
        dispatch({ type: WEATHER.GET_WEATHER_START })
        const response = await fetch(BASE_URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (!response.ok) {
            throw new Error('Internal server error')
        }

        const data = await response.json()
        dispatch({
            type: WEATHER.GET_WEATHER_SUCCESS,
            payload: data
        })
        return data
    } catch (error) {
        console.log('error get data', error);
        dispatch({
            type: WEATHER.GET_WEATHER_FAILED,
            payload: error
        })
    }
}