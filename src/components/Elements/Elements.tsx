import { useAppSelector } from "../../hooks";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useState } from "react";
import { Display } from "./../Blocks/Display";
import { Signs } from "./../Blocks/Signs";
import { Numbers } from "./../Blocks/Numbers";
import { Equal } from "./../Blocks/Equal";
import styled from "styled-components";

interface StyledContainerProps {
  isDragging: boolean;
  ref: any;
}
interface StyledColumnProps {
  isDraggingOver: boolean;
  ref: any;
}
// @flow
export const Container = styled.div<StyledContainerProps>`
  // border: 1px solid lightgrey;
  // border-radius: 2px;
  padding: 4px;
  box-shadow: 0px 1px 8px 1px rgba(34, 60, 80, 0.2);
  border-radius: 7px;
  margin-bottom: 8px;
  background-color: ${(props: any) =>
    props.isDragging ? "lightgreen" : "white"};
`;

export const TaskList = styled.div<StyledColumnProps>`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${(props: any) =>
    props.isDraggingOver ? "skyblue" : "white"};
  flex-grow: 1;
  height: 100%;
`;
export type Props = {
  column: any;
};
export const Elements = (props: Props) => {
  //   const counter = useAppSelector((store) => store?.value);

  // ref={provided.innerRef}{...provided.dragHandleProps}{...provided.draggableProps}
  const tasks = useAppSelector((state) => state.columns.columns.elements);
  //   const tasksData: any = useAppSelector(
  //     (state) => state.columns.elementsDescription
  //   );
  console.log("elements rendered");

  const components: any = {
    el1: Display,
    el2: Signs,
    el3: Numbers,
    el4: Equal,
  };
  return (
    <div className="w-[248px] h-[440px]">
      <Droppable droppableId={"elements"}>
        {(provided, snapshot: any) => (
          <TaskList
            id="elem-taskList"
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
