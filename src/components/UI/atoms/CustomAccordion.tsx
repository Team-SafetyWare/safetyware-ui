import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import React from "react";

interface CustomAccordionProps {
  accordionTitle?: string;
  component?: any;
}

const useStyles = makeStyles({ selectBar: { fontWeight: "bold" } });

export const CustomAccordion: React.FC<CustomAccordionProps> = (props) => {
  const styles = useStyles();

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>{props.accordionTitle}</Typography>
      </AccordionSummary>
      <AccordionDetails>{props.component}</AccordionDetails>
    </Accordion>
  );
};
