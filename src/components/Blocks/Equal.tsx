// @flow
import * as React from "react";
import { useAppSelector } from "../../hooks";
import { Button } from "./../../UI/Button/Button";
type Props = {};
export const Eq = (props: Props) => {


  return (
    <Button additionalStyle={"bg-iris text-white"} type={"equals"}>
      =
    </Button>
  );
};
export const Equal = React.memo(Eq);
