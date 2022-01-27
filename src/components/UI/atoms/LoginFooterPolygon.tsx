import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/system";
import React from "react";

const useStyles = makeStyles((theme: Theme) => ({
  loginFooter: {
    "@media (max-height: 599px) or (max-width: 599px)": {
      display: "none",
    },
    position: "absolute",
    bottom: 0,
    width: "100vw",
  },
}));

export const LoginFooterPolygon: React.FC = () => {
  const styles = useStyles();

  return (
    <svg
      className={styles.loginFooter}
      width="297mm"
      height="72.356827mm"
      preserveAspectRatio="none"
      viewBox="0 0 297 72.356827"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs />
      <g transform="translate(0,-137.64318)">
        <g>
          <rect
            style={{
              fill: "#ad172b",
              fillOpacity: "1",
              stroke: "none",
              strokeWidth: "0.264583",
              strokeOpacity: "1",
            }}
            width="297"
            height="36.17841"
            x="0"
            y="173.82159"
          />
          <path
            style={{
              fill: "#d34949",
              fillOpacity: "1",
              stroke: "none",
              strokeWidth: "0.264583px",
              strokeLinecap: "butt",
              strokeLinejoin: "miter",
              strokeOpacity: "1",
            }}
            d="M 297,210 H 234.33715 L 297,173.82159 Z"
          />
          <path
            style={{
              fill: "#d34949",
              fillOpacity: "1",
              stroke: "none",
              strokeWidth: "0.264583px",
              strokeLinecap: "butt",
              strokeLinejoin: "miter",
              strokeOpacity: "1",
            }}
            d="M 0,137.64318 V 210 l 62.662842,-36.17841 z"
          />
        </g>
      </g>
    </svg>
  );
};
