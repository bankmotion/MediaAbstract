import React from "react";
import { Box, Typography } from "@mui/material";
import useStyles from "./styles";

const NotFound = () => {
  const { classes } = useStyles();

  return (
    <Box className={classes.body}>
      <Typography variant="h4" className={classes.title}>
        404 - Page Not Found
      </Typography>
    </Box>
  );
};

export default NotFound;
