import React from "react";

import { Card, CardContent, Modal } from "@mui/material";
import { Filter, FilterBar } from "./FilterBar";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  card: {
    position: "absolute",
    width: "100%",
    maxWidth: "320px",
    height: "fit-content",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  filterBarContainer: {
    marginBottom: "-8px",
  },
});

interface FilterModalProps {
  filter: Filter;
  onChange: (updateFilter: (prevFilter: Filter) => Filter) => void;
  open: boolean;
  onClose?: () => void;
}

export const FilterModal: React.FC<FilterModalProps> = (props) => {
  const styles = useStyles();

  return (
    <Modal open={props.open} onClose={props.onClose} disableScrollLock={true}>
      <Card className={styles.card} elevation={2}>
        <CardContent>
          <div className={styles.filterBarContainer}>
            <FilterBar
              filter={props.filter}
              onChange={props.onChange}
              closeable={true}
              onClose={props.onClose}
            />
          </div>
        </CardContent>
      </Card>
    </Modal>
  );
};
