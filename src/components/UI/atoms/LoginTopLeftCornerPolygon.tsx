import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/system";
import React from "react";

const useStyles = makeStyles((theme: Theme) => ({
  loginTopLeftCorner: {
    "@media (max-height: 599px) or (max-width: 599px)": {
      display: "none",
    },
    position: "absolute",
    top: 0,
  },
}));

export const LoginTopLeftCornerPolygon: React.FC = () => {
  const styles = useStyles();

  return (
    <svg
      className={styles.loginTopLeftCorner}
      width="62.662849mm"
      height="36.178413mm"
      preserveAspectRatio="none"
      viewBox="0 0 62.66285 36.178413"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs />
      <g>
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
          d="M 0,0 H 62.66285 L 0,36.178413 Z"
        />
      </g>
    </svg>
  );
};
