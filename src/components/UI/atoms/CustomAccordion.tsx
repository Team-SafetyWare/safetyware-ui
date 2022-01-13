import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import React from "react";

interface CustomAccordionProps {
  accordionHeight?: any;
  accordionWidth?: string;
  accordionTitle?: string;
  component?: any;
}

const useStyles = makeStyles({
  accordionDetailsRoot: {
    height: (props: CustomAccordionProps) =>
      props.accordionHeight ? props.accordionHeight : "400px",
    width: (props: CustomAccordionProps) =>
      props.accordionWidth ? props.accordionWidth : "100%",
  },
});

export const CustomAccordion: React.FC<CustomAccordionProps> = (props) => {
  const styles = useStyles(props);

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>{props.accordionTitle}</Typography>
      </AccordionSummary>
      <AccordionDetails classes={{ root: styles.accordionDetailsRoot }}>
        {props.component}
        {props.accordionHeight}
        {props.accordionWidth}
      </AccordionDetails>
    </Accordion>
  );
};
