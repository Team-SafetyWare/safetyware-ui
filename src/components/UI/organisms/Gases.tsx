import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { IconButton, Modal, useMediaQuery } from "@mui/material";
import { StyledEngineProvider } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import theme from "../../../Theme";
import { CustomAccordion } from "../atoms/CustomAccordion";
import CustomCollapsibleTable from "../atoms/CustomCollapsibleTable";
import { GasesDotMap } from "../atoms/GasesDotMap";
import { PageHeader } from "../atoms/PageHeader";
import { PageSectionHeader } from "../atoms/PageSectionHeader";
import { VisualizationSelect } from "../atoms/VisualizationSelect";
import { CustomBox } from "../molecules/CustomBox";

const gases = [
  { lat: 51.077763, lng: -114.140657 },
  { lat: 51.046048773481786, lng: -114.02334120770176 },
];

const center = {
  lat: 51.049999,
  lng: -114.1283,
};

var user = "PersonA";
var view = "User";
var incidentType = "All";
var tempStartDate = new Date("01/01/2022");
var tempEndDate = new Date("01/08/2022");

const useStyles = makeStyles({
  gasesDropdown: {
    "@media only screen and (max-height: 599px), only screen and (max-width: 599px)":
      {
        display: "flex",
        justifyContent: "center",
        left: "50%",
        marginBottom: "20px",
        position: "absolute",
        top: "calc(0.5 * 60px)",
        transform: "translate(-50%, -50%)",
      },
  },

  visualization: {
    "@media only screen and (max-height: 599px), only screen and (max-width: 599px)":
      {
        height: "calc(100vh - 60px)",
        left: "0",
        position: "absolute",
        top: "60px",
        width: "100vw",
      },
  },
  filterButton: {
    backgroundColor: theme.palette.primary.main,
    bottom: 16,
    color: "white",
    position: "absolute",
    right: 16,
  },
});

export const gasesPageLabel = "gasesPage";

export const Gases: React.FC = () => {
  const matches = useMediaQuery("(min-width:600px) and (min-height:600px)");
  const styles = useStyles();

  const visualizations = ["Raw Gases Data Table", "Gases Dot Map"];

  const [visualization, setVisualization] = useState(visualizations[0]);
  const [openFilterbox, setOpenFilterbox] = useState(false);
  const handleOpenFilterBox = () => setOpenFilterbox(true);
  const handleCloseFilterBox = () => setOpenFilterbox(false);

  return (
    <StyledEngineProvider injectFirst>
      <>
        {matches ? (
          <>
            <PageHeader
              pageTitle={"Gases"}
              pageDescription={
                "Analyze data based on gases using a gas dot map."
              }
            />
            <PageSectionHeader
              sectionTitle={"Raw Gases Data"}
              sectionDescription={
                "Explore raw gas readings data through a date-filtered data table."
              }
              download={true}
            />
            <CustomAccordion
              accordionHeight={"auto"}
              accordionWidth={""}
              accordionTitle={visualizations[0]}
              component={<CustomCollapsibleTable />}
            />
            <PageSectionHeader
              sectionTitle={"Gas Visualizations"}
              sectionDescription={
                "Visualize gases data through a dot map showing gas type and location."
              }
              download={false}
            />
            <CustomAccordion
              accordionHeight={"400px"}
              accordionWidth={""}
              accordionTitle={visualizations[1]}
              component={
                <GasesDotMap gases={gases} center={center} zoom={10} />
              }
            />
          </>
        ) : (
          <>
            <div className={styles.gasesDropdown}>
              <VisualizationSelect
                visualizations={visualizations}
                setVisualization={setVisualization}
              />
            </div>
            {visualization == visualizations[0] && (
              <div className={styles.visualization}>
                <CustomCollapsibleTable />
              </div>
            )}
            {visualization == visualizations[1] && (
              <div className={styles.visualization}>
                <GasesDotMap gases={gases} center={center} zoom={10} />
              </div>
            )}
          </>
        )}
        <IconButton
          className={styles.filterButton}
          onClick={handleOpenFilterBox}
          size="large"
        >
          <FilterAltIcon fontSize="inherit" />
        </IconButton>
        <Modal
          open={openFilterbox}
          onClose={handleCloseFilterBox}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <CustomBox
            user={user}
            view={view}
            incidentType={incidentType}
            startDate={tempStartDate}
            endDate={tempEndDate}
            pageLabel={gasesPageLabel}
          />
        </Modal>
      </>
    </StyledEngineProvider>
  );
};
