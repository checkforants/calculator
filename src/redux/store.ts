import { createStore } from 'redux'
import {PayloadAction} from '@reduxjs/toolkit'

function counterReducer(state = { value: 0 }, action: PayloadAction) {
  switch (action.type) {
    case 'counter/incremented':
      return { value: state.value + 1 }
    case 'counter/decremented':
      return { value: state.value - 1 }
    default:
      return state
  }
}

export const store = createStore(counterReducer);
store.subscribe(() => console.log(store.getState()))

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

