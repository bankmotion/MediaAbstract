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
  Snackbar,
  Alert,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
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
  CalendarToday,
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
  const [isNewUser, setIsNewUser] = useState<boolean>(false);

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

  // Update maxUsers and maxMatchesPerDay based on plan type
  useEffect(() => {
    if (planType === "basic") {
      setPlanFeatures((prev) => ({
        ...prev,
        maxUsers: 1,
        maxMatchesPerDay: 5,
      }));
    } else if (planType === "team") {
      setPlanFeatures((prev) => ({
        ...prev,
        maxUsers: 3,
        maxMatchesPerDay: 15,
      }));
    } else if (planType === "enterprise") {
      setPlanFeatures((prev) => ({
        ...prev,
        maxUsers: Infinity,
        maxMatchesPerDay: Infinity,
      }));
    }
  }, [planType]);

  const [activityLog, setActivityLog] = useState<any[]>([]);

  // Fetch activity log from Supabase
  useEffect(() => {
    const fetchActivityLog = async () => {
      if (!userId) return;
      const { data, error } = await supabase
        .from("activity_log")
        .select("id, created_at, action")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });
      if (error) {
        console.error("Supabase error:", error);
      }
      setActivityLog(data || []);

      // Determine if user is new based on activity log
      // If they have no activity or only one entry (likely their first login), they're new
      if (!data || data.length <= 1) {
        setIsNewUser(true);
      } else {
        setIsNewUser(false);
      }
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

  const [currentMatches, setCurrentMatches] = useState<number>(0);
  const [limitReached, setLimitReached] = useState(false);
  const [showLimitSnackbar, setShowLimitSnackbar] = useState(false);

  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // For min date and time
  const now = new Date();
  const pad = (n: number) => n.toString().padStart(2, "0");
  const todayStr = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(
    now.getDate()
  )}`;
  const currentTimeStr = `${pad(now.getHours())}:${pad(now.getMinutes())}`;

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
    setShowConfirm(false);
    setReminderDialogOpen(true);
  };

  const handleSaveReminder = async () => {
    if (selectedPitchId && reminderDate) {
      // Validation: prevent past date/time
      const now = new Date();
      const [year, month, day] = reminderDate.split("-").map(Number);
      const [hour, minute] = reminderTime.split(":").map(Number);
      const localDate = new Date(year, month - 1, day, hour, minute, 0, 0);
      if (localDate < now) {
        setError("Reminder date and time must be in the future.");
        setShowError(true);
        return;
      }
      try {
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();
        if (userError || !user) throw new Error("User not authenticated");
        const pitch = dashboardResult.myPitches.find(
          (p) => p.id === selectedPitchId
        );
        if (!pitch) throw new Error("Pitch not found");
        // Convert local time to UTC-5
        const localOffset = localDate.getTimezoneOffset();
        const utc5Offset = 300;
        const totalOffset = localOffset - utc5Offset;
        const utc5Date = new Date(localDate.getTime() + totalOffset * 60000);
        const pad = (n: number) => n.toString().padStart(2, "0");
        const formattedDateTime =
          `${utc5Date.getFullYear()}-${pad(utc5Date.getMonth() + 1)}-${pad(
            utc5Date.getDate()
          )} ` +
          `${pad(utc5Date.getHours())}:${pad(utc5Date.getMinutes())}:${pad(
            utc5Date.getSeconds()
          )}`;
        await createReminder({
          user_id: user.id,
          pitch_id: selectedPitchId,
          reminder_date: formattedDateTime,
          email: user.email || "",
          status: "pending",
        });
        setReminderStatuses((prev) => ({
          ...prev,
          [selectedPitchId]: "pending",
        }));
        setActivityLog((prevLog) => [
          ...prevLog,
          {
            id: Date.now(),
            action: `Reminder set for "${
              pitch.title
            }" on ${utc5Date.toLocaleDateString()} at ${utc5Date.toLocaleTimeString()}`,
            type: "reminder",
            date: utc5Date.toLocaleDateString(),
            time: utc5Date.toLocaleTimeString(),
          },
        ]);
        // Insert into Supabase activity_log table
        await supabase.from("activity_log").insert([
          {
            user_id: user.id,
            action: `Reminder set for "${
              pitch.title
            }" on ${utc5Date.toLocaleDateString()} at ${utc5Date.toLocaleTimeString()}`,
            type: "reminder",
            created_at: new Date().toISOString(),
          },
        ]);
        setSuccessMessage("Reminder set successfully!");
        setShowSuccess(true);
        setReminderDialogOpen(false);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Failed to set reminder"
        );
        setShowError(true);
      }
    }
  };

  const handleCloseReminderDialog = () => {
    setReminderDialogOpen(false);
    setShowConfirm(false);
    setReminderDate("");
    setReminderTime("12:00");
  };

  const handleCloseError = () => {
    setShowError(false);
    setError(null);
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
    setSuccessMessage("");
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

  // Fetch current matches from user_profiles
  useEffect(() => {
    const fetchCurrentMatches = async () => {
      if (!userId) return;
      const { data: userProfile } = await supabase
        .from("user_profiles")
        .select("matches_perday, plan_type")
        .eq("user_id", userId)
        .single();
      if (userProfile) {
        setCurrentMatches(userProfile.matches_perday || 0);
        // Set planType if not already set
        if (!planType && userProfile.plan_type)
          setPlanType(userProfile.plan_type);
      }
    };
    fetchCurrentMatches();
  }, [userId]);

  // Update limitReached state
  useEffect(() => {
    setLimitReached(
      planFeatures.maxMatchesPerDay !== Infinity &&
        currentMatches >= planFeatures.maxMatchesPerDay
    );
  }, [currentMatches, planFeatures.maxMatchesPerDay]);

  // Reset current matches at UTC-0 (client-side demo)
  useEffect(() => {
    const now = new Date();
    const msToNextUTC =
      new Date(
        Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1)
      ).getTime() - now.getTime();
    const timer = setTimeout(() => {
      setCurrentMatches(0);
      setLimitReached(false);
    }, msToNextUTC);
    return () => clearTimeout(timer);
  }, [currentMatches]);

  // Priority Support Contact Form (simple email link for now)
  const PrioritySupportContact = () => (
    <Box
      sx={{
        mt: 2,
        mb: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="body2" sx={{ mb: 1, color: "#64748b" }}>
        Need help? Contact our priority support team:
      </Typography>
      <Button
        variant="outlined"
        color="primary"
        href="mailto:support@writefor.co"
        sx={{ fontWeight: 600, borderRadius: 2 }}
      >
        Email Priority Support
      </Button>
    </Box>
  );

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
            {planType === "enterprise" && (
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
              alt="Brand, Content Team, or Agency Avatar"
            >
              <Business />
            </Avatar>
            <Typography className={classes.welcomeText}>
              {isNewUser
                ? "Welcome, Brands, Content Teams, and Agencies"
                : "Welcome back, Brands, Content Teams, and Agencies"}
            </Typography>
          </Box>
          <Box className={classes.userStats}>
            <Box className={classes.statItem}>
              <Typography className={classes.statValue}>
                {planFeatures.maxMatchesPerDay === Infinity
                  ? `${currentMatches}/∞`
                  : `${currentMatches}/${planFeatures.maxMatchesPerDay}`}
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
              onClick={() => {
                if (limitReached) {
                  setShowLimitSnackbar(true);
                  return;
                }
                navigate("/onboarding");
              }}
              disabled={limitReached}
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
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                              }}
                            >
                              {planType === "basic"
                                ? reminderStatuses[pitch.id] &&
                                  reminderStatuses[pitch.id] !== "sent"
                                  ? "Reminder Set"
                                  : "Set Reminder"
                                : "Set Smart Reminder"}
                            </Button>
                          </Box>
                        </Box>
                        {planType !== "basic" && reminderStatuses[pitch.id] && (
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

            {planType === "enterprise" && (
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
                <PrioritySupportContact />
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

      <Snackbar
        open={showLimitSnackbar}
        autoHideDuration={4000}
        onClose={() => setShowLimitSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="warning" onClose={() => setShowLimitSnackbar(false)}>
          You have reached your daily match limit. Please try again after 00:00
          UTC.
        </Alert>
      </Snackbar>

      <Dialog
        open={reminderDialogOpen}
        onClose={handleCloseReminderDialog}
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
          <IconButton onClick={handleCloseReminderDialog} size="small">
            <CloseIcon />
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
              inputProps={{ min: todayStr }}
              InputProps={{
                sx: { borderRadius: 2, backgroundColor: "#f9f9f9" },
              }}
            />
            <TextField
              label="Reminder Time"
              type="time"
              value={reminderTime}
              onChange={(e) => setReminderTime(e.target.value)}
              InputLabelProps={{ shrink: true }}
              fullWidth
              inputProps={
                reminderDate === todayStr ? { min: currentTimeStr } : {}
              }
              InputProps={{
                sx: { borderRadius: 2, backgroundColor: "#f9f9f9" },
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button
            onClick={handleCloseReminderDialog}
            variant="text"
            sx={{ textTransform: "none", fontWeight: 500 }}
          >
            Cancel
          </Button>
          {!showConfirm ? (
            <Button
              onClick={() => setShowConfirm(true)}
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
          ) : (
            <Button
              onClick={handleSaveReminder}
              variant="contained"
              color="primary"
              sx={{
                textTransform: "none",
                borderRadius: 2,
                px: 3,
                fontWeight: 600,
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
              }}
            >
              Confirm
            </Button>
          )}
        </DialogActions>
      </Dialog>
      <Snackbar
        open={showError}
        autoHideDuration={6000}
        onClose={handleCloseError}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseError}
          severity="error"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>
      <Snackbar
        open={showSuccess}
        autoHideDuration={3000}
        onClose={handleCloseSuccess}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSuccess}
          severity="success"
          sx={{ width: "100%" }}
        >
          {successMessage}
        </Alert>
      </Snackbar>
      <Dialog
        open={deleteDialogOpen}
        onClose={handleCancelDelete}
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
        <DialogTitle sx={{ pb: 1 }}>
          <Typography variant="h6" fontWeight={600}>
            Delete Pitch
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" color="text.secondary">
            Are you sure you want to delete this pitch and all its saved
            outlets? This action cannot be undone.
          </Typography>
          {pitchToDelete && (
            <Box sx={{ mt: 2, p: 2, bgcolor: "grey.50", borderRadius: 1 }}>
              <Typography variant="body2" color="text.secondary">
                <strong>Description:</strong> {pitchToDelete.description}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Saved on:</strong>{" "}
                {new Date(pitchToDelete.selected_date).toLocaleDateString()}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button
            onClick={handleCancelDelete}
            variant="text"
            sx={{ textTransform: "none", fontWeight: 500 }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDelete}
            variant="contained"
            color="error"
            sx={{
              textTransform: "none",
              borderRadius: 2,
              px: 3,
              fontWeight: 600,
              boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AgenciesDashboard;
