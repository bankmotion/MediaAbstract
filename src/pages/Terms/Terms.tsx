import React from "react";
import { Box, Typography } from "@mui/material";
import useStyles from "./styles";

const Terms = () => {
  const { classes } = useStyles();

  return (
    <Box className="max-w-3xl mx-auto p-6">
      <Typography variant="h5" className="mb-4 font-bold">
        Terms of Use
      </Typography>
      <Typography>
        These terms govern your use of the Abstract Matching Platform. By
        signing up, you agree to abide by these terms...
        {/* Add full text from client asset */}
      </Typography>
    </Box>
  );
};

export default Terms;
