import * as TYPE from '../actions/actionTypes'

const initialState = {
   quizList: [],
   isLoading: false,
   error: null
}

export default function quizReducer(state: object = initialState, action: object): object {
   switch (action.type) {
      case TYPE.FETCH_START:
         return {
            ...state,
            isLoading: true
         }
      case TYPE.FETCH_SUCCESS:
         return {
            ...state,
            quizList: action.quizList,
            isLoading: false
         }
      case TYPE.FETCH_ERROR:
         return {
            ...state,
            quizList: [],
            isLoading: false,
            error: action.error
         }
      default:
         return state
   }
}
