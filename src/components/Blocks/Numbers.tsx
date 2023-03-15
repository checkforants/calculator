// @flow
import * as React from "react";
import { Button } from "../../UI/Button/Button";
type Props = {};
export const Numbers = (props: Props) => {
  const numbers = ["7", "8", "9", "4", "5", "6", "1", "2", "3", "0", ","];

  return (
    <div className="grid grid-cols-3 grid-flow-row gap-2">
      {numbers.map((number, index) => (
        <Button
          key={number}
          additionalStyle={number === "0" ? "col-span-2" : "w-auto"}
          type={number === "," ? "decimal" : "num"}
          value={number}
        >
          {number}
        </Button>
      ))}
    </div>
  );
};
