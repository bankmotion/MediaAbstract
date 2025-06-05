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
  TextField,
  IconButton,
  Badge,
  Chip,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Collapse,
} from "@mui/material";
import {
  Logout,
  History as HistoryIcon,
  Send as SendIcon,
  Edit as EditIcon,
  AccessTime as AccessTimeIcon,
  NotificationsNone as NotificationIcon,
  Business,
  Star,
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
  Close as CloseIcon,
} from "@mui/icons-material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { useNavigate } from "react-router-dom";
import useStyles from "./styles";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import {
  fetchDashboardData,
  setUserId,
  updatePitchStatusAndNotes,
} from "../../redux/slices/dashboardSlice";
import {
  fetchSavedOutlets,
  deleteSavedPitchAction,
} from "../../redux/slices/savePitchSlice";
import { fetchAllOutlets } from "../../redux/slices/outletsSlice";
import { Outlet } from "../../redux/slices/outletsSlice";
import OutletDetailModal from "../../components/OutletDetailModal/OutletDetailModal";
import { supabase } from "../../utils/supabase";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { createReminder, fetchReminders } from "../../services/reminderService";
import TeamMembersModal from "../../components/TeamMembersModal/TeamMembersModal";

const AgenciesDashboard = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const allOutlets = useSelector(
    (state: RootState) => state.allOutlets.outlets
  );
  const dashboardResult = useSelector((state: RootState) => state.dashboard);
  const savedPitchesRaw = useSelector(
    (state: RootState) => state.savedOutlets.results
  );
  const savedPitches = Array.isArray(savedPitchesRaw) ? savedPitchesRaw : [];

  const [userId, setUserIdState] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedOutlet, setSelectedOutlet] = useState<Outlet | null>(null);
  const [expandedOutlets, setExpandedOutlets] = useState<number[]>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [pitchToDelete, setPitchToDelete] = useState<{
    description: string;
    selected_date: string;
  } | null>(null);

  // State for plan tier and features
  const [currentPlan, setCurrentPlan] = useState("$150/month");
  const [planType, setPlanType] = useState<string | null>(null);
  const [planFeatures, setPlanFeatures] = useState({
    maxUsers: 3,
    maxMatchesPerDay: 15,
    hasEnhancedTools: true,
    hasPremiumInsights: false,
    hasPrioritySupport: false,
  });

  // Update maxUsers based on plan type
  useEffect(() => {
    if (planType === "basic") {
      setPlanFeatures((prev) => ({ ...prev, maxUsers: 1 }));
    } else if (planType === "team") {
      setPlanFeatures((prev) => ({ ...prev, maxUsers: 3 }));
    } else if (planType === "enterprise") {
      setPlanFeatures((prev) => ({ ...prev, maxUsers: Infinity }));
    }
  }, [planType]);

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

  const [activityLog, setActivityLog] = useState<any[]>([]);

  // Fetch activity log from Supabase
  useEffect(() => {
    const fetchActivityLog = async () => {
      if (!userId) return; // Only run if userId is set
      console.log("userID:", userId);
      const { data, error } = await supabase
        .from("activity_log")
        .select("id, created_at, action")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });
      if (error) {
        console.error("Supabase error:", error);
      }
      console.log("data:", data);
      setActivityLog(data || []);
    };
    fetchActivityLog();
  }, [userId]);

  const [reminderDialogOpen, setReminderDialogOpen] = useState(false);
  const [selectedPitchId, setSelectedPitchId] = useState<number | null>(null);
  const [reminderDate, setReminderDate] = useState("");
  const [reminderTime, setReminderTime] = useState("12:00");

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

  const [editStates, setEditStates] = useState<{
    [pitchId: string]: { status: string; notes: string };
  }>({});

  const [statusSaved, setStatusSaved] = useState<{
    [pitchId: string]: boolean;
  }>({});

  const [openNotes, setOpenNotes] = useState<{ [pitchId: string]: boolean }>(
    {}
  );

  const statusOptions = [
    {
      value: "Submitted",
      label: "Submitted",
      icon: <MailIcon fontSize="small" color="primary" />,
    },
    {
      value: "Followed Up",
      label: "Followed Up",
      icon: <UpdateIcon fontSize="small" color="info" />,
    },
    {
      value: "Accepted",
      label: "Accepted",
      icon: <DoneIcon fontSize="small" color="success" />,
    },
    {
      value: "Rejected",
      label: "Rejected",
      icon: <CloseIcon fontSize="small" color="error" />,
    },
  ];

  const [reminderStatuses, setReminderStatuses] = useState<{
    [key: number]: string;
  }>({});

  const [teamMembersModalOpen, setTeamMembersModalOpen] = useState(false);

  const [teamRole, setTeamRole] = useState<string | null>(null);

  const [teamMembersCount, setTeamMembersCount] = useState<number>(0);

  const handleEditChange = (
    pitchId: string,
    field: "status" | "notes",
    value: string
  ) => {
    setEditStates((prev) => ({
      ...prev,
      [pitchId]: {
        ...prev[pitchId],
        [field]: value,
      },
    }));
  };

  const handleSaveStatusAndNotes = (pitch: any) => {
    if (!userId) return;

    const { status, notes } = editStates[pitch.id] || {
      status: pitch.status,
      notes: pitch.notes || "",
    };
    dispatch(
      updatePitchStatusAndNotes({
        pitchId: pitch.id,
        status,
        notes,
        userId,
      })
    ).then(() => {
      dispatch(fetchDashboardData(userId));
    });
  };

  const statusChipColor = (status: string) => {
    switch (status) {
      case "Accepted":
        return "success";
      case "Rejected":
        return "error";
      case "Followed Up":
        return "warning";
      case "Submitted":
        return "primary";
      default:
        return "default";
    }
  };

  const handleOpenMatchesModal = (pitch: any) => {
    navigate("/matches", {
      state: {
        pitchTitle: pitch.title,
        matches: pitch.matched_outlets,
        pitchId: pitch.id,
        planType: planType || "basic",
      },
    });
  };

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session?.user) {
        navigate("/login");
        return;
      }
      setUserIdState(session.user.id);
      dispatch(setUserId(session.user.id));

      // Fetch user's plan type and team_role
      const { data: profile } = await supabase
        .from("user_profiles")
        .select("plan_type, team_role")
        .eq("user_id", session.user.id)
        .single();

      if (profile) {
        setPlanType(profile.plan_type);
        setTeamRole(profile.team_role);
      }
    };
    checkSession();
    // Set up auth state listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session?.user) {
        navigate("/login");
      } else {
        setUserIdState(session.user.id);
        dispatch(setUserId(session.user.id));
      }
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, dispatch]);

  useEffect(() => {
    if (userId) {
      dispatch(fetchDashboardData(userId));
      dispatch(fetchSavedOutlets(userId));
      dispatch(fetchAllOutlets());
    }
  }, [dispatch, userId]);

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
  const handleToggleOutlets = (pitchIndex: number) => {
    setExpandedOutlets((prev) =>
      prev.includes(pitchIndex)
        ? prev.filter((index) => index !== pitchIndex)
        : [...prev, pitchIndex]
    );
  };
  const handleDeleteClick = (pitch: {
    description: string;
    selected_date: string;
  }) => {
    setPitchToDelete(pitch);
    setDeleteDialogOpen(true);
  };
  const handleConfirmDelete = () => {
    if (pitchToDelete && userId) {
      dispatch(deleteSavedPitchAction({ ...pitchToDelete, userId }))
        .unwrap()
        .then(() => {
          setDeleteDialogOpen(false);
          setPitchToDelete(null);
          dispatch(fetchSavedOutlets(userId));
        })
        .catch((error) => {
          console.error("Failed to delete pitch:", error);
        });
    }
  };
  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
    setPitchToDelete(null);
  };

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

  const fetchAndUpdateReminderStatuses = async () => {
    try {
      const reminders = await fetchReminders();
      const newStatuses: { [key: number]: string } = {};

      reminders.forEach((reminder: any) => {
        if (reminder.pitch_id) {
          newStatuses[reminder.pitch_id] = reminder.status;
        }
      });

      setReminderStatuses(newStatuses);
    } catch (error) {
      console.error("Error fetching reminder statuses:", error);
    }
  };

  useEffect(() => {
    fetchAndUpdateReminderStatuses();
    // Set up polling every 30 seconds
    const interval = setInterval(fetchAndUpdateReminderStatuses, 30000);
    return () => clearInterval(interval);
  }, []);

  // Fetch team members count when modal opens or userId changes
  useEffect(() => {
    const fetchTeamMembersCount = async () => {
      if (!userId) return;

      // Get the team_id for the current user
      const { data: userProfile } = await supabase
        .from("user_profiles")
        .select("team_id")
        .eq("user_id", userId)
        .single();

      if (!userProfile?.team_id) return;

      // Count team members using the team_id
      const { count } = await supabase
        .from("user_profiles")
        .select("id", { count: "exact", head: true })
        .eq("team_id", userProfile.team_id);

      setTeamMembersCount(count || 0);
    };

    fetchTeamMembersCount();
  }, [userId]);

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
            <Button
              startIcon={<Logout />}
              color="primary"
              variant="outlined"
              onClick={async () => {
                await supabase.auth.signOut();
                navigate("/");
              }}
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
            <Box
              className={classes.statItem}
              style={{
                cursor: teamRole === "admin" ? "pointer" : "default",
                opacity: teamRole === "admin" ? 1 : 0.5,
                backgroundColor: teamRole === "admin" ? "#ffffff" : "#f8fafc",
              }}
              onClick={() => {
                if (teamRole === "admin") {
                  setTeamMembersModalOpen(true);
                }
              }}
            >
              <Typography className={classes.statValue}>
                {teamMembersCount}/
                {planType === "enterprise" ? "∞" : planFeatures.maxUsers}
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
              {dashboardResult.myPitches.map((pitch) => {
                const editable =
                  planType !== "basic" &&
                  ["Submitted", "Followed Up", "Accepted", "Rejected"].includes(
                    pitch.status
                  );
                return (
                  <Grid item key={pitch.id}>
                    <Card className={classes.pitchCard}>
                      <CardContent className={classes.pitchCardContent}>
                        {editable && (
                          <Box
                            sx={{
                              mb: 1,
                              p: 1,
                              background: "#f7fafd",
                              borderRadius: 2,
                              border: "1px solid #e3e8ee",
                              display: "flex",
                              flexDirection: "column",
                            }}
                          >
                            <Box
                              sx={{
                                display: isMobile ? "block" : "flex",
                                alignItems: isMobile ? undefined : "center",
                                gap: isMobile ? 1.5 : 2,
                                flexWrap: "wrap",
                                width: "100%",
                              }}
                            >
                              <FormControl
                                size="small"
                                sx={{
                                  minWidth: 160,
                                  flex: "1 1 160px",
                                  width: isMobile ? "100%" : undefined,
                                  mb: 1.5,
                                  fontSize: "0.85rem",
                                }}
                              >
                                <InputLabel
                                  size="small"
                                  sx={{ fontSize: "0.85rem" }}
                                >
                                  Status
                                </InputLabel>
                                <Select
                                  label="Status"
                                  value={
                                    editStates[pitch.id]?.status || pitch.status
                                  }
                                  onChange={(e) => {
                                    handleEditChange(
                                      pitch.id,
                                      "status",
                                      e.target.value
                                    );
                                  }}
                                  sx={{
                                    background: "#fff",
                                    borderRadius: 1,
                                    "& .MuiSelect-select": {
                                      paddingRight: "32px !important",
                                      fontSize: "0.85rem",
                                    },
                                    fontSize: "0.85rem",
                                  }}
                                  MenuProps={{
                                    PaperProps: {
                                      sx: {
                                        mt: 0.5,
                                        fontSize: "0.85rem",
                                      },
                                    },
                                    disablePortal: false,
                                  }}
                                >
                                  {statusOptions.map((opt) => (
                                    <MenuItem
                                      key={opt.value}
                                      value={opt.value}
                                      sx={{ fontSize: "0.85rem" }}
                                    >
                                      <Box
                                        sx={{
                                          display: "flex",
                                          alignItems: "center",
                                          gap: 1,
                                          fontSize: "0.85rem",
                                        }}
                                      >
                                        {opt.icon} {opt.label}
                                      </Box>
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                              <IconButton
                                onClick={() =>
                                  setOpenNotes((prev) => ({
                                    ...prev,
                                    [pitch.id]: !prev[pitch.id],
                                  }))
                                }
                                color={
                                  openNotes[pitch.id] ||
                                  (editStates[pitch.id]?.notes ?? pitch.notes)
                                    ? "primary"
                                    : "inherit"
                                }
                                sx={{ minWidth: 40, mb: isMobile ? 1.5 : 0 }}
                              >
                                <Badge
                                  color="secondary"
                                  variant="dot"
                                  invisible={
                                    !(
                                      editStates[pitch.id]?.notes ?? pitch.notes
                                    )
                                  }
                                >
                                  <CommentIcon />
                                </Badge>
                              </IconButton>
                              <Chip
                                label={
                                  editStates[pitch.id]?.status || pitch.status
                                }
                                size="small"
                                variant="outlined"
                                color={
                                  statusChipColor(
                                    editStates[pitch.id]?.status || pitch.status
                                  ) as any
                                }
                                sx={{
                                  fontWeight: 600,
                                  letterSpacing: 0.5,
                                  mb: isMobile ? 1.5 : 0,
                                }}
                              />
                            </Box>
                            <Collapse in={openNotes[pitch.id]}>
                              <Box
                                sx={{
                                  background: "#f4f7fb",
                                  borderRadius: 1,
                                  border: "1px solid #e0e5ec",
                                }}
                              >
                                <TextField
                                  label="Notes (optional)"
                                  value={
                                    editStates[pitch.id]?.notes ??
                                    pitch.notes ??
                                    ""
                                  }
                                  onChange={(e) =>
                                    handleEditChange(
                                      pitch.id,
                                      "notes",
                                      e.target.value
                                    )
                                  }
                                  multiline
                                  minRows={2}
                                  fullWidth
                                  sx={{ mb: 0 }}
                                />
                              </Box>
                            </Collapse>
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: isMobile
                                  ? "stretch"
                                  : "flex-end",
                                alignItems: "center",
                                gap: 1,
                                mt: isMobile ? 1 : 2,
                              }}
                            >
                              <Button
                                variant="contained"
                                size="small"
                                fullWidth={isMobile}
                                onClick={() => handleSaveStatusAndNotes(pitch)}
                                disabled={
                                  (editStates[pitch.id]?.status === undefined ||
                                    editStates[pitch.id]?.status ===
                                      pitch.status) &&
                                  (editStates[pitch.id]?.notes === undefined ||
                                    editStates[pitch.id]?.notes ===
                                      (pitch.notes ?? ""))
                                }
                                sx={{
                                  minWidth: isMobile ? undefined : 60,
                                  fontWeight: 600,
                                  fontSize: "0.85rem",
                                  px: 1.5,
                                  py: 0.5,
                                  height: 28,
                                }}
                              >
                                Save
                              </Button>
                              {statusSaved[pitch.id] && (
                                <Chip
                                  label="Saved"
                                  color="success"
                                  size="small"
                                  icon={<CheckCircleIcon />}
                                  sx={{ fontWeight: 500 }}
                                />
                              )}
                            </Box>
                          </Box>
                        )}
                        <Divider sx={{ mb: 2 }} />
                        <Box className={classes.pitchHeader}>
                          <Typography className={classes.pitchTitle}>
                            {pitch.title}
                          </Typography>
                          {planType !== "basic" && (
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
                          )}
                        </Box>
                        <Box className={classes.pitchMatches}>
                          <Box className={classes.matchList}>
                            {Array.isArray(pitch.matched_outlets) &&
                              pitch.matched_outlets
                                .slice(0, 3)
                                .map((matched_outlet: any, index: number) => (
                                  <Box
                                    key={index}
                                    className={classes.matchItem}
                                  >
                                    <Typography variant="body2">
                                      {matched_outlet.name}
                                    </Typography>
                                    <Typography variant="body2">
                                      {matched_outlet.match_percentage}
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
                              disabled={
                                !!reminderStatuses[pitch.id] &&
                                reminderStatuses[pitch.id] !== "sent"
                              }
                            >
                              {reminderStatuses[pitch.id] &&
                              reminderStatuses[pitch.id] !== "sent"
                                ? "Reminder Set"
                                : "Set Reminder"}
                            </Button>
                          </Box>
                        </Box>
                        {reminderStatuses[pitch.id] && (
                          <Chip
                            label={`Reminder: ${reminderStatuses[pitch.id]}`}
                            color={
                              reminderStatuses[pitch.id] === "sent"
                                ? "success"
                                : "primary"
                            }
                            size="small"
                            sx={{ mt: 1 }}
                          />
                        )}
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>

            {/* Saved Outlets Section */}
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
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        {isMobile && (
                          <KeyboardArrowDownIcon
                            className={`${classes.savedPitchDropdown} ${
                              expandedOutlets.includes(pitchIndex)
                                ? "expanded"
                                : ""
                            }`}
                          />
                        )}
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteClick(pitch);
                          }}
                          sx={{
                            color: "error.main",
                            "&:hover": {
                              backgroundColor: "error.light",
                              color: "error.contrastText",
                            },
                          }}
                        >
                          <CloseIcon fontSize="small" />
                        </IconButton>
                      </Box>
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
                            >
                              <Typography
                                className={classes.savedOutletName}
                                onClick={() => handleOpenModal(outlet)}
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
                  return (
                    <Box key={entry.id} className={classes.activityItem}>
                      <Box className={classes.activityIcon}>
                        <SendIcon fontSize="small" />
                      </Box>
                      <Box className={classes.activityText}>
                        <Typography variant="body2" className="action">
                          {entry.action}
                        </Typography>
                        <Typography variant="body2" className="timestamp">
                          <AccessTimeIcon sx={{ fontSize: "0.9rem" }} />
                          {new Date(entry.created_at).toLocaleString()}
                        </Typography>
                      </Box>
                    </Box>
                  );
                })
              )}
            </Box>
          </Box>
        </Box>
      </Box>

      <TeamMembersModal
        open={teamMembersModalOpen}
        onClose={() => setTeamMembersModalOpen(false)}
        userId={userId || ""}
        planType={planType || "basic"}
        maxUsers={planFeatures.maxUsers}
        isAdmin={teamRole === "admin"}
        teamId={userId || ""}
      />
    </Box>
  );
};

export default AgenciesDashboard;
