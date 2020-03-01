import Actions from '../actions/actionTypes'
import { ActionsTypes } from '../actions/creator'

const initialState: StateType = {
   quiz: {
      name: '',
      items: []
   }
}

export type StateType = {
   quiz: {
      name: string,
      items: object[]
   }
}

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
