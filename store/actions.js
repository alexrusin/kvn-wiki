import * as types from './types'
import axios from 'axios'

export const setAuthenticatedUser = () => (dispatch) => {
    axios.get('/api/users/me')
        .then(response => {
            dispatch({
                type: types.SET_CURRENT_USER,
                payload: response.data,
            })
        })
        .catch(error => {
            dispatch({
                type: types.SET_CURRENT_USER,
                payload: {membership: "guest"},
            })
        });
}

