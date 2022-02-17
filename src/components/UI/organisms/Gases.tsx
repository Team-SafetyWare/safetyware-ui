import { useMediaQuery } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import { CustomAccordion } from "../atoms/CustomAccordion";
import CustomCollapsibleTable from "../atoms/CustomCollapsibleTable";
import { GasesDotMap } from "../atoms/GasesDotMap";
import { PageHeader } from "../atoms/PageHeader";
import { PageSectionHeader } from "../atoms/PageSectionHeader";
import { VisualizationSelect } from "../atoms/VisualizationSelect";

const gases = [
  { lat: 51.077763, lng: -114.140657 },
  { lat: 51.046048773481786, lng: -114.02334120770176 },
];

const center = {
  lat: 51.049999,
  lng: -114.1283,
};

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
});

export const Gases: React.FC = () => {
  const matches = useMediaQuery("(min-width:600px) and (min-height:600px)");
  const styles = useStyles();

  const visualizations = ["Raw Gases Data Table", "Gases Dot Map"];

  const [visualization, setVisualization] = useState(visualizations[0]);

  return (
    <>
      {matches ? (
        <>
          <PageHeader
            pageTitle={"Gases"}
            pageDescription={"Description of the Gases Page and What it Does"}
          />
          <PageSectionHeader
            sectionTitle={"Raw Gases Data"}
            sectionDescription={"Explore and Download Raw Gases Data"}
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
            sectionDescription={"Visualize Gas Data Based on Location"}
            download={false}
          />
          <CustomAccordion
            accordionHeight={"400px"}
            accordionWidth={""}
            accordionTitle={visualizations[1]}
            component={<GasesDotMap gases={gases} center={center} zoom={10} />}
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
    </>
  );
};
