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
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Tooltip,
} from "@mui/material";

import { useState } from "react";
import {
  Logout,
  Send,
  CheckCircle,
  CalendarToday,
  Close,
  Info,
  ExpandMore,
  Inbox,
  KeyboardArrowDown,
  History as HistoryIcon,
  Send as SendIcon,
  Edit as EditIcon,
  Download as DownloadIcon,
  AccessTime as AccessTimeIcon,
  NotificationsNone as NotificationIcon,
} from "@mui/icons-material";
import PersonIcon from "@mui/icons-material/Person";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import EditNoteIcon from "@mui/icons-material/EditNote";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MenuIcon from "@mui/icons-material/Menu";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

import { useNavigate } from "react-router-dom";
import useStyles from "./styles";

import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { fetchDashboardData } from "../../redux/slices/dashboardSlice";
import { fetchSavedOutlets } from "../../redux/slices/savePitchSlice";
import { fetchAllOutlets } from "../../redux/slices/outletsSlice";
import { Outlet } from "../../redux/slices/outletsSlice";
import OutletDetailModal from "../../components/OutletDetailModal/OutletDetailModal";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const WritersDashboard = () => {
  const { classes } = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const dispatch = useDispatch<AppDispatch>();

  const allOutlets = useSelector(
    (state: RootState) => state.allOutlets.outlets
  );
  const dashboardResult = useSelector((state: RootState) => state.dashboard);
  const savedPitches =
    useSelector((state: RootState) => state.savedOutlets.results) || [];

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedOutlet, setSelectedOutlet] = useState<Outlet | null>(null);
  const [expandedOutlets, setExpandedOutlets] = useState<number[]>([]);

  console.log("Saved Pitches: ", savedPitches);

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
    {
      id: 1,
      action: "Submitted 'AI & Data Privacy' to Forbes",
      type: "submission",
      date: "3/21/2025",
      time: "2:30 PM",
    },
    {
      id: 2,
      action: "Exported team pitches for weekly review",
      type: "export",
      date: "3/21/2025",
      time: "11:45 AM",
    },
    {
      id: 3,
      action: "Updated 'ClimateTech Trends' pitch content",
      type: "edit",
      date: "3/20/2025",
      time: "4:15 PM",
    },
    {
      id: 4,
      action: "Set follow-up reminder for TechCrunch pitch",
      type: "reminder",
      date: "3/20/2025",
      time: "1:20 PM",
    },
    {
      id: 5,
      action: "Submitted 'Future of Remote Work' to Wired",
      type: "submission",
      date: "3/19/2025",
      time: "5:45 PM",
    },
  ]);

  const nextStepsData = [
    {
      id: 1,
      icon: <EditNoteIcon />,
      title: "Create Your First Pitch",
      description:
        "Start by crafting a compelling pitch that showcases your story idea.",
      action: "/create-pitch",
    },
    {
      id: 2,
      icon: <SearchIcon />,
      title: "Discover Media Outlets",
      description:
        "Find the perfect outlets that match your story's theme and audience.",
      action: "/outlets",
    },
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
        {
          id: Date.now(),
          action: `Reminder set for pitch ID ${selectedPitchId} on ${reminderDate}`,
          type: "reminder",
          date: new Date(reminderDate).toLocaleDateString(),
          time: new Date(reminderDate).toLocaleTimeString(),
        },
      ]);
      setReminderDialogOpen(false);
    }
  };

  const handleToggleOutlets = (pitchIndex: number) => {
    setExpandedOutlets((prev) =>
      prev.includes(pitchIndex)
        ? prev.filter((index) => index !== pitchIndex)
        : [...prev, pitchIndex]
    );
  };

  const handleOpenModal = (outletName: string) => {
    const outlet = allOutlets.find((p) => p.name === outletName);
    if (outlet) {
      setSelectedOutlet(outlet);
      setModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setSelectedOutlet(null);
    setModalOpen(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(fetchDashboardData());
    dispatch(fetchSavedOutlets());
    dispatch(fetchAllOutlets());
  }, [dispatch]);

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
            <Avatar
              className={classes.avatar}
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
              alt="User Avatar"
            >
              <PersonIcon />
            </Avatar>
            <Typography className={classes.welcomeText}>
              Welcome back, Jane
            </Typography>
          </Box>
          <Box className={classes.userStats}>
            <Box className={classes.statItem}>
              <Typography className={classes.statValue}>
                {dashboardResult.pitchesSent}
              </Typography>
              <Typography className={classes.statLabel}>
                Pitches Sent
              </Typography>
            </Box>
            <Box className={classes.statItem}>
              <Typography className={classes.statValue}>
                {dashboardResult.matchesFound}
              </Typography>
              <Typography className={classes.statLabel}>
                Matches Found
              </Typography>
            </Box>
          </Box>
        </Box>
        <Divider className={classes.divider} />

        <Box className={classes.dashboardLayout}>
          <Box className={classes.mainContent}>
            <Box className={classes.nextStepsSection}>
              <Typography className={classes.sectionHeader}>
                <LightbulbOutlinedIcon />
                Next Steps
              </Typography>
              {nextStepsData.map((step) => (
                <Box
                  key={step.id}
                  className={classes.nextStepItem}
                  onClick={() => navigate(step.action)}
                >
                  <Box className={classes.nextStepIcon}>{step.icon}</Box>
                  <Box className={classes.nextStepContent}>
                    <Typography className={classes.nextStepTitle}>
                      {step.title}
                    </Typography>
                    <Typography className={classes.nextStepDescription}>
                      {step.description}
                    </Typography>
                  </Box>
                  <ArrowForwardIcon className={classes.nextStepArrow} />
                </Box>
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
                                backgroundColor:
                                  pitch.status === "Matched" ? "green" : "blue",
                              }}
                              className={classes.pitchStatus}
                            />
                            <Typography variant="body2" color="textSecondary">
                              {pitch.status}
                            </Typography>
                          </Box>
                        </Tooltip>
                      </Box>{" "}
                      <Typography variant="body2">
                        Matches: {pitch.matches.join(", ")} |{" "}
                        <Button
                          size="small"
                          onClick={() => navigate("/results")}
                        >
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

            <Box className={classes.savedOutletsSection}>
              <Typography variant="h6" className={classes.sectionTitle}>
                Saved Outlets
              </Typography>
              {Array.isArray(savedPitches) && savedPitches.length === 0 ? (
                <Card className={classes.emptyStateCard}>
                  <Inbox className={classes.emptyStateIcon} />
                  <Typography
                    variant="body1"
                    className={classes.emptyStateText}
                  >
                    No saved outlets yet. Start by pitching your ideas to find
                    matching outlets!
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddCircleOutlineIcon />}
                    onClick={() => navigate("/onboarding")}
                    className={classes.actionButton}
                  >
                    Create New Pitch
                  </Button>
                </Card>
              ) : (
                <Grid
                  item
                  container
                  spacing={2}
                  className={classes.savedOutletsGrid}
                >
                  {Array.isArray(savedPitches) &&
                    savedPitches.map((pitch, pitchIndex) => (
                      <Grid key={pitchIndex}>
                        <Card className={classes.savedPitchCard}>
                          <Box
                            className={classes.savedPitchHeader}
                            onClick={() =>
                              isMobile && handleToggleOutlets(pitchIndex)
                            }
                          >
                            <Info className={classes.savedPitchIcon} />
                            <Typography className={classes.savedPitchTitle}>
                              {pitch.description}
                            </Typography>
                            {isMobile && (
                              <ExpandMore
                                className={`${classes.savedPitchDropdown} ${
                                  expandedOutlets.includes(pitchIndex)
                                    ? "expanded"
                                    : ""
                                }`}
                              />
                            )}
                          </Box>
                          <Box
                            className={`${classes.savedOutletsList} ${
                              !isMobile || expandedOutlets.includes(pitchIndex)
                                ? expandedOutlets.includes(pitchIndex)
                                  ? "expanded"
                                  : "initial"
                                : ""
                            }`}
                          >
                            {Array.isArray(pitch.outlets) &&
                              pitch.outlets
                                .slice(
                                  0,
                                  isMobile ||
                                    expandedOutlets.includes(pitchIndex)
                                    ? pitch.outlets.length
                                    : 2
                                )
                                .map((outlet, outletIndex) => (
                                  <Box
                                    key={outletIndex}
                                    className={classes.savedOutletItem}
                                    onClick={() => handleOpenModal(outlet)}
                                  >
                                    <Typography
                                      className={classes.savedOutletName}
                                    >
                                      {outlet}
                                    </Typography>
                                  </Box>
                                ))}
                            {!isMobile && pitch.outlets.length > 2 && (
                              <Box
                                className={classes.moreButton}
                                onClick={() => handleToggleOutlets(pitchIndex)}
                              >
                                <Typography className={classes.moreButtonText}>
                                  {expandedOutlets.includes(pitchIndex)
                                    ? "Show Less"
                                    : `Show ${pitch.outlets.length - 2} More`}
                                </Typography>
                                <KeyboardArrowDown
                                  className={`${classes.moreButtonIcon} ${
                                    expandedOutlets.includes(pitchIndex)
                                      ? "expanded"
                                      : ""
                                  }`}
                                />
                              </Box>
                            )}
                          </Box>
                        </Card>
                      </Grid>
                    ))}
                </Grid>
              )}
            </Box>
          </Box>

          {/* Activity Sidebar */}
          <Box className={classes.activitySidebar}>
            <Box className={classes.activityHeader}>
              <HistoryIcon />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Recent Activity
              </Typography>
            </Box>
            <Box className={classes.activityContent}>
              {activityLog.length === 0 ? (
                <Box className={classes.noActivity}>
                  <NotificationIcon />
                  <Typography variant="body1">
                    No recent activity to show
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Your recent actions will appear here
                  </Typography>
                </Box>
              ) : (
                activityLog.map((entry) => {
                  let icon;
                  if (entry.type === "submission") {
                    icon = <SendIcon fontSize="small" />;
                  } else if (entry.type === "export") {
                    icon = <DownloadIcon fontSize="small" />;
                  } else {
                    icon = <EditIcon fontSize="small" />;
                  }

                  return (
                    <Box key={entry.id} className={classes.activityItem}>
                      <Box className={classes.activityIcon}>{icon}</Box>
                      <Box className={classes.activityText}>
                        <Typography variant="body2" className="action">
                          {entry.action}
                        </Typography>
                        <Typography variant="body2" className="timestamp">
                          <AccessTimeIcon sx={{ fontSize: "0.9rem" }} />
                          {entry.date} at {entry.time}
                        </Typography>
                      </Box>
                    </Box>
                  );
                })
              )}
            </Box>
          </Box>
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
      <OutletDetailModal
        open={modalOpen}
        handleClose={handleCloseModal}
        outlet={selectedOutlet}
      />
    </Box>
  );
};

export default WritersDashboard;
