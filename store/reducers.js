import { combineReducers } from 'redux'
import * as types from './types'

// USER REDUCER
const userReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case types.SET_CURRENT_USER:
        if (payload) {
            return payload
        } else {
            return state
        }
    case types.SET_LOGGED_IN_USER:
      return payload
    default:
      return state
  }
}

// COMBINED REDUCERS
const reducers = {
  user: userReducer
}

export default combineReducers(reducers)
