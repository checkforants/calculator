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
  accumulated: "0",
  history: "0",
};
type stType = {
  display: string;
  prevOp: string;
  accumulated: string;
  history: string;
};
function hasOperator(history: string) {
  const operators = ["/", "+", "*", "-"];
  return operators.reduce((res, op) => res || history.includes(op), false);
}
// accumulated: hasOperator(state.history)
// ? math.evaluate(
// 		state.history.replace(",", ".") +
// 			state.display.replace(",", ".")
// 	)
// : state.accumulated,
// const math = create(all);
// eslint-disable-next-line import/no-anonymous-default-export
export const displayReducer = function (state = initialState, action: any) {
  switch (action.type) {
    case UPDATE: {
      const updateDisplay = action.payload;
      console.log(math.evaluate("(5+7)*3"));

      // dont update if one decimal is already present in display value. return state
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
          // if display is at 0, normally from being cleared, or prev button was operator, overwrite 0 or value
          display:
            state.display == "0" || state.prevOp === "operator"
              ? updateDisplay.input
              : state.display + updateDisplay.input,
          prevOp: updateDisplay.operation,
        };
    }

    // when operator actions are fired, remove last entry if double operator used, set history as ongoing string.
    case ADD: {
      const history = () =>
        state.prevOp === "operator"
          ? state.history.slice(0, state.history.length - 4)
          : state.history;

      return {
        ...state,
        display: state.display,
        history:
          state.history == "0" && state.accumulated == "0"
            ? state.display + " + "
            : state.accumulated != "0"
            ? state.accumulated + " + "
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
          state.history == "0" && state.accumulated == "0"
            ? state.display + " - "
            : state.accumulated != "0"
            ? state.accumulated + " - "
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
          state.history == "0" && state.accumulated == "0"
            ? `(${state.display})` + " * "
            : state.accumulated != "0"
            ? `(${state.accumulated})` + " * "
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
          state.history == "0" && state.accumulated == "0"
            ? `(${state.display})` + " / "
            : state.accumulated != "0"
            ? `(${state.accumulated})` + " / "
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
        accumulated: "0",
        history: "0",
      };
    }
    // equal will concat display to history to give current string. then Maths it from mathJS library.
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
          accumulated: "0",
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
          history: math.round(maths, 4).toString(),
          display: math.round(maths, 4).toString(),
          accumulated: maths.toString(),
          prevOp: "equal",
        };
      }
    }

    default:
      return state;
  }
};
