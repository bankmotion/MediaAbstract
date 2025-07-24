import React, { useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import { Lightbulb, ListChecks, Gauge } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useStyles from "./styles";
import Navbar from "../../components/Navbar/Nabvar";

const AgenciesIntro = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Box className={classes.wrapper}>
      <Navbar />
      <Box className={classes.introWrapper}>
        <Typography variant="h4" className={classes.title}>
          Welcome, Brands, Content Teams, and Agencies
        </Typography>
        <Typography variant="subtitle1" className={classes.subtitle}>
          Collaborate better. Match your clients' stories with top media.
        </Typography>

        <Typography className={classes.tagline}>
          Match Your Pitch in Seconds
        </Typography>

        <Box className={classes.whySection}>
          <Typography variant="h5" className={classes.whyTitle}>
            Why WriteFor.co?
          </Typography>
          <Typography className={classes.whyDescription}>
            Built for content pitching—perfect for bylines, op-eds, commentary,
            columns, and freelance articles.
          </Typography>
          <Grid container spacing={3} className={classes.iconTextGrid}>
            <Grid item xs={12} md={4}>
              <Box className={classes.iconTextItem}>
                <Lightbulb size={40} className={classes.icon} />
                <Typography className={classes.iconTextTitle}>
                  Pitch Smarter
                </Typography>
                <Typography className={classes.iconTextDesc}>
                  Leverage AI to fine-tune pitches that resonate.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box className={classes.iconTextItem}>
                <ListChecks size={40} className={classes.icon} />
                <Typography className={classes.iconTextTitle}>
                  Get Matches Fast
                </Typography>
                <Typography className={classes.iconTextDesc}>
                  Rapidly discover media outlets aligned with your story.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box className={classes.iconTextItem}>
                <Gauge size={40} className={classes.icon} />
                <Typography className={classes.iconTextTitle}>
                  Track Progress
                </Typography>
                <Typography className={classes.iconTextDesc}>
                  Monitor outreach and refine your strategy easily.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Box className={classes.pricingSection}>
          <Typography variant="h6" className={classes.pricingHeader}>
            Pricing Plans
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} md={4} className={classes.pricingGrid}>
              <Card
                className={classes.pricingCard}
                onClick={() => navigate("/signup/agencies")}
              >
                <CardContent>
                  <Typography variant="h6" className={classes.planTitle}>
                    Basic Plan
                  </Typography>
                  <Box
                    onClick={() => navigate("/signup/agencies")}
                    sx={{ cursor: "pointer" }}
                    role="button"
                    aria-label="Navigate to Signup"
                    tabIndex={0}
                  >
                    <Typography className={classes.planPrice}>
                      $50/month
                    </Typography>
                  </Box>
                  <Typography className={classes.planDesc}>
                    1 user, 5 matches/day, basic media guidelines.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4} className={classes.pricingGrid}>
              <Card
                className={classes.pricingCard}
                onClick={() => navigate("/signup/agencies")}
              >
                <CardContent>
                  <Typography variant="h6" className={classes.planTitle}>
                    Team Plan
                  </Typography>
                  <Box
                    onClick={() => navigate("/signup/agencies")}
                    sx={{ cursor: "pointer" }}
                    role="button"
                    aria-label="Navigate to Signup"
                    tabIndex={0}
                  >
                    <Typography className={classes.planPrice}>
                      $120/month
                    </Typography>
                  </Box>
                  <Typography className={classes.planDesc}>
                    3 users, 15 matches/day, upgraded pitch tracking.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4} className={classes.pricingGrid}>
              <Card
                className={classes.pricingCard}
                onClick={() => navigate("/signup/agencies")}
              >
                <CardContent>
                  <Typography variant="h6" className={classes.planTitle}>
                    Enterprise Plan
                  </Typography>
                  <Box
                    onClick={() => navigate("/signup/agencies")}
                    sx={{ cursor: "pointer" }}
                    role="button"
                    aria-label="Navigate to Signup"
                    tabIndex={0}
                  >
                    <Typography className={classes.planPrice}>
                      $200/month
                    </Typography>
                  </Box>
                  <Typography className={classes.planDesc}>
                    Unlimited users, unlimited matches, priority support,
                    premium insights.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Box className={classes.compareLinkContainer}>
            <Button
              variant="text"
              color="primary"
              onClick={() => navigate("/pricing-comparison")}
              className={classes.compareLink}
            >
              Compare all plans in detail →
            </Button>
          </Box>
        </Box>

        <Button
          variant="contained"
          color="primary"
          className={classes.continueBtn}
          onClick={() => navigate("/signup/agencies")}
        >
          Continue to Signup
        </Button>
      </Box>
    </Box>
  );
};

export default AgenciesIntro;
