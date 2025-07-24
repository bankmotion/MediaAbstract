import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import useStyles from "./styles";
import Navbar from "../../components/Navbar/Nabvar";
import VettingQuestions from "../../components/VettingQuestions/VettingQuestions";

import LightbulbIcon from "@mui/icons-material/Lightbulb";
import ChecklistIcon from "@mui/icons-material/Checklist";
import DashboardIcon from "@mui/icons-material/Dashboard";

const WritersIntro = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const [showVetting, setShowVetting] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleVettingComplete = (isAgency: boolean) => {
    if (isAgency) {
      navigate("/agenciesintro");
    } else {
      navigate("/signup/writers");
    }
  };

  if (showVetting) {
    return (
      <>
        <Navbar />
        <Box className={classes.introWrapper}>
          <Typography variant="h4" className={classes.title}>
            Quick Questions
          </Typography>
          <Typography variant="subtitle1" className={classes.subtitle}>
            Help us understand your needs better
          </Typography>
          <VettingQuestions onComplete={handleVettingComplete} />
        </Box>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <Box className={classes.introWrapper}>
        <Typography variant="h4" className={classes.title}>
          Welcome, Writers
        </Typography>
        <Typography variant="subtitle1" className={classes.subtitle}>
          Supercharge your pitches. Get matched with top media outlets.
        </Typography>

        <Box className={classes.whySection}>
          <Typography variant="h6" className={classes.whyHeader}>
            Why WriteFor.co?
          </Typography>
          <Typography className={classes.whyDescription}>
            Built for content pitching—perfect for bylines, op-eds, commentary,
            columns, and freelance articles.
          </Typography>
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} sm={4} className={classes.whyItem}>
              <LightbulbIcon className={classes.whyIcon} />
              <Typography className={classes.whyTitle}>
                Pitch Smarter
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4} className={classes.whyItem}>
              <ChecklistIcon className={classes.whyIcon} />
              <Typography className={classes.whyTitle}>
                Get Matches Fast
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4} className={classes.whyItem}>
              <DashboardIcon className={classes.whyIcon} />
              <Typography className={classes.whyTitle}>
                Track Progress
              </Typography>
            </Grid>
          </Grid>
        </Box>

        <Box className={classes.pricingSection}>
          <Typography variant="h6" className={classes.pricingHeader}>
            Pricing Plans
          </Typography>

          <Grid item xs={12} md={6}>
            <Card
              className={classes.pricingCard}
              onClick={() => setShowVetting(true)}
            >
              <CardContent>
                <Typography variant="h6" className={classes.planTitle}>
                  Starter Plan
                </Typography>
                <Typography className={classes.planPrice}>$15/month</Typography>
                <Typography className={classes.planDesc}>
                  Perfect for individual writers pitching to top outlets.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Box>

        <Button
          variant="contained"
          color="primary"
          className={classes.continueBtn}
          onClick={() => setShowVetting(true)}
        >
          Continue to Signup
        </Button>
      </Box>
    </>
  );
};

export default WritersIntro;
