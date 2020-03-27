import Actions from '../actions/actionTypes'
import { ActionsTypes } from '../actions/creator'
import { IQuizItem } from '@/interfaces'

const initialState = {
   quiz: {
      name: '' as string,
      items: [] as [] | Array<IQuizItem>
   }
}
export type StateType = typeof initialState

export default function creatorReducer(state = initialState, action: ActionsTypes): StateType {
   switch (action.type) {
      case Actions.UPDATE_QUIZ:
         return {
            ...state,
            quiz: {
               name: action.name,
               items: [...state.quiz.items, action.item]
            }
         }
      case Actions.RESET_CREATOR:
         return {
            ...state,
            quiz: {
               name: '',
               items: []
            }
         }
      default:
         return state
   }
}
