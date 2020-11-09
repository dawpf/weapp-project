import { ADD } from '../../constants/home'

const INITIAL_STATE = {
  num: 0
}

export default function counter (state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD:
      return {
        ...state,
        num: state.num + action.num
      }
     default:
       return state
  }
}
