import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import {
  GridContextProvider,
  GridDropZone,
  GridItem,
  move,
  swap,
} from "react-grid-dnd";

interface DashboardWidgetTileData {
  widgetName: string;
  widget: any;
}

interface Item {
  left: ItemsInnerArray[];
  right: ItemsInnerArray[];
}

interface ItemsInnerArray {
  id: number;
  name: string;
}

const barGraphData = [
  { x: 0, y: 8 },
  { x: 1, y: 5 },
  { x: 2, y: 4 },
  { x: 3, y: 9 },
  { x: 4, y: 1 },
  { x: 5, y: 7 },
  { x: 6, y: 6 },
  { x: 7, y: 3 },
  { x: 8, y: 2 },
  { x: 9, y: 0 },
];

const incidents = [
  { lat: 51.077763, lng: -114.140657 },
  { lat: 51.046048773481786, lng: -114.02334120770176 },
];

const center = {
  lat: 51.049999,
  lng: -114.1283,
};

const useStyles = makeStyles({
  test: {
    paddingTop: "15px",
    height: "400px",
    width: "100%",
  },
  container: {
    display: "flex",
    touchAction: "none",
    width: "100%",
    height: "100%",
    margin: "1rem auto",
  },
  dropzone: {
    flex: 1,
    height: "300px",
    border: "1px solid rgba(0, 0, 0, 0.1)",
    borderRadius: "1rem",
  },
  gridItem: {
    width: "100%",
    height: "100%",
    boxSizing: "border-box",
    padding: "0.5em",
  },
  gridItemContent: {
    width: "100%",
    height: "100%",
    boxSizing: "border-box",
    background: "#08e",
    display: "flex",
    justifyContent: "center",
    color: "white",
    alignItems: "center",
    borderRadius: "0.5em",
  },
});

const reorder = (
  list: DashboardWidgetTileData[],
  startIndex: number,
  endIndex: number
): DashboardWidgetTileData[] => {
  console.log(startIndex);
  console.log(endIndex);
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  console.log([removed]);
  result.splice(endIndex, 0, removed);
  console.log(result);

  return result;
};

export const DashboardWidgetWrapper = (): JSX.Element => {
  const styles = useStyles();

  const [items, setItems] = useState({
    left: [
      { id: 1, name: "ben" },
      { id: 2, name: "joe" },
      { id: 3, name: "jason" },
      { id: 4, name: "chris" },
      { id: 5, name: "heather" },
    ],
    right: [
      { id: 7, name: "george" },
      { id: 8, name: "rupert" },
      { id: 9, name: "alice" },
      { id: 10, name: "katherine" },
      { id: 11, name: "pam" },
      { id: 12, name: "katie" },
    ],
  });

  const onChange = (
    sourceId: any,
    sourceIndex: any,
    targetIndex: any,
    targetId: any
  ) => {
    if (targetId) {
      const result = move(
        items[sourceId as keyof Item],
        items[targetId as keyof Item],
        sourceIndex,
        targetIndex
      );
      return setItems({
        ...items,
        [sourceId]: result[0],
        [targetId]: result[1],
      });
    }

    const result = swap(
      items[sourceId as keyof Item],
      sourceIndex,
      targetIndex
    );
    return setItems({
      ...items,
      [sourceId]: result,
    });
  };

  // const [state, setState] = useState([
  //   {
  //     widgetName: "Incident Dot Map",
  //     widget: (
  //       <IncidentDotMapWidget incidents={incidents} center={center} zoom={10} />
  //     ),
  //   },
  //   {
  //     widgetName: "Travel History Trail",
  //     widget: (
  //       <TravelHistoryTrailWidget path={incidents} center={center} zoom={10} />
  //     ),
  //   },
  //   {
  //     widgetName: "Hazardous Area Heat Map",
  //     widget: (
  //       <HazardousAreaHeatMapWidget
  //         accidents={incidents}
  //         center={center}
  //         zoom={10}
  //       />
  //     ),
  //   },
  //   {
  //     widgetName: "Bar Graph",
  //     widget: <BarGraphWidget data={barGraphData} />,
  //   },
  //   {
  //     widgetName: "Empty",
  //     widget: "",
  //   },
  //   {
  //     widgetName: "Empty",
  //     widget: "",
  //   },
  // ]);

  // const onDragEnd = (result: DropResult): void => {
  //   // dropped outside the list
  //   if (!result.destination) {
  //     return;
  //   }

  //   console.log(state);
  //   const items: DashboardWidgetTileData[] = reorder(
  //     state,
  //     result.source.index,
  //     result.destination.index
  //   );

  //   setState(items);
  // };

  return (
    <>
      {/* <DashboardWidgets
        widgetWrapperState={state.slice(0, 2)}
        onDragEndFunction={onDragEnd}
        reorderFunction={reorder}
      />
      <DashboardWidgets
        widgetWrapperState={state.slice(2, 6)}
        onDragEndFunction={onDragEnd}
        reorderFunction={reorder}
      /> */}
      <GridContextProvider onChange={onChange}>
        <div className={styles.container}>
          <GridDropZone
            className={styles.dropzone}
            id="left"
            boxesPerRow={2}
            rowHeight={150}
          >
            {items.left.map((item) => (
              <GridItem key={item.name}>
                <div className={styles.gridItem}>
                  <div className={styles.gridItemContent}>
                    {item.name.toUpperCase()}
                  </div>
                </div>
              </GridItem>
            ))}
          </GridDropZone>
        </div>
      </GridContextProvider>
    </>
  );
};
