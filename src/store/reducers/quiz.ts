import Actions from '../actions/actionTypes'
import { ActionsTypes } from '../actions/quiz'

const initialState = {
   // List
   isLoading: false as boolean,
   quizList: [] as [] | object[],
   error: null as null | object,
   // Quiz
   quiz: [] as [] | object[],
   current: 0 as number,
   answerStatus: null as null | object,
   completed: false as boolean,
   results: [] as [] | object[]
}

export type QuestionType = {
   question: string
   answers: Array<AnswerType>
   current: number
}

type AnswerType = {
   id: number
   text: string
}

type StateType = typeof initialState

export default function quizReducer(state = initialState, action: ActionsTypes): StateType {
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
