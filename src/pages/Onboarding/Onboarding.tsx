import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  MenuItem,
  TextField,
  Typography,
  Link,
  Fab,
} from "@mui/material";
import { KeyboardArrowUp } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Nabvar";
// import { submitPitch } from "../../services/api";

import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { setPitchData, fetchPitchResults } from "../../redux/slices/pitchSlice";

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
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();

  const [abstract, setAbstract] = useState("");
  const [industry, setIndustry] = useState("");
  const [role, setRole] = useState("");
  const [errors, setErrors] = useState({ abstract: false, industry: false });

  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const validateFields = () => {
    const newErrors = {
      abstract: abstract.trim() === "",
      industry: industry === "",
    };
    setErrors(newErrors);
    return !newErrors.abstract && !newErrors.industry;
  };

  const handleSubmit = async () => {
    if (!validateFields()) return;
    // For MVP: Save to localStorage and simulate navigation
    // localStorage.setItem("abstract", abstract);
    // localStorage.setItem("industry", industry);
    // const a = await submitPitch(abstract, industry);

    dispatch(setPitchData({ abstract, industry }));
    dispatch(fetchPitchResults({ abstract, industry }));

    // if (role === "writers") {
    //   navigate("/results", { state: { role: "writers" } });
    // } else if (role === "agencies") {
    //   navigate("/results", { state: { role: "agencies" } });
    // }
    navigate("/results");
  };

  const handleRefinePitch = () => {
    setAbstract("");
  };

  const handleGoToDashboard = () => {
    //if (role === "writers") {
    navigate("/writers/dashboard");
    //} else if (role === "agencies") {
    //  navigate("/agencies/dashboard");
    //} else {
    //  navigate("/");
    //}
  };

  useEffect(() => {
    if (location.state?.role) {
      setRole(location.state.role);
    }
  }, [location.state]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Navbar />
      <Box className={classes.body}>
        <Typography variant="h6" className={classes.stepLabel}>
          Step 1: Describe Your Pitch Idea
        </Typography>
        <Typography variant="body1" className={classes.stepDescription}>
          Describe your pitch idea in 1–2 sentences.
        </Typography>
        <TextField
          label="Describe Your Pitch Idea (1-2 sentences)"
          // placeholder="E.g., 'AI ethics in healthcare for startups' (1-2 sentences)"
          placeholder="E.g., 'AI ethics in healthcare for startups' (1-2 sentences). Enter a description with keywords like ‘business’, ‘tech’, or ‘innovation’ for best results"
          multiline
          rows={6}
          fullWidth
          value={abstract}
          onChange={(e) => setAbstract(e.target.value)}
          // helperText={`${abstract.length}/200 words`}
          error={errors.abstract}
          helperText={
            errors.abstract
              ? "This field is required."
              : `${abstract.length}/200 words`
          }
          className={classes.pitchField}
          margin="normal"
          InputProps={{
            classes: { input: classes.inputPlaceholder },
          }}
          InputLabelProps={{
            classes: { root: classes.inputLabel },
            shrink: true,
          }}
        />
        <Link
          component="button"
          variant="body2"
          onClick={handleRefinePitch}
          className={classes.refineLink}
          sx={{ mt: 1, mb: 2 }}
        >
          Try Another Angle
        </Link>

        <Typography variant="h6" className={classes.stepLabel}>
          Step 2: Select Audience
        </Typography>
        <Typography variant="body1" className={classes.stepDescription}>
          Choose the audience most aligned with your pitch.
        </Typography>
        <TextField
          select
          label="Select Audience"
          fullWidth
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
          className={classes.audienceOption}
          error={errors.industry}
          helperText={errors.industry ? "Please select an audience." : ""}
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
        <Typography variant="h6" className={classes.stepLabel}>
          Step 3: Submit
        </Typography>
        <Typography variant="body1" className={classes.stepDescription}>
          Submit your pitch to view the matched results.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          className={classes.subbutton}
          onClick={handleSubmit}
          // disabled={!abstract.trim() || !industry}
        >
          Submit
        </Button>
        <Button
          variant="text"
          color="secondary"
          className={classes.backDashboardButton}
          onClick={handleGoToDashboard}
        >
          Go to Dashboard
        </Button>
      </Box>

      {showScrollButton && (
        <Fab
          color="primary"
          size="small"
          onClick={scrollToTop}
          className={classes.scrollToTopButton}
        >
          <KeyboardArrowUp />
        </Fab>
      )}
    </>
  );
};

export default Onboarding;
