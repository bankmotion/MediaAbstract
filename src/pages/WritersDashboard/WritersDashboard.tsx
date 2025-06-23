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
  Alert,
  Badge,
  DialogTitle,
  Snackbar,
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
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import DoneIcon from "@mui/icons-material/Done";
import MailIcon from "@mui/icons-material/Mail";
import UpdateIcon from "@mui/icons-material/Update";
import CommentIcon from "@mui/icons-material/Comment";
import Chip from "@mui/material/Chip";
import Collapse from "@mui/material/Collapse";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import CloseIcon from "@mui/icons-material/Close";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useStyles from "./styles";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import {
  fetchDashboardData,
  setUserId,
} from "../../redux/slices/dashboardSlice";
import {
  fetchSavedOutlets,
  deleteSavedPitchAction,
} from "../../redux/slices/savePitchSlice";
import { fetchAllOutlets } from "../../redux/slices/outletsSlice";
import { Outlet } from "../../redux/slices/outletsSlice";
import OutletDetailModal from "../../components/OutletDetailModal/OutletDetailModal";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { updatePitchStatusAndNotes } from "../../redux/slices/dashboardSlice";
import { supabase } from "../../utils/supabase";
import { createReminder, fetchReminders } from "../../services/reminderService";

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
  const savedPitchesRaw = useSelector(
    (state: RootState) => state.savedOutlets.results
  );
  const savedPitches = Array.isArray(savedPitchesRaw) ? savedPitchesRaw : [];
  console.log("Saved Pitches: ", savedPitches);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedOutlet, setSelectedOutlet] = useState<Outlet | null>(null);
  const [expandedOutlets, setExpandedOutlets] = useState<number[]>([]);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showScrollToSaved, setShowScrollToSaved] = useState(false);
  const [isNewUser, setIsNewUser] = useState<boolean>(false);

  const navigate = useNavigate();

  const [reminderDialogOpen, setReminderDialogOpen] = useState(false);
  const [selectedPitchId, setSelectedPitchId] = useState<number | null>(null);
  const [reminderDate, setReminderDate] = useState("");
  const [reminderTime, setReminderTime] = useState("12:00");
  const [showConfirm, setShowConfirm] = useState(false);
  const [reminderStatuses, setReminderStatuses] = useState<{
    [key: number]: string;
  }>({});

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

  // Determine if user is new based on their pitch count
  useEffect(() => {
    if (
      dashboardResult.pitchesSent === 0 &&
      dashboardResult.myPitches.length === 0
    ) {
      setIsNewUser(true);
    } else {
      setIsNewUser(false);
    }
  }, [dashboardResult.pitchesSent, dashboardResult.myPitches.length]);

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
    setReminderTime("12:00");
    setShowConfirm(false);
    setReminderDialogOpen(true);
  };

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

  const handleSaveReminder = async () => {
    if (selectedPitchId && reminderDate) {
      // Validation: prevent past date/time
      const now = new Date();
      // Parse as local time using year, month, day, hour, minute
      const [year, month, day] = reminderDate.split("-").map(Number);
      const [hour, minute] = reminderTime.split(":").map(Number);
      // JS months are 0-based
      const localDate = new Date(year, month - 1, day, hour, minute, 0, 0);
      if (localDate < now) {
        setError("Reminder date and time must be in the future.");
        setShowError(true);
        return;
      }
      try {
        // Get user info from Supabase auth
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();
        if (userError || !user) {
          throw new Error("User not authenticated");
        }
        const pitch = dashboardResult.myPitches.find(
          (p) => p.id === selectedPitchId
        );
        if (!pitch) {
          throw new Error("Pitch not found");
        }

        // Convert local time to UTC-5
        // First get the local timezone offset in minutes
        const localOffset = localDate.getTimezoneOffset();
        // Convert to UTC-5 (which is 300 minutes)
        const utc5Offset = 300;
        // Calculate the total offset needed
        const totalOffset = localOffset - utc5Offset;
        // Apply the offset to get UTC-5 time
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
          reminder_date: formattedDateTime, // UTC-5
          email: user.email || "",
          status: "pending",
        });

        // Update reminder status in the pitch list
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

        setSuccessMessage("Reminder set successfully!");
        setShowSuccess(true);
        setReminderDialogOpen(false);
      } catch (error) {
        console.error("Error setting reminder:", error);
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
    navigate("/matches", {
      state: {
        pitchTitle: pitch.title,
        matches: pitch.matched_outlets,
        pitchId: pitch.id,
      },
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session?.user) {
        navigate("/login");
        return;
      }
      setUserId(session.user.id);
      dispatch({ type: "dashboard/setUserId", payload: session.user.id });
    };

    checkSession();

    // Set up auth state listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session?.user) {
        navigate("/login");
      } else {
        setUserId(session.user.id);
        dispatch({ type: "dashboard/setUserId", payload: session.user.id });
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
      fetchAndUpdateReminderStatuses();
    }
  }, [dispatch, userId]);

  const [editStates, setEditStates] = useState<{
    [pitchId: string]: { status: string; notes: string };
  }>({});

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

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [pitchToDelete, setPitchToDelete] = useState<{
    description: string;
    selected_date: string;
  } | null>(null);

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
          // Refresh the saved outlets list
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

  const handleCloseError = () => {
    setShowError(false);
    setError(null);
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
    setSuccessMessage("");
  };

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

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
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
                onClick={handleLogout}
                sx={{ fontWeight: 500 }}
                className={classes.logoutButton}
              >
                Logout
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
              {isNewUser ? "Welcome, Jane" : "Welcome back, Jane"}
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
              {dashboardResult.myPitches.map((pitch) => {
                const editable = [
                  "Submitted",
                  "Followed Up",
                  "Accepted",
                  "Rejected",
                ].includes(pitch.status);
                return (
                  <Grid item key={pitch.id}>
                    <Card className={classes.pitchCard}>
                      <CardContent className={classes.pitchCardContent}>
                        {/* Pitch Actions Section */}
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
                                  (editStates[pitch.id]?.status ||
                                    pitch.status) === "Followed Up"
                                    ? "warning"
                                    : statusChipColor(
                                        editStates[pitch.id]?.status ||
                                          pitch.status
                                      )
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
                inputProps={{ min: todayStr }}
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
                inputProps={
                  reminderDate === todayStr ? { min: currentTimeStr } : {}
                }
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
    </Box>
  );
};

export default WritersDashboard;
