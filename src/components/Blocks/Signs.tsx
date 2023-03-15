// @flow
import * as React from "react";
import { Button } from "./../../UI/Button/Button";
type Props = {};
export const Signs = (props: Props) => {
  const signs = [
    { key: "/", type: "divide" },
    { key: "*", type: "multiply" },
    { key: "-", type: "subtract" },
    { key: "+", type: "add" },
  ];
	
  return (
    <div className="flex justify-between gap-2">
      {signs.map((sign, index) => (
        <Button key={sign.key} type={sign.type} additionalStyle={"flex-auto"}>
          {sign.key}
        </Button>
      ))}
    </div>
  );
};
