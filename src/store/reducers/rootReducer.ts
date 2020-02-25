import { combineReducers } from 'redux'
import quizReducer from '../reducers/quiz'
import creatorReducer from '../reducers/creator'

export default combineReducers({
   quiz: quizReducer,
   creator: creatorReducer
})
