// src/pages/dashboard/AgenciesDashboard.tsx
import React from "react";
import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  Grid,
  AppBar,
  Toolbar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  People,
  AddCircleOutline,
  Logout,
  Assessment,
  Download,
} from "@mui/icons-material";
import useStyles from "./styles";

const AgenciesDashboard = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();

  const teamPitches = [
    {
      id: 1,
      name: "Sarah",
      client: "GreenTech Ltd",
      title: "Sustainable Energy",
      status: "Matched",
      matches: 10,
    },
    {
      id: 2,
      name: "John",
      client: "MedAI Group",
      title: "AI & Data Privacy",
      status: "Submitted",
      matches: 5,
    },
  ];

  const currentPlan = "$150/month"; // Dynamically render in real case

  const handleExportCSV = () => {
    const headers = ["Pitch", "Client", "Status", "Matches"];
    const rows = teamPitches.map((pitch) => [
      pitch.title,
      pitch.client,
      pitch.status,
      pitch.matches ?? "",
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "team_pitches.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
              startIcon={<Logout />}
              color="primary"
              variant="outlined"
              onClick={() => navigate("/")}
              sx={{ fontWeight: 500 }}
              className={classes.logoutButton}
            >
              LogOut
            </Button>
          </>
        </Toolbar>
      </AppBar>
      <Box className={classes.body}>
        <Grid container spacing={3} className={classes.statsSection}>
          <Grid item xs={12} sm={6} md={4} className={classes.statGrid}>
            <Card className={classes.statCard}>
              <CardContent>
                <Assessment className={classes.statIcon} />
                <Typography variant="h6">Matches</Typography>
                <Typography className={classes.statNumber}>15</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4} className={classes.statGrid}>
            <Card className={classes.statCard}>
              <CardContent>
                <People className={classes.statIcon} />
                <Typography variant="h6">Clients</Typography>
                <Typography className={classes.statNumber}>3</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Box className={classes.buttonRow}>
          <Button
            variant="contained"
            //color="primary"
            className={classes.newPitchBtn}
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

        <Box className={classes.sectionHeaderRow}>
          <Typography variant="h6" className={classes.sectionHeader}>
            Team Pitches
          </Typography>
          <Button
            startIcon={<Download />}
            variant="outlined"
            size="small"
            className={classes.exportButton}
            onClick={handleExportCSV}
          >
            Export Pitches
          </Button>
        </Box>

        {teamPitches.map((pitch) => (
          <Card key={pitch.id} className={classes.pitchCard}>
            <CardContent>
              <Typography variant="h6" className={classes.pitchTitle}>
                {pitch.name}: {pitch.title}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Client: {pitch.client}
              </Typography>
              <Typography
                variant="body2"
                color={pitch.status === "Matched" ? "success" : "primary"}
              >
                Status: {pitch.status}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default AgenciesDashboard;
