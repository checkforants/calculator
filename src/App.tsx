import React from "react";
import "./App.css";

import { DragDropContext } from "react-beautiful-dnd";
import { useAppSelector, useAppDispatch } from "./hooks";
import { Canvas } from "./components/Canvas/Canvas";
import { Elements } from "./components/Elements/Elements";

function App() {
  const dispatch = useAppDispatch();
  const reorder = (list: any, startIndex: any, endIndex: any) => {
    console.log("list", list, "startIndex", startIndex, "endIndex", endIndex);

    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };
  const columns = useAppSelector((state: any) => state.columns);

  const onDragEnd = (result: any) => {
    const { destination, source, draggableId } = result;
    console.log(result);

    if (!destination && source?.droppableId === "canvas") {
      console.log("daaaa");

      // const elem = columns.columns[startColumn][startIndex];
      const endColumnItems = [...columns.columns["elements"], draggableId];
      const newColumns = {
        canvas: columns.columns["canvas"].filter(
          (x: string) => x != draggableId
        ),
        elements: endColumnItems,
      };
      console.log(newColumns);

      dispatch({ type: "REORDER_COLUMNS", payload: { ...newColumns } });
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    const startColumn = source?.droppableId;
    const startIndex = source?.index;

    const endIndex = destination?.index;
    const endColumn = destination?.droppableId;
    if (startColumn === endColumn) {
      const items = reorder(columns.columns[startColumn], startIndex, endIndex);
      //   console.log(columns.columns);
      const newColumns = { ...columns.columns, [startColumn]: items };
      console.log(newColumns);
      dispatch({ type: "REORDER_COLUMNS", payload: { ...newColumns } });
      return;
    } else {
      const elem = columns.columns[startColumn][startIndex];
      const startColumnItems = [...columns.columns[startColumn]];
      startColumnItems.splice(startIndex, 1);
      const endColumnItems = [...columns.columns[endColumn]];
      endColumnItems.splice(endIndex, 0, elem);
      console.log(endIndex, 0, elem, endColumnItems);

      const newColumns = {
        [startColumn]: startColumnItems,
        [endColumn]: endColumnItems,
      };
      console.log(newColumns);

      dispatch({ type: "REORDER_COLUMNS", payload: { ...newColumns } });
    }
  };

  return (
    <div className=" flex justify-center items-center pt-9 h-full ">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="mx-56 my-20 px-15 py-10 h-[448px] w-200 flex justify-center items-center gap-[58px]">
          <Elements column={"elements"}></Elements>
          <Canvas column={"canvas"}></Canvas>
        </div>
      </DragDropContext>
    </div>
  );
}

export default App;
