import Axios from '@rest'
import * as TYPE from './actionTypes'

const fetchStart = () => ({
   type: TYPE.FETCH_START
})

const fetchSuccess = (quizList: object[]) => ({
   type: TYPE.FETCH_SUCCESS,
   quizList
})

const fetchError = (err: object) => ({
   type: TYPE.FETCH_ERROR,
   error: err
})

export const fetchQuizes = () => {
   return async dispatch => {
      dispatch(fetchStart())
      try {
         const response = await Axios.get('quiz.json')
         const quizList = Object.entries(response.data).map(entry => {
            const [id, data] = entry
            return {
               id,
               name: data.name
            }
         })
         dispatch(fetchSuccess(quizList))
      } catch (err) {
         dispatch(fetchError(err))
      }
   }
}
