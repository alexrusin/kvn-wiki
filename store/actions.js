import * as types from './types'
import axios from 'axios'

export const setAuthenticatedUser = () => (dispatch) => {
  axios.get('/api/users/me')
    .then(response => {
      dispatch({
        type: types.SET_CURRENT_USER,
        payload: response.data.user
      })
    })
    .catch(error => {
      dispatch({
        type: types.SET_CURRENT_USER,
        payload: { membership: 'guest' }
      })
    })
}

export const setLoggedInUser = (payload) => ({ type: types.SET_LOGGED_IN_USER, payload })
