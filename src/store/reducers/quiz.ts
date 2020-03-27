import Actions from '../actions/actionTypes'
import { ActionsTypes } from '../actions/quiz'
import { IQuizName, IQuizItem, ObjString } from '@/interfaces'

const initialState = {
   // List
   isLoading: false as boolean,
   quizList: [] as [] | Array<IQuizName>,
   error: null as null | object,
   // Quiz
   quizName: null as null | string,
   quiz: [] as [] | Array<IQuizItem>,
   current: 0 as number,
   answerStatus: null as null | ObjString,
   completed: false as boolean,
   results: [] as [] | Array<string>,
   time: 0 as number
}
export type StateType = typeof initialState

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
      case Actions.SET_QUIZ_NAME:
         return {
            ...state,
            quizName: action.quizName
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
      case Actions.SET_QUIZ_TIME:
         return {
            ...state,
            time: action.time
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
