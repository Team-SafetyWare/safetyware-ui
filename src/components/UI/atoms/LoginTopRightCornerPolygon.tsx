import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/system";
import React from "react";

const useStyles = makeStyles((theme: Theme) => ({
  loginTopRightCorner: {
    "@media (max-height: 599px) or (max-width: 599px)": {
      display: "none",
    },
    position: "absolute",
    top: 0,
    right: 0,
  },
}));

export const LoginTopRightCornerPolygon: React.FC = () => {
  const styles = useStyles();

  return (
    <svg
      className={styles.loginTopRightCorner}
      width="79.3218mm"
      height="45.796463mm"
      preserveAspectRatio="none"
      viewBox="0 0 79.321801 45.796463"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs />
      <g transform="translate(-217.6782)">
        <g>
          <path
            style={{
              fill: "#ac172b",
              fillOpacity: "1",
              stroke: "none",
              strokeWidth: "0.334923px",
              strokeLinecap: "butt",
              strokeLinejoin: "miter",
              strokeOpacity: "1",
            }}
            d="M 297,0 H 217.6782 L 297,45.796464 Z"
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
            d="M 297,3e-6 H 234.33715 L 297,36.178413 Z"
          />
        </g>
      </g>
    </svg>
  );
};
