import { UPDATE } from "./constants";
import { ADD } from "./constants";
import { SUBTRACT } from "./constants";
import { MULTIPLY } from "./constants";
import { DIVIDE } from "./constants";
import { CLEAR } from "./constants";
import { EQUAL } from "./constants";

/*actions below pass operation through to reducer, update has input to update the display field.
 others require no data to be passed. */

export const updateDisplay = (content: any) => ({
  type: UPDATE,
  payload: {
    input: content,
    operation: "num",
  },
});

export const addition = () => ({
  type: ADD,
  payload: {
    operation: "operator",
  },
});

export const subtraction = () => ({
  type: SUBTRACT,
  payload: {
    operation: "operator",
  },
});

export const multiplication = () => ({
  type: MULTIPLY,
  payload: {
    operation: "operator",
  },
});

export const division = () => ({
  type: DIVIDE,
  payload: {
    operation: "operator",
  },
});

export const clearDisplay = () => ({
  type: CLEAR,
  payload: {
    operation: "clear",
  },
});

export const equal = () => ({
  type: EQUAL,
  payload: {
    operation: "equal",
  },
});
