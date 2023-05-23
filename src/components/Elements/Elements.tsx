import { useAppSelector } from "../../hooks";
import { Droppable, Draggable } from "react-beautiful-dnd";
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
  background-color: ${(props: any) => (props.isDragging ? "#b3b3ff" : "white")};
`;

export const TaskList = styled.div<StyledColumnProps>`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${(props: any) =>
    props.isDraggingOver ? "#b3f0ff" : "white"};
  flex-grow: 1;
  height: 100%;
  border-radius: 10px;
`;
export type Props = {
  column: any;
};
export const Elements = (props: Props) => {
  const isRuntimeMode = useAppSelector((state) => state.isRuntimeMode);

  const tasks = useAppSelector((state) => state.columns.columns.elements);

  console.log("elements rendered");

  const components: any = {
    el1: Display,
    el2: Signs,
    el3: Numbers,
    el4: Equal,
  };
	type MyArrayType = Array<string | Array<string>>;

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
                <Draggable
                  draggableId={task}
                  key={task}
                  index={index}
                  isDragDisabled={isRuntimeMode}
                >
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
