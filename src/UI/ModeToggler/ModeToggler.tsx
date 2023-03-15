// @flow
import * as React from "react";
import { ReactComponent as Eye } from "../../images/eye.svg";
import { ReactComponent as Constructor } from "../../images/Vector.svg";
import cl from "./ModelToggle.module.scss";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "./../../hooks";
import { clearDisplay } from "../../redux/actions/actions";
type Props = {};
export const ModeToggler = (props: Props) => {
  const display = useAppSelector((state) => state.display);

  const [isRuntimeActive, setIsRuntimeActive] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  return (
    <div className="bg-solitude w-[243px] h-[38px] flex justify-evenly rounded drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] p-[1px] absolute top-[-60px]">
      <div
        className={`${
          isRuntimeActive ? cl.active : ""
        } flex items-center w-1/2 rounded justify-evenly px-2`}
        onClick={() => {
          setIsRuntimeActive(true);
          dispatch(clearDisplay(display));
        }}
      >
        <Eye className={cl.image}></Eye>
        <div>Runtime</div>
      </div>
      <div
        className={`flex items-center w-1/2 rounded justify-evenly px-2 ${
          isRuntimeActive ? "" : cl.active
        }`}
        onClick={() => {
          setIsRuntimeActive(false);
          dispatch(clearDisplay(display));
        }}
      >
        <Constructor className={`${cl.image} mt-1`}></Constructor>
        <div>Constructor</div>
      </div>
    </div>
  );
};
