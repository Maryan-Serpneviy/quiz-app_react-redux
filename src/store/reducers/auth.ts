import Actions from '../actions/actionTypes'

const initialState: State = {
   token: null
}

interface State {
   token: null | string
}

interface Action extends State {
   type: string
}

export default function authReducer(state: State = initialState, action: Action): State {
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
