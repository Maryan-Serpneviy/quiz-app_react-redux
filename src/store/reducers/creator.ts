import Actions from '../actions/actionTypes'

const initialState: State = {
   quiz: {
      name: '',
      items: []
   }
}

interface State {
   quiz: {
      name: string
      items: object[]
   }
}

interface Action extends State {
   type: string
   name: string
   item: object
}

export default function creatorReducer(state: State = initialState, action: Action): State {
   switch (action.type) {
      case Actions.UPDATE_QUIZ:
         return {
            ...state,
            quiz: {
               name: action.name,
               items: [...state.quiz.items, action.item]
            }
         }
      case 'RESET_CREATOR':
         return {
            ...state,
            quiz: {
               items: []
            }
         }
      default:
         return state
   }
}
