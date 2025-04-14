import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  MenuItem,
  TextField,
  Typography,
  Link,
  Fab,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { KeyboardArrowUp, LightbulbOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Nabvar";
import ClearPitchDialog from "../../components/ClearPitchDialog/ClearPitchDialog";
import TipsDialog from "../../components/TipsDialog/TipsDialog";

import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();

  const { abstract: savedAbstract, industry: savedIndustry } = useSelector(
    (state: RootState) => state.pitch
  );

  const [abstract, setAbstract] = useState(savedAbstract || "");
  const [industry, setIndustry] = useState(savedIndustry || "");

  const [errors, setErrors] = useState({ abstract: false, industry: false });

  const [showScrollButton, setShowScrollButton] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [tipsDialogOpen, setTipsDialogOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 50);
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
    dispatch(setPitchData({ abstract, industry }));
    dispatch(fetchPitchResults({ abstract, industry }));

    navigate("/results");
  };

  const handleRefinePitch = () => {
    setAbstract("");
    setConfirmDialogOpen(false);
  };

  const handleOpenConfirmDialog = () => {
    if (abstract.trim()) {
      setConfirmDialogOpen(true);
    } else {
      handleRefinePitch();
    }
  };

  const handleGoToDashboard = () => {
    navigate("/writers/dashboard");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const tipsContent = (
    <Box>
      <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
        Pitching Tips:
      </Typography>
      <ul className={classes.tipsList}>
        <li>Keep it concise (1-2 sentences)</li>
        <li>
          Include relevant keywords (e.g., "business", "tech", "innovation")
        </li>
        <li>Focus on the unique value proposition</li>
        <li>Be specific about your target audience</li>
        <li>Highlight the problem you're solving</li>
      </ul>
    </Box>
  );

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
        <Box className={classes.pitchFieldContainer}>
          {isMobile ? (
            <Button
              startIcon={<LightbulbOutlined />}
              className={classes.tipsButton}
              onClick={() => setTipsDialogOpen(true)}
            >
              Tips
            </Button>
          ) : (
            <Tooltip
              title={tipsContent}
              arrow
              placement="bottom-end"
              classes={{ tooltip: classes.tipsTooltip }}
            >
              <Button
                startIcon={<LightbulbOutlined />}
                className={classes.tipsButton}
              >
                Tips
              </Button>
            </Tooltip>
          )}
          <TextField
            label="Describe Your Pitch Idea (1-2 sentences)"
            placeholder="E.g., 'AI ethics in healthcare for startups' (1-2 sentences). Enter a description with keywords like 'business', 'tech', or 'innovation' for best results"
            multiline
            rows={6}
            fullWidth
            value={abstract}
            onChange={(e) => setAbstract(e.target.value)}
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
        </Box>
        <Link
          component="button"
          variant="body2"
          onClick={handleOpenConfirmDialog}
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
                  maxHeight: 180,
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

      <ClearPitchDialog
        open={confirmDialogOpen}
        onClose={() => setConfirmDialogOpen(false)}
        onConfirm={handleRefinePitch}
      />

      <TipsDialog
        open={tipsDialogOpen}
        onClose={() => setTipsDialogOpen(false)}
      />

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
