// src/pages/dashboard/AgenciesDashboard.tsx
import React, { useEffect, useState } from "react";
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
  Alert,
  Badge,
  DialogTitle,
  Snackbar,
  Chip,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
} from "@mui/material";
import {
  Logout,
  Send,
  CheckCircle,
  CalendarToday,
  Close,
  History as HistoryIcon,
  Send as SendIcon,
  Edit as EditIcon,
  AccessTime as AccessTimeIcon,
  NotificationsNone as NotificationIcon,
  Info,
  Business,
  Group,
  Star,
  Email,
  FilterList,
  Warning,
  Person as PersonIcon,
  AddCircleOutline as AddCircleOutlineIcon,
  LightbulbOutlined as LightbulbOutlinedIcon,
  ArrowForward as ArrowForwardIcon,
  EditNote as EditNoteIcon,
  Search as SearchIcon,
  Description as DescriptionIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
  Done as DoneIcon,
  Mail as MailIcon,
  Update as UpdateIcon,
  Comment as CommentIcon,
  Notifications,
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";
import useStyles from "./styles";

const AgenciesDashboard = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();

  // State for plan tier and features
  const [currentPlan, setCurrentPlan] = useState("$150/month");
  const [planFeatures, setPlanFeatures] = useState({
    maxUsers: 3,
    maxMatchesPerDay: 15,
    hasEnhancedTools: true,
    hasPremiumInsights: false,
    hasPrioritySupport: false,
  });

  // State for notifications
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "new_user",
      message: "New team member joined: John Doe",
      date: "2024-03-21",
      time: "2:30 PM",
      read: false,
    },
    {
      id: 2,
      type: "plan_upgrade",
      message: "Team upgraded to Enterprise plan",
      date: "2024-03-20",
      time: "1:45 PM",
      read: false,
    },
  ]);

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
      action: "Updated 'ClimateTech Trends' pitch content",
      type: "edit",
      date: "3/20/2025",
      time: "4:15 PM",
    },
  ]);

  const [reminderDialogOpen, setReminderDialogOpen] = useState(false);
  const [selectedPitchId, setSelectedPitchId] = useState<number | null>(null);
  const [reminderDate, setReminderDate] = useState("");
  const [reminderTime, setReminderTime] = useState("12:00");

  const teamPitches = [
    {
      id: 1,
      name: "Sarah",
      client: "GreenTech Ltd",
      title: "Sustainable Energy",
      status: "Matched",
      matches: ["Forbes (85%)", "Wired (78%)"],
      followUp: "3/27/2025",
      contactEmail: "editor@forbes.com",
    },
    {
      id: 2,
      name: "John",
      client: "MedAI Group",
      title: "AI & Data Privacy",
      status: "Submitted",
      matches: ["TechCrunch (70%)"],
      followUp: "3/28/2025",
      contactEmail: "pitch@techcrunch.com",
    },
  ];

  const nextStepsData = [
    {
      id: 1,
      icon: <EditNoteIcon />,
      title: "Create a New Pitch",
      description: "Craft another compelling pitch to expand your outreach.",
      action: "/onboarding",
    },
    {
      id: 2,
      icon: <DescriptionIcon />,
      title: "Review Team Pitches",
      description: "Check your team's pitches and find new opportunities.",
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
    setReminderTime("12:00");
    setReminderDialogOpen(true);
  };

  const handleSaveReminder = () => {
    if (selectedPitchId && reminderDate) {
      setActivityLog((prev) => [
        {
          id: Date.now(),
          action: `Reminder set for pitch ID ${selectedPitchId} on ${reminderDate}`,
          type: "reminder",
          date: new Date().toLocaleDateString(),
          time: new Date().toLocaleTimeString(),
        },
        ...prev,
      ]);
      setReminderDialogOpen(false);
    }
  };

  const [showScrollTop, setShowScrollTop] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 300) {
      setShowScrollTop(true);
    } else {
      setShowScrollTop(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

          <Box className={classes.headerActions}>
            {planFeatures.hasPrioritySupport && (
              <Chip
                icon={<Star />}
                label="Priority Support"
                color="primary"
                variant="outlined"
                className={classes.prioritySupportChip}
              />
            )}
            <Badge
              badgeContent={notifications.filter((n) => !n.read).length}
              color="error"
            >
              <IconButton>
                <Notifications />
              </IconButton>
            </Badge>
            <Button
              startIcon={<Logout />}
              color="primary"
              variant="outlined"
              onClick={() => navigate("/")}
              sx={{ fontWeight: 500 }}
              className={classes.logoutButton}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Box className={classes.body}>
        <Box className={classes.bodyHeader}>
          <Box className={classes.userInfo}>
            <Avatar
              className={classes.avatar}
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
              alt="Agency Avatar"
            >
              <Business />
            </Avatar>
            <Typography className={classes.welcomeText}>
              Welcome back, Agency Team
            </Typography>
          </Box>
          <Box className={classes.userStats}>
            <Box className={classes.statItem}>
              <Typography className={classes.statValue}>
                {planFeatures.maxMatchesPerDay}
              </Typography>
              <Typography className={classes.statLabel}>Matches/Day</Typography>
            </Box>
            <Box className={classes.statItem}>
              <Typography className={classes.statValue}>
                {planFeatures.maxUsers}
              </Typography>
              <Typography className={classes.statLabel}>
                Team Members
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
          </Box>
        </Box>

        <Divider className={classes.divider} />

        <Box className={classes.dashboardLayout}>
          <Box className={classes.mainContent}>
            <Box id="my-pitches" className={classes.buttonContainer}>
              <Typography variant="h6" className={classes.sectionTitle}>
                <EditNoteIcon />
                Team Pitches
              </Typography>
            </Box>

            <Grid container spacing={3} className={classes.pitchGrid}>
              {teamPitches.map((pitch) => (
                <Grid item key={pitch.id}>
                  <Card className={classes.pitchCard}>
                    <CardContent className={classes.pitchCardContent}>
                      <Box className={classes.pitchHeader}>
                        <Typography className={classes.pitchTitle}>
                          {pitch.name}: {pitch.title}
                        </Typography>
                        <Box
                          className={`${classes.pitchStatus} ${(
                            pitch.status || ""
                          )
                            .replace(/\s+/g, "")
                            .toLowerCase()}`}
                        >
                          <Box
                            className={`${classes.pitchStatusDot} ${(
                              pitch.status || ""
                            )
                              .replace(/\s+/g, "")
                              .toLowerCase()}`}
                          />
                          {pitch.status || "No Status"}
                        </Box>
                      </Box>
                      <Box className={classes.pitchMatches}>
                        <Box className={classes.matchList}>
                          {pitch.matches.map((match, index) => (
                            <Box key={index} className={classes.matchItem}>
                              <Typography variant="body2">{match}</Typography>
                            </Box>
                          ))}
                        </Box>
                        <Box className={classes.pitchActions}>
                          <Button
                            variant="text"
                            size="small"
                            className={`${classes.pitchActionButton} primary`}
                            onClick={() => navigate("/results")}
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
                      {pitch.contactEmail && (
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          sx={{ mt: 1 }}
                        >
                          Contact: {pitch.contactEmail}
                        </Typography>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {planFeatures.hasPremiumInsights && (
              <Box className={classes.premiumInsights}>
                <Card className={classes.insightsCard}>
                  <CardContent>
                    <Typography variant="h6" className={classes.insightsTitle}>
                      Premium Insights
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                      Coming soon: Predictive insights powered by AI
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            )}

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
          </Box>

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
                  } else if (entry.type === "edit") {
                    icon = <EditIcon fontSize="small" />;
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
              Choose the date and time you'd like to be reminded to follow up.
            </Typography>

            <Box
              sx={{
                display: "flex",
                gap: 2,
                flexDirection: { xs: "column", sm: "row" },
              }}
            >
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
              <TextField
                label="Reminder Time"
                type="time"
                value={reminderTime}
                onChange={(e) => setReminderTime(e.target.value)}
                InputLabelProps={{ shrink: true }}
                fullWidth
                InputProps={{
                  sx: {
                    borderRadius: 2,
                    backgroundColor: "#f9f9f9",
                  },
                }}
              />
            </Box>
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
      </Box>
    </Box>
  );
};

export default AgenciesDashboard;
