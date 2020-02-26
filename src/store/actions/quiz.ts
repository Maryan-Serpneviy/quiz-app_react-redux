/* eslint-disable no-use-before-define */
import Axios from '@rest'
import Types from './actionTypes'
import { shuffle } from '@/helpers/shuffle'
import { QUESTION_DELAY } from '@/constants'

const fetchStart = () => ({
   type: Types.FETCH_START
})

const fetchQuizListSuccess = (quizList: object[]) => ({
   type: Types.FETCH_QUIZ_LIST_SUCCESS,
   quizList
})

const fetchQuizSuccess = (quiz: object) => ({
   type: Types.FETCH_QUIZ_SUCCESS,
   quiz
})

const fetchError = (err: object) => ({
   type: Types.FETCH_ERROR,
   error: err
})

export const fetchQuizes = () => async(dispatch: any): Promise<object> => {
   dispatch(fetchStart())
   try {
      const response = await Axios.get('quiz.json')

      if (response.status === 200) {
         const quizList = Object.entries(response.data).map(entry => {
            const [id, data] = entry
            return {
               id,
               name: data.name
            }
         })
   
         dispatch(fetchQuizListSuccess(quizList))
         return response
      }
   } catch (err) {
      dispatch(fetchError(err))
   }
}

export const fetchQuiz = (id: string) => async(dispatch: any): Promise<object> => {
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

export const onAnswerClick = (id: number) => (dispatch, getState): void => {
   const state = getState().quiz

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
   const question = state.quiz[state.current]
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

const updateResults = (answerStatus: object, results: any[]) => ({
   type: Types.UPDATE_RESULTS,
   answerStatus,
   results
})

const gotoNextQuestion = (current: number) => ({
   type: Types.GOTO_NEXT_QUESTION,
   current
})

const showResults = () => ({
   type: Types.SHOW_RESULTS
})

export const restartQuiz = () => ({
   type: Types.RESTART_QUIZ
})
