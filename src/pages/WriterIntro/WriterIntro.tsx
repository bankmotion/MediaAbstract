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

const WritersIntro = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();

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

        <Box className={classes.pricingSection}>
          <Typography variant="h6" className={classes.pricingHeader}>
            Pricing Plans
          </Typography>

          {/* <Grid container spacing={3}> */}
          <Grid item xs={12} md={6}>
            <Card className={classes.pricingCard}>
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
          {/* <Grid item xs={12} md={6}>
              <Card className={classes.pricingCard}>
                <CardContent>
                  <Typography variant="h6" className={classes.planTitle}>
                    Pro Plan
                  </Typography>
                  <Typography className={classes.planPrice}>
                    $45/month
                  </Typography>
                  <Typography className={classes.planDesc}>
                    More features, faster matches, advanced outlet insights.
                  </Typography>
                </CardContent>
              </Card>
            </Grid> */}
          {/* </Grid> */}
        </Box>

        <Button
          variant="contained"
          color="primary"
          className={classes.continueBtn}
          onClick={() => navigate("/signup/writers")}
        >
          Continue to Signup
        </Button>
      </Box>
    </>
  );
};

export default WritersIntro;
