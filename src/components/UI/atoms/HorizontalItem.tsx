import React from "react";
import {
  Draggable,
  DraggingStyle,
  NotDraggingStyle,
} from "react-beautiful-dnd";

const grid = 8;

const getItemStyle = (
  isDragging: boolean,
  draggableStyle: DraggingStyle | NotDraggingStyle | undefined
): React.CSSProperties => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle,
});

export const HorizontalItem = (props: {
  key: string;
  id: string;
  index: number;
  data: string;
}): JSX.Element => {
  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  return (
    <Draggable key={props.key} draggableId={props.id} index={props.index}>
      {(provided, snapshot): JSX.Element => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={getItemStyle(
            snapshot.isDragging,
            provided.draggableProps.style
          )}
        >
          {props.data}
        </div>
      )}
    </Draggable>
  );
};
