// @flow
import * as React from "react";
import { Droppable } from "react-beautiful-dnd";
import { Draggable } from "react-beautiful-dnd";
import { useAppSelector } from "../../hooks";
import { Props } from "./../Elements/Elements";
import { ModeToggler } from "../../UI/ModeToggler/ModeToggler";
import { Display } from "./../Blocks/Display";
import { Signs } from "./../Blocks/Signs";
import { Numbers } from "./../Blocks/Numbers";
import { Equal } from "./../Blocks/Equal";
import styled from "styled-components";
import { Container, TaskList } from "./../Elements/Elements";

export const Canvas = (props: Props) => {
  const tasks = useAppSelector((state) => state.columns.columns.canvas);
  const tasksData: any = useAppSelector(
    (state) => state.columns.elementsDescription
  );
  console.log("canvas rendered");

  const components: any = {
    el1: Display,
    el2: Signs,
    el3: Numbers,
    el4: Equal,
  };
  return (
    <div className="w-[248px] h-[420px] relative flex justify-center items-center">
      <ModeToggler></ModeToggler>
      {tasks.length > 0 ? (
        ""
      ) : (
        <div className="border-2 border-dashed w-full h-full flex flex-col justify-center items-center text-center absolute z-0">
          <img src={require("../../images/canvas.png")}></img>
          <div className="text-iris font-medium mb-[4px] mt-[12px]">
            Перетащите сюда
          </div>
          <div className="w-[106px] text-[14px]">
            любой элемент из левой панели
          </div>
        </div>
      )}
      <ModeToggler></ModeToggler>
      <Droppable droppableId={"canvas"}>
        {(provided, snapshot: any) => (
          <TaskList
            id="canv-taskList"
            ref={provided.innerRef}
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
            className="h-full"
          >
            {tasks.map((task: any, index: any) => {
              const Component = components[task];
              return (
                <Draggable draggableId={task} key={task} index={index}>
                  {(provided, snapshot) => (
                    <Container
                      id={task}
                      key={task}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                      isDragging={snapshot.isDragging}
                    >
                      <Component />
                    </Container>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </TaskList>
        )}
      </Droppable>
    </div>
  );
};
const Frame = (props: Props) => {};
