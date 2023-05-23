// @flow
import * as React from "react";
import { connect } from "react-redux";
import { useAppDispatch, useAppSelector } from "./../../hooks";
import {
  subtraction,
  multiplication,
  division,
  equal,
  updateDisplay,
  addition,
} from "./../../redux/actions/actions";
type Props = {
  children: string | number;
  additionalStyle?: string;
  type?: string;
  value?: string | number;
};
export const Button = ({ additionalStyle, children, type, value }: Props) => {
  const dispatch = useAppDispatch();
  const isRuntimeMode: boolean = useAppSelector((state) => state.isRuntimeMode);
  console.log(isRuntimeMode);

  // console.log(type);
  const handleClicks = (e: any) => {
    if (!isRuntimeMode) return;
    if (type === "subtract") {
      dispatch(subtraction());
    } else if (type === "multiply") {
      dispatch(multiplication());
    } else if (type === "divide") {
      dispatch(division());
    } else if (type === "add") {
      dispatch(addition());
    } else if (type === "equals") {
      dispatch(equal());
    } else {
      dispatch(updateDisplay(children));
    }
  };
  return (
    <div
      className={`h-[52px] rounded border-2 shadow-button font-medium border-solitude bg-display flex justify-center items-center decoration-black leading-4 ${additionalStyle}`}
      onClick={(e: React.MouseEvent) => handleClicks(e)}
    >
      {children}
    </div>
  );
};

// const mapDispatchToProps = (dispatch) => ({
//   updateDisplay: (display) => dispatch(updateDisplay(display)),
//   subtract: (display) => dispatch(subtraction(display)),
//   multiply: (display) => dispatch(multiplication(display)),
//   divtypee: (display) => dispatch(division(display)),
//   clear: (display) => dispatch(clearDisplay(display)),
// });
// export default connect(null, mapDispatchToProps)(Button);
