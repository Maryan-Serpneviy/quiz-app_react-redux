import Actions from '../actions/actionTypes'
import { ActionsTypes } from '../actions/auth'

const initialState = {
   token: null as string | null
}
export type StateType = typeof initialState

export default function authReducer(state = initialState, action: ActionsTypes): StateType {
   switch (action.type) {
      case Actions.AUTH_SUCCESS:
         return {
            ...state,
            token: action.token
         }
      case Actions.AUTH_SIGN_OUT:
         return {
            ...state,
            token: null
         }
      default:
         return state
   }
}
