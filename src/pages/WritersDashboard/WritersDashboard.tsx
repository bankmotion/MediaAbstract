// src/pages/dashboard/WritersDashboard.tsx
import React from "react";
import {
  Box,
  Button,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Divider,
  AppBar,
  Toolbar,
} from "@mui/material";

import { Logout, Send, CheckCircle } from "@mui/icons-material";
import PersonIcon from "@mui/icons-material/Person";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import { useNavigate } from "react-router-dom";
import useStyles from "./styles";

const WritersDashboard = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();

  const pitches = [
    { id: 1, title: "AI for Healthcare", status: "Submitted" },
    { id: 2, title: "ClimateTech Trends", status: "Matched" },
  ];

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
        <Box className={classes.bodyHeader}>
          <Box className={classes.userInfo}>
            <Avatar className={classes.avatar}>
              <PersonIcon />
            </Avatar>
            <Typography className={classes.welcomeText}>
              Welcome, Jane
            </Typography>
          </Box>
        </Box>

        <Divider className={classes.divider} />

        <Grid container spacing={3} className={classes.statsSection}>
          <Grid item xs={12} sm={6} md={4}>
            <Card className={classes.statCard}>
              <CardContent>
                <Send className={classes.statIcon} />
                <Typography variant="h6">Pitches Sent</Typography>
                <Typography
                  variant="h4"
                  color="primary"
                  className={classes.statNumber}
                >
                  5
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card className={classes.statCard}>
              <CardContent>
                <CheckCircle className={classes.statIcon} />
                <Typography variant="h6">Matches Found</Typography>
                <Typography
                  variant="h4"
                  color="primary"
                  className={classes.statNumber}
                >
                  15
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Box className={classes.buttonContainer}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            className={classes.actionButton}
            startIcon={<AddCircleOutlineIcon />}
            onClick={() => navigate("/onboarding")}
          >
            New Pitch
          </Button>
        </Box>

        <Typography variant="h6" className={classes.sectionTitle}>
          My Pitches
        </Typography>
        <Grid container spacing={2}>
          {pitches.map((pitch) => (
            <Grid item xs={12} sm={6} md={4} key={pitch.id}>
              <Card className={classes.pitchCard}>
                <CardContent>
                  <Typography className={classes.pitchTitle}>
                    {pitch.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Status: {pitch.status}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default WritersDashboard;
