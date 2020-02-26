import { combineReducers } from 'redux'
import quizReducer from '../reducers/quiz'
import creatorReducer from '../reducers/creator'
import authReducer from '../reducers/auth'

export default combineReducers({
   quiz: quizReducer,
   creator: creatorReducer,
   auth: authReducer
})
