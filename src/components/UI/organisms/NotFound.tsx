import React from "react";
import { Grid } from "@mui/material";
import { Box } from "@mui/system";

export const NotFound: React.FC = () => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        minHeight: {
          xs: "calc(100vh - 60px)",
          sm: "100vh",
        },
      }}
    >
      <Grid item>
        <Box sx={{ padding: "16px", textAlign: "center" }}>
          <h1>Oops, this page doesn&apos;t exist.</h1>
          <p>Perhaps you&apos;re looking for one of the pages in the menu?</p>
        </Box>
      </Grid>
    </Grid>
  );
};
