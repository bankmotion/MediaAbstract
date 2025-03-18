import React, { useState } from "react";
import { Box, Button, MenuItem, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Nabvar";
import useStyles from "./styles";

const industryOptions = [
  "Business Executives",
  "Tech",
  "Marketing",
  "General",
  "Healthcare Tech",
  "Sustainability",
  "Cybersecurity",
  "Real Estate",
  "Energy",
];

const Onboarding = () => {
  const { classes } = useStyles();

  const navigate = useNavigate();
  const [abstract, setAbstract] = useState("");
  const [industry, setIndustry] = useState("");

  const handleSubmit = () => {
    // For MVP: Save to localStorage and simulate navigation
    localStorage.setItem("abstract", abstract);
    localStorage.setItem("industry", industry);
    navigate("/results");
  };

  return (
    <>
      <Navbar />
      <Box className={classes.body}>
        <Typography variant="h5" className={classes.title}>
          Submit Your Abstract
        </Typography>
        <TextField
          label="200-word Abstract"
          placeholder="Paste your 200-word abstract here…"
          multiline
          rows={6}
          fullWidth
          value={abstract}
          onChange={(e) => setAbstract(e.target.value)}
          helperText={`${abstract.length}/200 words`}
          className={classes.tabLabel}
        />
        <TextField
          select
          label="Select Audience"
          fullWidth
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
          className={classes.tabLabel}
          SelectProps={{
            MenuProps: {
              PaperProps: {
                style: {
                  maxHeight: 180, // Adjust the height as needed
                  overflowY: "auto",
                },
              },
            },
          }}
        >
          {industryOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        <Button
          variant="contained"
          color="primary"
          className={classes.subbutton}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Box>
    </>
  );
};

export default Onboarding;
