import React from "react";

import { Card, CardContent, Grid, Modal } from "@mui/material";
import { Filter, FilterBar } from "./FilterBar";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  grid: {
    width: "100%",
    height: "100%",
  },
  card: {
    margin: "16px",
    width: "100%",
    height: "fit-content",
    maxWidth: "320px",
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
    <Modal open={props.open} onClose={props.onClose}>
      <Grid
        className={styles.grid}
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Grid item>
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
        </Grid>
      </Grid>
    </Modal>
  );
};
