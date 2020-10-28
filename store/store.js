import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createWrapper } from 'next-redux-wrapper'
import thunkMiddleware from 'redux-thunk'
import reducers from './reducers'

function initStore() {
  return createStore(
    reducers,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  )
}

export const wrapper = createWrapper(initStore)