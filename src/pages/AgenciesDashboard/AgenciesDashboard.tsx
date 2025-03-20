// src/pages/dashboard/AgenciesDashboard.tsx
import React from "react";
import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  People,
  AddCircleOutline,
  Logout,
  Assessment,
} from "@mui/icons-material";
import useStyles from "./styles";

const AgenciesDashboard = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();

  const teamPitches = [
    {
      id: 1,
      client: "GreenTech Ltd",
      title: "Sustainable Energy",
      status: "Matched",
    },
    {
      id: 2,
      client: "MedAI Group",
      title: "AI & Data Privacy",
      status: "Submitted",
    },
  ];

  const currentPlan = "$150/month"; // Dynamically render in real case

  return (
    <Box className={classes.wrapper}>
      <Box className={classes.header}>
        <Typography className={classes.welcomeText}>
          Welcome, Team GreenSpark
        </Typography>
        <Button
          startIcon={<Logout />}
          variant="outlined"
          color="primary"
          className={classes.logoutButton}
          onClick={() => navigate("/")}
        >
          Logout
        </Button>
      </Box>

      <Grid container spacing={3} className={classes.statsSection}>
        <Grid item xs={12} sm={6} md={4}>
          <Card className={classes.statCard}>
            <CardContent>
              <Assessment className={classes.statIcon} />
              <Typography variant="h6">Matches</Typography>
              <Typography className={classes.statNumber}>15</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card className={classes.statCard}>
            <CardContent>
              <People className={classes.statIcon} />
              <Typography variant="h6">Team Members</Typography>
              <Typography className={classes.statNumber}>3</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box className={classes.buttonRow}>
        <Button
          variant="contained"
          color="primary"
          className={classes.primaryActionBtn}
          onClick={() => navigate("/onboarding")}
        >
          New Client Pitch
        </Button>

        {(currentPlan === "$150/month" || currentPlan === "$250/month") && (
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<AddCircleOutline />}
            className={classes.addUserBtn}
            onClick={() => alert("Redirect to Add User functionality")}
          >
            Add User
          </Button>
        )}
      </Box>

      <Typography variant="h6" className={classes.sectionHeader}>
        Team Pitches
      </Typography>

      {teamPitches.map((pitch) => (
        <Card key={pitch.id} className={classes.pitchCard}>
          <CardContent>
            <Typography variant="h6" className={classes.pitchTitle}>
              {pitch.title}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Client: {pitch.client}
            </Typography>
            <Typography variant="body2" color="primary">
              Status: {pitch.status}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default AgenciesDashboard;
