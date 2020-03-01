import Axios from '@rest'
import Types from './actionTypes'
import { Dispatch } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { StateType } from '../reducers/creator'

type UpdateQuizType = {
   type: typeof Types.UPDATE_QUIZ,
   item: object,
   name: string
}
export const updateQuiz = (item: object, name: string): UpdateQuizType => ({
   type: Types.UPDATE_QUIZ,
   item,
   name
})

type ResetCreatorType = { type: typeof Types.RESET_CREATOR }
const resetCreator = (): ResetCreatorType => ({
   type: Types.RESET_CREATOR
})

type ThunkType = ThunkAction<Promise<object>, StateType, undefined, ActionsTypes>
export const uploadQuiz = (): ThunkType => {
   return async(dispatch: Dispatch<ActionsTypes>, getState): Promise<object> => {
      try {
         const response = await Axios.post('quiz.json', getState().creator.quiz)
         if (response.statusText === 'OK') {
            dispatch(resetCreator())
         }
         return response
      } catch (err) {
         console.error(err)
      }
   }
}

export type ActionsTypes = ResetCreatorType | UpdateQuizType
