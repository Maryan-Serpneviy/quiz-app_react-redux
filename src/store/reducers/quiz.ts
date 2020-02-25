import Actions from '../actions/actionTypes'

const initialState: State = {
   quizList: [],
   isLoading: false,
   error: null,

   quiz: [],
   current: 0,
   answerStatus: null,
   completed: false,
   results: []
}

interface State {
   quizList: object[]
   isLoading: boolean
   error: null | object

   quiz: object[]
   current: number
   answerStatus: null | object
   completed: boolean
   results: object[]
}

export interface Action extends State {
   type: string
}

export default function quizReducer(state: object = initialState, action: Action): object {
   switch (action.type) {
      case Actions.FETCH_START:
         return {
            ...state,
            isLoading: true
         }
      case Actions.FETCH_QUIZ_LIST_SUCCESS:
         return {
            ...state,
            quizList: action.quizList,
            isLoading: false
         }
      case Actions.FETCH_QUIZ_SUCCESS:
         return {
            ...state,
            quiz: action.quiz,
            isLoading: false
         }
      case Actions.FETCH_ERROR:
         return {
            ...state,
            quizList: [],
            isLoading: false,
            error: action.error
         }
      case Actions.UPDATE_RESULTS:
         return {
            ...state,
            answerStatus: action.answerStatus,
            results: action.results
         }
      case Actions.GOTO_NEXT_QUESTION:
         return {
            ...state,
            answerStatus: null,
            current: action.current
         }
      case Actions.SHOW_RESULTS:
         return {
            ...state,
            completed: true
         }
      case Actions.RESTART_QUIZ:
         return {
            ...state,
            current: 0,
            answerStatus: null,
            completed: false,
            results: []
         }
      default:
         return state
   }
}
