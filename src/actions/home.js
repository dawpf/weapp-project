import { ADD, } from '../constants/home'

export const add = (num=3) => {
  return {
    type: ADD,num
  }
}
// 异步的action
export function asyncAdd () {
  return dispatch => {
    setTimeout(() => {
      dispatch(add())
    }, 2000)
  }
}
