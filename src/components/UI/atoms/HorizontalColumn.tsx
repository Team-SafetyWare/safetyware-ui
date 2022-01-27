import React from "react";
import {
  Draggable,
  DraggingStyle,
  Droppable,
  NotDraggingStyle,
} from "react-beautiful-dnd";
import { DashboardSummaryTile } from "./DashboardSummaryTile";

const getListStyle = (isDraggingOver: boolean): React.CSSProperties => ({
  display: "flex",
  background: isDraggingOver ? "" : "",
  width: "100%",
});

const getItemStyle = (
  isDragging: boolean,
  draggableStyle: DraggingStyle | NotDraggingStyle | undefined
): React.CSSProperties => ({
  width: "100%",
  marginLeft: "5px",
  marginRight: "5px",
  background: isDragging ? "" : "",
  ...draggableStyle,
});

export const HorizontalColumn = (props: { state: any[] }): JSX.Element => {
  return (
    <Droppable droppableId="droppable" direction="horizontal">
      {(provided, snapshot): JSX.Element => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          style={getListStyle(snapshot.isDraggingOver)}
        >
          {props.state.map((item, index) => (
            <Draggable key={index} draggableId={index.toString()} index={index}>
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
                  <DashboardSummaryTile
                    summaryTileIcon={item.summaryTileIcon}
                    summaryName={item.summaryName}
                    summaryNumber={item.summaryNumber}
                  />
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};
