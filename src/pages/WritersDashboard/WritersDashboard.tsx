// src/pages/dashboard/WritersDashboard.tsx
import React, { useEffect } from "react";
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  List,
  ListItem,
} from "@mui/material";

import { Chip, Tooltip, Link as MuiLink } from "@mui/material";
import { useState } from "react";
import {
  Logout,
  Send,
  CheckCircle,
  CalendarToday,
  Close,
} from "@mui/icons-material";
import PersonIcon from "@mui/icons-material/Person";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import { useNavigate } from "react-router-dom";
import useStyles from "./styles";

import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { fetchDashboardData } from "../../redux/slices/dashboardSlice";
import { fetchSavedOutlets } from "../../redux/slices/savePitchSlice";

const WritersDashboard = () => {
  const { classes } = useStyles();

  const dispatch = useDispatch<AppDispatch>();
  const dashboardResult = useSelector((state: RootState) => state.dashboard);
  const savedPitches =
    useSelector((state: RootState) => state.savedOutlets.results) || [];

  console.log("Saved Pitches: ", savedPitches);

  useEffect(() => {
    dispatch(fetchDashboardData());
    dispatch(fetchSavedOutlets());
  }, [dispatch]);

  const navigate = useNavigate();

  const [reminderDialogOpen, setReminderDialogOpen] = useState(false);
  const [selectedPitchId, setSelectedPitchId] = useState<number | null>(null);
  const [reminderDate, setReminderDate] = useState("");

  const pitches = [
    {
      id: 1,
      title: "AI for Healthcare",
      status: "Submitted",
      matches: ["Forbes (85%)", "Wired (78%)"],
      followUp: "2025-03-27",
    },
    {
      id: 2,
      title: "ClimateTech Trends",
      status: "Matched",
      matches: ["TechCrunch (92%)", "The Verge (88%)"],
      followUp: "2025-03-30",
    },
  ];

  const [activityLog, setActivityLog] = useState([
    "3/20/2025: Submitted 'AI & Data Privacy'",
    "3/21/2025: Exported team pitches",
  ]);

  const nextStepsPrompt = [
    "Follow up on 'AI for Healthcare' with Forbes",
    "Submit another pitch!",
  ];

  const handleOpenReminderDialog = (pitchId: number) => {
    setSelectedPitchId(pitchId);
    setReminderDate("");
    setReminderDialogOpen(true);
  };

  const handleSaveReminder = () => {
    if (selectedPitchId && reminderDate) {
      setActivityLog((prevLog) => [
        ...prevLog,
        `Reminder set for pitch ID ${selectedPitchId} on ${reminderDate}`,
      ]);
      setReminderDialogOpen(false);
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
        <Box mb={3} className={classes.nextStepsSection}>
          <Typography variant="h6" className={classes.sectionHeader}>
            Next Steps
          </Typography>
          {nextStepsPrompt.map((step, i) => (
            <Typography key={i} variant="body1">
              • {step}
            </Typography>
          ))}
        </Box>

        <Grid container spacing={3} className={classes.statsSection}>
          <Grid item xs={12} sm={6} md={4} className={classes.statGrid}>
            <Card className={classes.statCard}>
              <CardContent>
                <Send className={classes.statIcon} />
                <Typography variant="h6">Pitches Sent</Typography>
                <Typography
                  variant="h4"
                  color="primary"
                  className={classes.statNumber}
                >
                  {dashboardResult.pitchesSent}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4} className={classes.statGrid}>
            <Card className={classes.statCard}>
              <CardContent>
                <CheckCircle className={classes.statIcon} />
                <Typography variant="h6">Matches Found</Typography>
                <Typography
                  variant="h4"
                  color="primary"
                  className={classes.statNumber}
                >
                  {dashboardResult.matchesFound}
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
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography className={classes.pitchTitle}>
                      {pitch.title}
                    </Typography>
                    <Tooltip title={pitch.status}>
                      <Box display="flex" alignItems="center">
                        <Box
                          sx={{
                            width: 10,
                            height: 10,
                            borderRadius: "50%",
                            backgroundColor:
                              pitch.status === "Matched" ? "green" : "blue",
                            marginRight: 1,
                          }}
                        />
                        <Typography variant="body2" color="textSecondary">
                          {pitch.status}
                        </Typography>
                      </Box>
                    </Tooltip>
                  </Box>{" "}
                  <Typography variant="body2">
                    Matches: {pitch.matches.join(", ")} |{" "}
                    <Button size="small" onClick={() => navigate("/results")}>
                      See Matches
                    </Button>
                  </Typography>
                  <Typography variant="body2">
                    Follow-Up: {pitch.followUp} |{" "}
                    <Button
                      size="small"
                      onClick={() => handleOpenReminderDialog(pitch.id)}
                    >
                      Set Reminder
                    </Button>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Box className="mt-6">
          <Typography variant="h6" className={classes.sectionTitle}>
            Saved Outlets
          </Typography>
          {/* {savedPitches.length === 0 ? (
            <Typography>No saved outlets yet.</Typography>
          ) : (
            <List>
              {savedPitches.map((pitch, pitchIndex) => (
                <Box key={pitchIndex} mb={2}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Pitch: {pitch.description}
                  </Typography>
                  <List>
                    {pitch.outlets.map((outlet, outletIndex) => (
                      <ListItem key={outletIndex}>• {outlet}</ListItem>
                    ))}
                  </List>
                </Box>
              ))}
            </List>
          )} */}

          {Array.isArray(savedPitches) && savedPitches.length === 0 ? (
            <Typography>No saved outlets yet.</Typography>
          ) : (
            <List>
              {Array.isArray(savedPitches) &&
                savedPitches.map((pitch, pitchIndex) => (
                  <Box key={pitchIndex} mb={2}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      Pitch: {pitch.description}{" "}
                      {/* Use pitch_id instead of description */}
                    </Typography>
                    <List>
                      {Array.isArray(pitch.outlets) &&
                        pitch.outlets.map((outlet, outletIndex) => (
                          <ListItem key={outletIndex}>• {outlet}</ListItem>
                        ))}
                    </List>
                  </Box>
                ))}
            </List>
          )}
        </Box>

        <Box mt={4}>
          <Typography variant="h6" className={classes.sectionTitle}>
            Activity
          </Typography>
          <Card className={classes.pitchCard}>
            <CardContent>
              {activityLog.map((entry, index) => (
                <Typography key={index} variant="body2" gutterBottom>
                  • {entry}
                </Typography>
              ))}
            </CardContent>
          </Card>
        </Box>
        <Dialog
          open={reminderDialogOpen}
          onClose={() => setReminderDialogOpen(false)}
          maxWidth="xs"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: 3,
              p: 2,
              boxShadow: 10,
              background: "#fff",
            },
          }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            px={2}
            pt={1}
          >
            <Box display="flex" alignItems="center" sx={{ margin: "10px" }}>
              <CalendarToday sx={{ mr: 1, color: "primary.main" }} />
              <Typography variant="h6" fontWeight={600}>
                Set Follow-Up Reminder
              </Typography>
            </Box>
            <IconButton
              onClick={() => setReminderDialogOpen(false)}
              size="small"
            >
              <Close />
            </IconButton>
          </Box>

          <DialogContent sx={{ mt: 2, marginBottom: "15px" }}>
            <Typography
              variant="body2"
              color="text.secondary"
              mb={1}
              sx={{ margin: "15px" }}
            >
              Choose the date you'd like to be reminded to follow up.
            </Typography>

            <TextField
              label="Reminder Date"
              type="date"
              value={reminderDate}
              onChange={(e) => setReminderDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              fullWidth
              InputProps={{
                sx: {
                  borderRadius: 2,
                  backgroundColor: "#f9f9f9",
                },
              }}
            />
          </DialogContent>

          <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button
              onClick={() => setReminderDialogOpen(false)}
              variant="text"
              sx={{ textTransform: "none", fontWeight: 500 }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveReminder}
              variant="contained"
              disabled={!reminderDate}
              sx={{
                textTransform: "none",
                borderRadius: 2,
                px: 3,
                fontWeight: 600,
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
              }}
            >
              Save Reminder
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default WritersDashboard;
