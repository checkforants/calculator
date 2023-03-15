// @flow
import * as React from "react";
import { useAppSelector } from "../../hooks";
import { Button } from "./../../UI/Button/Button";
type Props = {};
export const Equal = (props: Props) => {
	const mode = useAppSelector((state) => state.mode);

  return (
    <Button additionalStyle={"bg-iris text-white"} type={"equals"}>
      =
    </Button>
  );
};
