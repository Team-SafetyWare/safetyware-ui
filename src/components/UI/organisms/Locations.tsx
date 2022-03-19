import React, { useCallback, useState } from "react";
import { TravelMap } from "../molecules/TravelMap";
import { Filter, FilterBar } from "../molecules/FilterBar";
import { makeStyles } from "@mui/styles";
import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Modal,
  useMediaQuery,
} from "@mui/material";
import { PageHeader } from "../atoms/PageHeader";
import { HazardMap } from "../molecules/HazardMap";
import { LocationsTable } from "../molecules/LocationsTable";
import theme from "../../../Theme";
import { FilterFab } from "../molecules/FilterFab";
export const LOCATION_PAGE_LABEL = "locationPage";

const useStyles = makeStyles({
  filterBar: {
    position: "sticky",
    top: "16px",
    zIndex: "1",
    width: "100%",
  },
  filterBarContainer: {
    marginBottom: "-8px",
  },
  topMargin: {
    height: "104px",
  },
  pageCard: {
    marginBottom: "16px",
  },
});

interface LocationsProps {
  filter: Filter;
  onFilterChange: (updateFilter: (prevFilter: Filter) => Filter) => void;
}

export const Locations: React.FC<LocationsProps> = (props) => {
  const filterChanged = useCallback(
    (updateFilter: (prevFilter: Filter) => Filter) => {
      props.onFilterChange(updateFilter);
    },
    []
  );

  const [filterModalOpen, setFilterModalOpen] = useState(false);

  const showFilterBar = useMediaQuery(theme.breakpoints.up("lg"));

  const styles = useStyles();

  return (
    <>
      <PageHeader
        pageTitle={"Locations"}
        pageDescription={
          "Analyze locations data including travel history and hazardous areas."
        }
      />

      {showFilterBar && (
        <div className={[styles.pageCard, styles.filterBar].join(" ")}>
          <Card elevation={2}>
            <CardContent>
              <div className={styles.filterBarContainer}>
                <FilterBar filter={props.filter} onChange={filterChanged} />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {!showFilterBar && (
        <>
          <FilterFab onClick={() => setFilterModalOpen(true)} />
          <Modal
            open={filterModalOpen}
            onClose={() => setFilterModalOpen(false)}
          >
            <Card elevation={2}>
              <CardContent>
                <div className={styles.filterBarContainer}>
                  <FilterBar
                    filter={props.filter}
                    onChange={filterChanged}
                    closeable={true}
                    onClose={() => setFilterModalOpen(false)}
                  />
                </div>
              </CardContent>
            </Card>
          </Modal>
        </>
      )}

      <Card className={styles.pageCard}>
        <CardHeader
          title="Travel history"
          subheader="Understand how people move through your facility."
        />
        <CardMedia>
          <div style={{ height: "600px" }}>
            <TravelMap filter={props.filter} />
          </div>
        </CardMedia>
      </Card>

      <Card className={styles.pageCard}>
        <CardHeader
          title="Hazardous areas"
          subheader="See where incidents occur most frequently."
        />
        <CardMedia>
          <div style={{ height: "600px" }}>
            <HazardMap filter={props.filter} />
          </div>
        </CardMedia>
      </Card>

      <Card className={styles.pageCard}>
        <CardHeader
          title="Locations table"
          subheader="View individual location readings."
        />
        <CardMedia>
          <LocationsTable filter={props.filter} />
        </CardMedia>
      </Card>
    </>
  );
};
