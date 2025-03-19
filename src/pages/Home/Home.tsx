import React from "react";
import { Tabs, Tab, Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Lightbulb, BusinessCenter } from "@mui/icons-material";
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
  const handleLogin = () => {
    navigate("/onboarding"); // Redirect to dashboard after login
  };

  return (
    <Box className={classes.wrapper}>
      <Box className={classes.loginWrapper}>
        <Button
          variant="outlined"
          color="primary"
          className={classes.loginButton}
          onClick={handleLogin}
        >
          Login
        </Button>
      </Box>
      <Box className={classes.heroSection}>
        <Typography variant="h4" className={classes.title}>
          WriteFor.co
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
            //onClick={() => navigate("/login")}
          />
          <Tab
            icon={<BusinessCenter className={classes.tabIcon} />}
            iconPosition="start"
            label="For Agencies & Teams"
            className={classes.tabLabel}
            //onClick={() => navigate("/login")}
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
    </Box>
  );
};

export default Home;
