import { combineReducers, createStore } from "redux";
import { configureStore, PayloadAction } from "@reduxjs/toolkit";
import { composeWithDevTools } from "redux-devtools-extension";
import { displayReducer } from "./reducers/calculatorReducer";

export const initialColumnsData = {
  elementsDescription: {
    el1: { id: "el1", content: "123" },
    el2: { id: "el2", content: "223" },
    el3: { id: "el3", content: "323" },
    el4: { id: "el4", content: "423" },
  },
  columns: {
    elements: ["el1", "el2", "el3", "el4"],
    canvas: [],
  },
  columnOrder: ["column1", "column2"],
};
function columnsReducer(state = initialColumnsData, action: any) {
  switch (action.type) {
    case "REORDER_COLUMNS":
      console.log({ ...state, columns: action.payload });
      return { ...state, columns: action.payload };
    default:
      return state;
  }
}


export const isRuntimeModeInitialValue = true;
function modeReducer(state: boolean = isRuntimeModeInitialValue, action: any) {
  switch (action.type) {
    case "SWITCH":
      return !state;
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  columns: columnsReducer,
  display: displayReducer,
  mode: modeReducer,
});
export const store = createStore(rootReducer, composeWithDevTools());
store.subscribe(() => console.log(store.getState()));

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
