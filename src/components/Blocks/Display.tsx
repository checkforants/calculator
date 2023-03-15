// @flow
import * as React from "react";
import { useAppSelector } from "../../hooks";
type Props = {};
export const Display = (props: Props) => {
  const display = useAppSelector((state) => state.display);

  return (
    <div className="">
      <div className="bg-display rounded-md h-[35px] w-full text-right items-center text-xl color-black font-extrabold">
        {display.display == "" ? "Не определено" : display.display}
      </div>
    </div>
  );
};
