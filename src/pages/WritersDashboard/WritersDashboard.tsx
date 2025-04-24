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
  Fab,
  Zoom,
  Tooltip,
} from "@mui/material";

import { useState } from "react";
import {
  Logout,
  Send,
  CheckCircle,
  CalendarToday,
  Close,
  History as HistoryIcon,
  Send as SendIcon,
  Edit as EditIcon,
  Download as DownloadIcon,
  AccessTime as AccessTimeIcon,
  NotificationsNone as NotificationIcon,
  Info,
} from "@mui/icons-material";
import PersonIcon from "@mui/icons-material/Person";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import EditNoteIcon from "@mui/icons-material/EditNote";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import DescriptionIcon from "@mui/icons-material/Description";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

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
// import MatchesModal from "../../components/MatchesModal/MatchesModal";

const WritersDashboard = () => {
  const { classes } = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const dispatch = useDispatch<AppDispatch>();

  const allOutlets = useSelector(
    (state: RootState) => state.allOutlets.outlets
  );
  const dashboardResult = useSelector((state: RootState) => state.dashboard);
  console.log("Dashboard Result: ", dashboardResult);
  const savedPitches =
    useSelector((state: RootState) => state.savedOutlets.results) || [];

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedOutlet, setSelectedOutlet] = useState<Outlet | null>(null);
  const [expandedOutlets, setExpandedOutlets] = useState<number[]>([]);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showScrollToSaved, setShowScrollToSaved] = useState(false);

  console.log("Saved Pitches: ", savedPitches);

  const navigate = useNavigate();

  const [reminderDialogOpen, setReminderDialogOpen] = useState(false);
  const [selectedPitchId, setSelectedPitchId] = useState<number | null>(null);
  const [reminderDate, setReminderDate] = useState("");

  // const [matchesModalOpen, setMatchesModalOpen] = useState(false);
  // const [selectedPitch, setSelectedPitch] = useState<any>(null);

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

  const nextStepsData =
    dashboardResult.pitchesSent === 0
      ? [
          {
            id: 1,
            icon: <EditNoteIcon />,
            title: "Create Your First Pitch",
            description:
              "Start by crafting a compelling pitch that showcases your story idea.",
            action: "/onboarding",
          },
          {
            id: 2,
            icon: <SearchIcon />,
            title: "Discover Media Outlets",
            description:
              "Find the perfect outlets that match your story's theme and audience.",
            action: "/onboarding",
          },
        ]
      : [
          {
            id: 1,
            icon: <EditNoteIcon />,
            title: "Create a New Pitch",
            description:
              "Craft another compelling pitch to expand your outreach.",
            action: "/onboarding",
          },
          {
            id: 2,
            icon: <DescriptionIcon />,
            title: "Review Saved Outlets",
            description:
              "Check your saved outlets and find new opportunities for your pitches.",
            action: "#my-pitches",
          },
        ];

  const handleNextStepClick = (action: string) => {
    if (action.startsWith("#")) {
      const element = document.getElementById(action.substring(1));
      if (element) {
        const headerOffset = 100;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    } else {
      navigate(action);
    }
  };

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

  const handleScroll = () => {
    if (window.scrollY > 300) {
      setShowScrollTop(true);
    } else {
      setShowScrollTop(false);
    }

    const savedOutletsElement = document.getElementById("saved-outlets");
    if (savedOutletsElement) {
      const rect = savedOutletsElement.getBoundingClientRect();
      setShowScrollToSaved(rect.top < 0);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const scrollToSavedOutlets = () => {
    const element = document.getElementById("saved-outlets");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleOpenMatchesModal = (pitch: any) => {
    // setSelectedPitch(pitch);
    // setMatchesModalOpen(true);
    navigate("/matches", {
      state: {
        pitchTitle: pitch.title,
        matches: pitch.matched_outlets,
        pitchId: pitch.id,
      },
    });
  };

  // const handleCloseMatchesModal = () => {
  //   setSelectedPitch(null);
  //   setMatchesModalOpen(false);
  // };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
            <Box className={classes.headerActions}>
              <Button
                startIcon={<PersonIcon />}
                onClick={() => navigate("/profile")}
                className={classes.profileButton}
              >
                Profile
              </Button>
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
            </Box>
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
            {isMobile ? (
              <>
                <Box sx={{ display: "flex", gap: 2, width: "100%" }}>
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
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  className={classes.newPitchButton}
                  startIcon={<AddCircleOutlineIcon />}
                  onClick={() => navigate("/onboarding")}
                >
                  New Pitch
                </Button>
              </>
            ) : (
              <>
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
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  className={classes.newPitchButton}
                  startIcon={<AddCircleOutlineIcon />}
                  onClick={() => navigate("/onboarding")}
                >
                  New Pitch
                </Button>
              </>
            )}
          </Box>
        </Box>
        <Divider className={classes.divider} />

        <Box className={classes.dashboardLayout}>
          <Box className={classes.mainContent}>
            {!isMobile && (
              <Box className={classes.statsSection}>
                <Box className={classes.statGrid}>
                  <Card className={classes.statCard}>
                    <CardContent>
                      <Box className={classes.statIcon}>
                        <Send />
                      </Box>
                      <Typography variant="h4" className={classes.statNumber}>
                        {dashboardResult.pitchesSent}
                      </Typography>
                      <Typography variant="h6" className={classes.statLabel}>
                        Pitches Sent
                      </Typography>
                    </CardContent>
                  </Card>
                </Box>
                <Box className={classes.statGrid}>
                  <Card className={classes.statCard}>
                    <CardContent>
                      <Box className={classes.statIcon}>
                        <CheckCircle />
                      </Box>
                      <Typography variant="h4" className={classes.statNumber}>
                        {dashboardResult.matchesFound}
                      </Typography>
                      <Typography variant="h6" className={classes.statLabel}>
                        Matches Found
                      </Typography>
                    </CardContent>
                  </Card>
                </Box>
              </Box>
            )}

            <Box id="my-pitches" className={classes.buttonContainer}>
              <Typography variant="h6" className={classes.sectionTitle}>
                <EditNoteIcon />
                My Pitches
              </Typography>
            </Box>

            <Grid container spacing={3} className={classes.pitchGrid}>
              {dashboardResult.myPitches.map((pitch) => (
                <Grid item key={pitch.id}>
                  <Card className={classes.pitchCard}>
                    <CardContent className={classes.pitchCardContent}>
                      <Box className={classes.pitchHeader}>
                        <Typography className={classes.pitchTitle}>
                          {pitch.title}
                        </Typography>
                        <Box
                          className={`${
                            classes.pitchStatus
                          } ${pitch.status.toLowerCase()}`}
                        >
                          <Box
                            className={`${
                              classes.pitchStatusDot
                            } ${pitch.status.toLowerCase()}`}
                          />
                          {pitch.status}
                          {pitch.status === "Matched" && (
                            <Tooltip
                              title="This pitch has been matched to outlets. Review matches and submit to update the status."
                              arrow
                              placement="top"
                            >
                              <Info
                                sx={{
                                  fontSize: "16px",
                                  ml: 0.5,
                                  cursor: "help",
                                  color: "inherit",
                                  opacity: 0.8,
                                  "&:hover": {
                                    opacity: 1,
                                  },
                                }}
                              />
                            </Tooltip>
                          )}
                        </Box>
                      </Box>
                      <Box className={classes.pitchMatches}>
                        <Box className={classes.matchList}>
                          {pitch.matched_outlets
                            .slice(0, 3)
                            .map((matched_outet: any) => (
                              <Box className={classes.matchItem}>
                                <Typography variant="body2">
                                  {matched_outet.name}
                                </Typography>
                                <Typography variant="body2">
                                  {matched_outet.match_percentage}
                                </Typography>
                              </Box>
                            ))}
                        </Box>
                        <Box className={classes.pitchActions}>
                          <Button
                            variant="text"
                            size="small"
                            className={`${classes.pitchActionButton} primary`}
                            onClick={() => handleOpenMatchesModal(pitch)}
                          >
                            See Matches
                          </Button>
                          <Button
                            variant="text"
                            size="small"
                            className={`${classes.pitchActionButton} secondary`}
                            onClick={() => handleOpenReminderDialog(pitch.id)}
                          >
                            Set Reminder
                          </Button>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            <Box className={classes.savedOutletsSection}>
              <Typography variant="h5" className={classes.savedOutletsTitle}>
                Outlets You've Saved for Future Pitches
              </Typography>
              <Box className={classes.savedOutletsGrid}>
                {savedPitches.map((pitch, pitchIndex) => (
                  <Box key={pitchIndex} className={classes.savedPitchCard}>
                    <Box
                      className={classes.savedPitchHeader}
                      onClick={() =>
                        isMobile && handleToggleOutlets(pitchIndex)
                      }
                    >
                      <DescriptionIcon className={classes.savedPitchIcon} />
                      <Typography className={classes.savedPitchTitle}>
                        {pitch.description}
                      </Typography>
                      {isMobile && (
                        <KeyboardArrowDownIcon
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
                          ? "expanded"
                          : ""
                      }`}
                    >
                      {Array.isArray(pitch.outlets) &&
                        pitch.outlets
                          .slice(
                            0,
                            isMobile || expandedOutlets.includes(pitchIndex)
                              ? pitch.outlets.length
                              : 2
                          )
                          .map((outlet, outletIndex) => (
                            <Box
                              key={outletIndex}
                              className={classes.savedOutletItem}
                              onClick={() => handleOpenModal(outlet)}
                            >
                              <Typography className={classes.savedOutletName}>
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
                          <KeyboardArrowDownIcon
                            className={`${classes.moreButtonIcon} ${
                              expandedOutlets.includes(pitchIndex)
                                ? "expanded"
                                : ""
                            }`}
                          />
                        </Box>
                      )}
                    </Box>
                    <Typography className={classes.savedDate}>
                      Saved on:{" "}
                      {new Date(pitch.selected_date).toLocaleDateString()}
                    </Typography>
                  </Box>
                ))}
                {savedPitches.length === 0 && (
                  <Box className={classes.emptyStateCard}>
                    <DescriptionIcon className={classes.emptyStateIcon} />
                    <Typography variant="h6" className={classes.emptyStateText}>
                      No saved outlets yet. Start by saving some outlets to your
                      pitches!
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>

            <Box className={classes.nextStepsSection}>
              <Typography className={classes.sectionHeader}>
                <LightbulbOutlinedIcon />
                Next Steps
              </Typography>
              {nextStepsData.map((step) => (
                <Box
                  key={step.id}
                  className={classes.nextStepItem}
                  onClick={() => handleNextStepClick(step.action)}
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

            <Box className={classes.createPitchContainer}>
              <Button
                variant="contained"
                color="primary"
                className={classes.createPitchButton}
                onClick={() => navigate("/onboarding")}
                startIcon={<AddCircleOutlineIcon />}
              >
                Create a New Pitch
              </Button>
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
      {isMobile && (
        <>
          <Zoom in={showScrollTop}>
            <Fab
              color="primary"
              size="medium"
              onClick={scrollToTop}
              sx={{
                position: "fixed",
                bottom: 60,
                right: 40,
                zIndex: 1000,
              }}
            >
              <KeyboardArrowUpIcon />
            </Fab>
          </Zoom>
          <Zoom in={showScrollToSaved}>
            <Fab
              color="secondary"
              size="medium"
              onClick={scrollToSavedOutlets}
              sx={{
                position: "fixed",
                bottom: 60,
                right: 100,
                zIndex: 1000,
              }}
            >
              <DescriptionIcon />
            </Fab>
          </Zoom>
        </>
      )}
      {/* <MatchesModal
        open={matchesModalOpen}
        handleClose={handleCloseMatchesModal}
        matches={selectedPitch?.matched_outlets || []}
        pitchTitle={selectedPitch?.title || ""}
      /> */}
    </Box>
  );
};

export default WritersDashboard;
