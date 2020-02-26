import Types from './actionTypes'
import Axios from '@rest'

export const updateQuiz = (item: object, name: string) => ({
   type: Types.UPDATE_QUIZ,
   item,
   name
})

const resetCreator = () => ({
   type: Types.RESET_CREATOR
})

export const uploadQuiz = () => async(dispatch, getState): Promise<object> => {
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
