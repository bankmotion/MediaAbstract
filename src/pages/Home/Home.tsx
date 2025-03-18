import React from "react";
import { Tabs, Tab, Box, Typography } from "@mui/material";
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

  return (
    <Box className={classes.wrapper}>
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
            onClick={() => navigate("/onboarding")}
          />
          <Tab
            icon={<BusinessCenter className={classes.tabIcon} />}
            iconPosition="start"
            label="For Agencies&Teams"
            className={classes.tabLabel}
            onClick={() => navigate("/onboarding")}
          />
        </Tabs>

        <Typography variant="subtitle1" className={classes.subtitle}>
          Pitch Smarter with WriteFor.co
        </Typography>
      </Box>
    </Box>
  );
};

export default Home;
