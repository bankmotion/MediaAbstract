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
import {
  KeyboardArrowUp,
  LightbulbOutlined,
  Autorenew,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Nabvar";
import ClearPitchDialog from "../../components/ClearPitchDialog/ClearPitchDialog";
import TipsDialog from "../../components/TipsDialog/TipsDialog";
import { supabase } from "../../utils/supabase";

import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { setPitchData, fetchPitchResults } from "../../redux/slices/pitchSlice";

import useStyles from "./styles";

const industryOptions = [
  "Business Executives",
  "Tech Professionals",
  "Cybersecurity Experts",
  "Startup Founders & Entrepreneurs",
  "Marketing & PR Professionals",
  "Investors & Analysts",
  "Healthcare & Health Tech Leaders",
  "Education & Policy Leaders",
  "Sustainability & Climate Leaders",
  "Real Estate & Built Environment",
  "Finance & Fintech Leaders",
  "General Public",
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
  const [userRole, setUserRole] = useState<"writer" | "agency" | null>(null);
  const [planType, setPlanType] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [matchesPerDay, setMatchesPerDay] = useState<string | number>("");
  const [currentMatches, setCurrentMatches] = useState<number>(0);
  const [limitReached, setLimitReached] = useState(false);

  const [errors, setErrors] = useState({ abstract: false, industry: false });

  const [showScrollButton, setShowScrollButton] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [tipsDialogOpen, setTipsDialogOpen] = useState(false);

  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session) {
          navigate("/login");
          return;
        }

        setUserId(session.user.id);

        // Get user profile to determine role and fetch matches_perday
        const { data: profileData, error: profileError } = await supabase
          .from("user_profiles")
          .select("plan_type, matches_perday")
          .eq("user_id", session.user.id)
          .single();

        if (profileError) {
          console.error("Error fetching user profile:", profileError);
          navigate("/login");
          return;
        }

        if (profileData) {
          setPlanType(profileData.plan_type || null);
          setCurrentMatches(profileData.matches_perday || 0);
          if (profileData.plan_type === "basic") {
            setMatchesPerDay(5);
          } else if (profileData.plan_type === "team") {
            setMatchesPerDay(15);
          } else if (profileData.plan_type === "enterprise") {
            setMatchesPerDay("Unlimited");
          } else {
            setMatchesPerDay("");
          }
          if (profileData.plan_type === "writer") {
            setUserRole("writer");
          } else if (
            ["basic", "team", "enterprise"].includes(profileData.plan_type)
          ) {
            setUserRole("agency");
          } else {
            console.error("Invalid user role");
            navigate("/login");
          }
        }
      } catch (error) {
        console.error("Session check error:", error);
        navigate("/login");
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, [navigate]);

  useEffect(() => {
    let limit = 0;
    if (planType === "basic") limit = 5;
    else if (planType === "team") limit = 15;
    else if (planType === "enterprise") limit = Infinity;
    setLimitReached(currentMatches >= limit);
  }, [currentMatches, planType]);

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
    if (!validateFields() || !userId) return;
    try {
      dispatch(setPitchData({ abstract, industry, userId }));
      dispatch(
        fetchPitchResults({
          abstract,
          industry,
          userId,
          planType: planType || undefined,
        })
      );

      // Directly update matches_perday in user_profiles and increment local state
      await supabase
        .from("user_profiles")
        .update({ matches_perday: currentMatches + 1 })
        .eq("user_id", userId);
      setCurrentMatches((prev) => prev + 1);

      navigate("/results");
    } catch (error) {
      console.error("Error in handleSubmit:", error);
    }
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
    if (userRole === "writer") {
      navigate("/writers/dashboard");
    } else if (userRole === "agency") {
      navigate("/agencies/dashboard");
    }
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

  if (isLoading) {
    return (
      <Box className={classes.body}>
        <Typography>Loading...</Typography>
      </Box>
    );
  }

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
        <Button
          variant="text"
          color="primary"
          onClick={handleOpenConfirmDialog}
          className={classes.refineButton}
          startIcon={<Autorenew />}
        >
          Try Another Angle
        </Button>

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
          disabled={limitReached}
        >
          Submit
        </Button>
        {limitReached && (
          <Typography variant="body2" sx={{ color: "#d32f2f", mt: 1, mb: 2 }}>
            You have reached your daily match limit. Please try again in 24
            hours.
          </Typography>
        )}
        {matchesPerDay && (
          <Typography variant="body2" sx={{ mt: 1, mb: 2, color: "#64748b" }}>
            Matches per day:{" "}
            <b>
              {currentMatches}
              {matchesPerDay === "Unlimited" ? "/∞" : `/${matchesPerDay}`}
            </b>
          </Typography>
        )}
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
