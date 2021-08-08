import {createStore,applyMiddleware} from 'redux'
import article_reducer from './reducer'
// import rootReducer from './combRedu'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
const initialState = {}

const middleware = [thunk]
const store = createStore(
    article_reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)
export default store