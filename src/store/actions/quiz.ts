/* eslint-disable no-use-before-define */
import Axios from '@rest'
import Types from './actionTypes'
import { Dispatch } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { StateType } from '../reducers/quiz'
import { IQuizName, IQuizItem, ObjString } from '@/interfaces'
import { shuffle } from '@/helpers/shuffle'
import { QUESTION_DELAY } from '@/constants'

type ThunkTypeVoid = ThunkAction<Promise<void>, StateType, undefined, ActionsTypes>
type ThunkTypeObj = ThunkAction<Promise<object>, StateType, undefined, ActionsTypes>

type FetchStartType = { type: typeof Types.FETCH_START }
const fetchStart = (): FetchStartType => ({
   type: Types.FETCH_START
})

type FetchQuizListSuccessType = {
   type: typeof Types.FETCH_QUIZ_LIST_SUCCESS, quizList: Array<IQuizName> }
const fetchQuizListSuccess = (quizList: Array<IQuizName>): FetchQuizListSuccessType => ({
   type: Types.FETCH_QUIZ_LIST_SUCCESS,
   quizList
})

type FetchQuizSuccessType = {
   type: typeof Types.FETCH_QUIZ_SUCCESS, quiz: [] | Array<IQuizItem> }
const fetchQuizSuccess = (quiz: [] | Array<IQuizItem>): FetchQuizSuccessType => ({
   type: Types.FETCH_QUIZ_SUCCESS,
   quiz
})

type FetchErrorType = {
   type: typeof Types.FETCH_ERROR, error: object }
const fetchError = (err: object): FetchErrorType => ({
   type: Types.FETCH_ERROR,
   error: err
})

export const fetchQuizes = (): ThunkTypeObj => {
   return async (dispatch: Dispatch<ActionsTypes>): Promise<object> => {
      dispatch(fetchStart())
      try {
         const response = await Axios.get('quiz.json')
   
         if (response.status === 200) {
            const quizList: Array<IQuizName> = Object.entries(response.data).map(entry => {
               const [id, { name }] = entry
               return {
                  id,
                  name
               }
            })
      
            dispatch(fetchQuizListSuccess(quizList))
            return response
         }
      } catch (err) {
         dispatch(fetchError(err))
      }
   }
}

export const fetchQuiz = (id: string): ThunkTypeObj => {
   return async (dispatch: Dispatch<ActionsTypes>): Promise<object> => {
      dispatch(fetchStart())
      try {
         const response = await Axios.get(`quiz/${id}.json`)
   
         if (response.status === 200) {
            const quiz = shuffle(response.data.items)
         
            dispatch(fetchQuizSuccess(quiz))
            return response
         }
      } catch (err) {
         console.error(err)
      }
   }
}

type SetQuizNameType = { type: typeof Types.SET_QUIZ_NAME, name: string }
export const setQuizName = (name: string): SetQuizNameType => ({
   type: Types.SET_QUIZ_NAME,
   name
})

export const onAnswerClick = (id: number): ThunkTypeVoid => {
   return async (dispatch: Dispatch<ActionsTypes>, getState): Promise<void> => {
      const state: StateType = getState().quiz
   
      const timeout = window.setTimeout(() => {
         if (state.current + 1 === state.quiz.length) { // if quiz completed
            dispatch(showResults())
         } else {
            if (state.answerStatus) { // exclude bug if multiple clicks
               const key = Object.keys(state.answerStatus)[0]
               if (state.answerStatus[key] === 'correct') {
                  return
               }
            } else {
               dispatch(gotoNextQuestion(state.current + 1))
            }
         }
         window.clearTimeout(timeout)
      }, QUESTION_DELAY)
   
      // updating results
      const question: IQuizItem = state.quiz[state.current]
      if (question.correct === id) {
         dispatch(updateResults(
            { [id]: 'correct' },
            [...state.results, 'correct']
         ))
      } else {
         dispatch(updateResults(
            { [id]: 'incorrect' },
            [...state.results, 'incorrect']
         ))
      }
   }
}

type UpdateResultsType = {
   type: typeof Types.UPDATE_RESULTS,
   answerStatus: null | ObjString,
   results: Array<string> }
const updateResults = (answerStatus: null | ObjString, results: Array<string>): UpdateResultsType => ({
   type: Types.UPDATE_RESULTS,
   answerStatus,
   results
})

type GotoNextQuestionType = {
   type: typeof Types.GOTO_NEXT_QUESTION,
   current: number }
const gotoNextQuestion = (current: number): GotoNextQuestionType => ({
   type: Types.GOTO_NEXT_QUESTION,
   current
})

type ShowResultsType = { type: typeof Types.SHOW_RESULTS }
const showResults = (): ShowResultsType => ({
   type: Types.SHOW_RESULTS
})

type RestartQuizType = { type: typeof Types.RESTART_QUIZ }
export const restartQuiz = (): RestartQuizType => ({
   type: Types.RESTART_QUIZ
})

export type ActionsTypes = FetchStartType | FetchQuizListSuccessType | FetchQuizSuccessType |
                          FetchErrorType | SetQuizNameType | ShowResultsType | UpdateResultsType |
                          RestartQuizType | GotoNextQuestionType
