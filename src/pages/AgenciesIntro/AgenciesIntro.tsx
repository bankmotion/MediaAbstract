import React from "react";
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

const AgenciesIntro = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <Box className={classes.introWrapper}>
        <Typography variant="h4" className={classes.title}>
          Welcome, Agencies & Teams
        </Typography>
        <Typography variant="subtitle1" className={classes.subtitle}>
          Collaborate better. Match your clients’ stories with top media.
        </Typography>

        <Box className={classes.pricingSection}>
          <Typography variant="h6" className={classes.pricingHeader}>
            Pricing Plans
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} md={4} className={classes.pricingGrid}>
              <Card className={classes.pricingCard}>
                <CardContent>
                  <Typography variant="h6" className={classes.planTitle}>
                    Basic Plan
                  </Typography>
                  <Typography className={classes.planPrice}>
                    $75/month
                  </Typography>
                  <Typography className={classes.planDesc}>
                    1 user, 5 matches/day, basic media guidelines.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4} className={classes.pricingGrid}>
              <Card className={classes.pricingCard}>
                <CardContent>
                  <Typography variant="h6" className={classes.planTitle}>
                    Team Plan
                  </Typography>
                  <Typography className={classes.planPrice}>
                    $150/month
                  </Typography>
                  <Typography className={classes.planDesc}>
                    3 users, 15 matches/day, CRM export, enhanced outreach
                    tools.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4} className={classes.pricingGrid}>
              <Card className={classes.pricingCard}>
                <CardContent>
                  <Typography variant="h6" className={classes.planTitle}>
                    Enterprise Plan
                  </Typography>
                  <Typography className={classes.planPrice}>
                    $250/month
                  </Typography>
                  <Typography className={classes.planDesc}>
                    Unlimited users, unlimited matches, priority support,
                    premium insights.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
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
    </>
  );
};

export default AgenciesIntro;
