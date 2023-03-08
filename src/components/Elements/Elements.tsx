import { useAppSelector } from "../../hooks";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useState } from "react";

// @flow
type Props = {};
export const Elements = (props: Props) => {
  const counter = useAppSelector((store) => store?.value);
  const [lst, setLst] = useState<any>([{ id: 1 }, { id: 2 }, { id: 3 }]);
  const reorder = (list: any, startIndex: any, endIndex: any) => {
    console.log("yeeap");

    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };
  const onDragEnd = (result: any) => {
    console.log(123123123);

    if (!result.destination) {
      return;
    }
    const items = reorder(lst, result.source.index, result.destination.index);
    setLst(items);
  };
  // ref={provided.innerRef}{...provided.dragHandleProps}{...provided.draggableProps}
  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="0">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {lst.map((el: any, step: any) => {
                return (
                  <Draggable draggableId={`${el.id}`} index={step} key={el.id}>
                    {(provided) => (
                      <div
                        className="p-10 border-2 border-red-500 mb-2"
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        {el.id}
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};
