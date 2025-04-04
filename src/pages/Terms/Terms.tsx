import React from "react";
import { Box, Typography } from "@mui/material";
import useStyles from "./styles";

const Terms = () => {
  const { classes } = useStyles();

  return (
    <Box className={classes.body}>
      <Typography variant="h5" className={classes.title}>
        Terms of Use
      </Typography>
      <Typography className={classes.tabLabel}>
        These terms govern your use of the WriteFor.co. By signing up, you agree
        to abide by these terms...
        {/* Add full text from client asset */}
      </Typography>
    </Box>
  );
};

export default Terms;
