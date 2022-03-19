import React from "react";

import { Card, CardContent, Modal } from "@mui/material";
import { Filter, FilterBar } from "./FilterBar";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
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
    <Modal open={props.open} onClose={props.onClose}>
      <Card elevation={2}>
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
