// @flow
import * as React from "react";
import { useAppSelector } from "../../hooks";
type Props = {};
export const Disp = (props: Props) => {
  const display = useAppSelector((state) => state.display);

  return (
    <div className="">
      <div className="bg-[#f2e6ff] rounded-md h-[35px] w-full text-right items-center text-2xl color-black font-extrabold pr-2 pt-[1px]">
        {display.display == "" ? "Не определено" : display.display}
      </div>
    </div>
  );
};

export const Display = React.memo(Disp);
