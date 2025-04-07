import React, { useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Tabs,
  Tab,
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  Lightbulb,
  BusinessCenter,
  PersonAdd,
  Description,
  Verified,
  Login,
} from "@mui/icons-material";
import useStyles from "./styles";

const Home = () => {
  const { classes } = useStyles();

  const [tab, setTab] = React.useState(0);

  const navigate = useNavigate();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  const handleGetStarted = () => {
    if (tab === 0) {
      navigate("/writerintro");
    } else {
      navigate("/agenciesintro");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Box className={classes.wrapper}>
      <AppBar
        position="static"
        color="transparent"
        elevation={0}
        className={classes.appbar}
      >
        <Toolbar className={classes.toolbar}>
          <Button
            onClick={() => navigate("/")}
            className={classes.logoButton}
            disableRipple
          >
            <Typography
              variant="h6"
              style={{ fontWeight: 600 }}
              className={classes.logoText}
            >
              WriteFor.co
            </Typography>
          </Button>

          <>
            <Button
              startIcon={<Login />}
              color="primary"
              variant="outlined"
              onClick={() => navigate("/writers/dashboard")}
              sx={{ fontWeight: 500 }}
              className={classes.loginButton}
            >
              LogIn
            </Button>
          </>
        </Toolbar>
      </AppBar>
      <Box className={classes.heroSection}>
        <Typography variant="h4" className={classes.title}>
          Pitch Your Content with WriteFor.co to Top Outlets
        </Typography>
        <Typography variant="subtitle1" className={classes.subtitle}>
          Match your bylines, op-eds, and articles with the right media outlets
          in seconds.
        </Typography>
        <Tabs
          className={classes.tabRoot}
          value={tab}
          onChange={handleChange}
          centered
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab
            icon={<Lightbulb className={classes.tabIcon} />}
            iconPosition="start"
            label="For Writers"
            className={classes.tabLabel}
          />
          <Tab
            icon={<BusinessCenter className={classes.tabIcon} />}
            iconPosition="start"
            label="For Agencies & Teams"
            className={classes.tabLabel}
          />
        </Tabs>

        <Button
          variant="contained"
          color="primary"
          className={classes.startButton}
          onClick={handleGetStarted}
        >
          Get Started
        </Button>
        <Typography variant="subtitle1" className={classes.subtitle}>
          Pitch Smarter with WriteFor.co
        </Typography>
      </Box>

      <Box className={classes.howItWorksSection}>
        <Typography variant="h5" className={classes.howItWorksHeader}>
          How It Works
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={4}>
            <Card className={classes.howCard}>
              <CardContent className={classes.howCardContent}>
                <PersonAdd className={classes.howIcon} />
                <Typography variant="h6" className={classes.howTitle}>
                  1. Sign Up
                </Typography>
                <Typography className={classes.howText}>
                  Create an account in seconds and select your role.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Card className={classes.howCard}>
              <CardContent className={classes.howCardContent}>
                <Description className={classes.howIcon} />
                <Typography variant="h6" className={classes.howTitle}>
                  2. Submit Your Content Idea (Bylines, Op-Eds, Articles)
                </Typography>
                <Typography className={classes.howText}>
                  Enter your pitch concept and preferences in our smart form.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Card className={classes.howCard}>
              <CardContent className={classes.howCardContent}>
                <Verified className={classes.howIcon} />
                <Typography variant="h6" className={classes.howTitle}>
                  3. Get Matched
                </Typography>
                <Typography className={classes.howText}>
                  Get instant matches with top media outlets based on fit.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Home;
