import { ADD } from "../actions/constants";
import { SUBTRACT } from "../actions/constants";
import { MULTIPLY } from "../actions/constants";
import { DIVIDE } from "../actions/constants";
import { UPDATE } from "../actions/constants";
import { CLEAR } from "../actions/constants";
import { EQUAL } from "../actions/constants";
import * as math from "mathjs";
import * as _ from "lodash";
// import { all, create } from "mathjs";

const initialState = {
  display: "0",
  prevOp: "",
  history: "0",
};
type stType = {
  display: string;
  prevOp: string;
  history: string;
};
// function hasOperator(history: string) {
//   const operators = ["/", "+", "*", "-"];
//   return operators.reduce((res, op) => res || history.includes(op), false);
// }

export const displayReducer = function (state = initialState, action: any) {
  switch (action.type) {
    case UPDATE: {
      const updateDisplay = action.payload;
      console.log(math.evaluate("(5+7)*3"));

      if (
        (_.toString(state.display).includes(",") &&
          updateDisplay.input === ",") ||
        state.display.length > 8
      ) {
        return {
          ...state,
        };
      } else if (
        updateDisplay.input === "," &&
        (state.display === "0" || !state.display)
      )
        return { ...state, display: "0," };
      else
        return {
          ...state,

          display:
            state.display == "0" || state.prevOp === "operator"
              ? updateDisplay.input
              : state.display + updateDisplay.input,
          prevOp: updateDisplay.operation,
        };
    }

    case ADD: {
      const history = () =>
        state.prevOp === "operator"
          ? state.history.slice(0, state.history.length - 4)
          : state.history;

      return {
        ...state,
        display: state.display,
        history:
          state.history == "0"
            ? state.display + " + "
            : history() + state.display + " + ",
        prevOp: "operator",
      };
    }

    case SUBTRACT: {
      const history = () =>
        state.prevOp === "operator"
          ? state.history.slice(0, state.history.length - 4)
          : state.history;

      return {
        ...state,
        display: state.display,
        history:
          state.history == "0"
            ? state.display + " - "
            : history() + state.display + " - ",
        prevOp: "operator",
      };
    }

    case MULTIPLY: {
      const history = () =>
        state.prevOp === "operator"
          ? state.history.slice(0, state.history.length - 4)
          : state.history;

      return {
        ...state,
        display: state.display,
        history:
          state.history == "0"
            ? `(${state.display})` + " * "
            : `(${history() + state.display})` + " * ",
        prevOp: "operator",
      };
    }

    case DIVIDE: {
      const history = () =>
        state.prevOp === "operator"
          ? state.history.slice(0, state.history.length - 4)
          : state.history;
      return {
        ...state,
        display: state.display,
        history:
          state.history == "0"
            ? `(${state.display})` + " / "
            : `(${history() + state.display})` + " / ",
        prevOp: "operator",
      };
    }
    // clear resets state
    case CLEAR: {
      return {
        ...state,
        display: "0",
        prevOp: "clear",
        history: "0",
      };
    }

    case EQUAL: {
      let states =
        state.history.replace(",", ".") + state.display.replace(",", ".");
      let maths = math.evaluate(states);
      console.log(maths, states);

      if (maths === Infinity) {
        return {
          ...state,
          history: "0",
          display: "",
          prevOp: "equal",
        };
      }

      if (state.prevOp === "equal") {
        return {
          ...state,
        };
      } else {
        return {
          ...state,
          history: "0",
          display: math.round(maths, 4).toString(),
          prevOp: "equal",
        };
      }
    }

    default:
      return state;
  }
};
