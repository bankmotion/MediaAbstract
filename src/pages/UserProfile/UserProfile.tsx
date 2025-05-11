import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Button,
  TextField,
  Divider,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  Grid,
  useTheme,
  useMediaQuery,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  CardMembership as SubscriptionIcon,
  ArrowBack as ArrowBackIcon,
  PhotoCamera as PhotoCameraIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useStyles } from "./styles";
import { supabase } from "../../utils/supabase";

const UserProfile = () => {
  const { classes } = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [avatarMenuAnchor, setAvatarMenuAnchor] = useState<null | HTMLElement>(
    null
  );

  // Mock user data - replace with actual data from Supabase
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    subscription: {
      status: "active",
      plan: "Writer Plan",
      nextBillingDate: "2025-05-25",
    },
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(userData);
  const [subscriptionDialogOpen, setSubscriptionDialogOpen] = useState(false);
  const [subscriptionDialogMode, setSubscriptionDialogMode] = useState<
    "manage" | "change"
  >("manage");

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  const handleEdit = () => {
    setEditedData(userData);
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        throw new Error("No authenticated user found");
      }
      console.log("editdata:", editedData);
      console.log("user", user);
      console.log("userId", user.id);

      const { error } = await supabase
        .from("user_profiles")
        .update({
          full_name: editedData.name,
          email: editedData.email,
          updated_at: new Date().toISOString(),
        })
        .eq("user_id", user.id)
        .select();

      if (error) throw error;

      setUserData(editedData);
      setIsEditing(false);
      setSnackbar({
        open: true,
        message: "Profile updated successfully",
        severity: "success",
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      setSnackbar({
        open: true,
        message: "Failed to update profile. Please try again.",
        severity: "error",
      });
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleInputChange =
    (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setEditedData({
        ...editedData,
        [field]: event.target.value,
      });
    };

  const handleManageSubscription = () => {
    setSubscriptionDialogMode("manage");
    setSubscriptionDialogOpen(true);
  };

  const handleChangePlan = () => {
    setSubscriptionDialogMode("change");
    setSubscriptionDialogOpen(true);
  };

  const handleCloseSubscriptionDialog = () => {
    setSubscriptionDialogOpen(false);
  };

  const handleUpgradeSubscription = () => {
    // TODO: Implement subscription upgrade logic
    handleCloseSubscriptionDialog();
  };

  const handleAvatarEditClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setAvatarMenuAnchor(event.currentTarget);
  };

  const handleAvatarMenuClose = () => {
    setAvatarMenuAnchor(null);
  };

  const handleUploadClick = () => {
    handleAvatarMenuClose();
    fileInputRef.current?.click();
  };

  const handleRemoveAvatar = () => {
    setUserData((prev) => ({
      ...prev,
      avatar: "", // Reset to empty or you could set a default avatar URL
    }));
    handleAvatarMenuClose();
    // TODO: Implement actual avatar removal in your backend
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        alert("Please upload an image file");
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("File size should be less than 5MB");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setUserData((prev) => ({
          ...prev,
          avatar: e.target?.result as string,
        }));
      };
      reader.readAsDataURL(file);

      // TODO: Implement actual file upload to your backend/storage
      // const formData = new FormData();
      // formData.append('avatar', file);
      // Upload logic here
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const plans = [
    {
      id: "writer",
      name: "Writer Plan",
      price: "$15",
      interval: "month",
      description: "Perfect for individual writers and content creators",
      features: [
        "Unlimited writing projects",
        "AI-powered writing assistance",
        "Grammar and style checking",
        "Export to multiple formats",
        "Basic analytics",
      ],
      isPopular: true,
    },
    {
      id: "professional",
      name: "Professional Plan",
      price: "$29",
      interval: "month",
      description: "Enhanced features for serious writers",
      features: [
        "Everything in Writer Plan",
        "Advanced AI features",
        "Priority support",
        "Team collaboration tools",
        "Advanced analytics",
      ],
    },
  ];

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) throw new Error("No authenticated user found");

        const { data, error } = await supabase
          .from("user_profiles")
          .select("full_name, email")
          .eq("user_id", user.id)
          .single(); // Only one profile expected per user

        if (error) throw error;

        setUserData({
          name: data.full_name,
          email: data.email,
          subscription: {
            status: "active",
            plan: "Writer Plan",
            nextBillingDate: "2025-05-25",
          },
          avatar:
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        });
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setSnackbar({
          open: true,
          message: "Failed to load profile. Please refresh.",
          severity: "error",
        });
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <Box className={classes.wrapper}>
      <Box className={classes.header}>
        <IconButton
          onClick={() => navigate("/writers/dashboard")}
          className={classes.backButton}
          size="medium"
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4" className={classes.pageTitle}>
          User Profile
        </Typography>
      </Box>

      <Grid container spacing={0} rowSpacing={2} className={classes.content}>
        <Grid
          item
          xs={12}
          sm={10}
          md={4}
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            padding: 0,
            [theme.breakpoints.down("sm")]: {
              padding: 0,
            },
          }}
        >
          <Card
            className={classes.profileCard}
            sx={{ maxWidth: 400, width: "100%" }}
          >
            <CardContent className={classes.profileCardContent}>
              <Box className={classes.avatarContainer}>
                <Avatar
                  src={userData.avatar}
                  alt={userData.name}
                  className={classes.avatar}
                >
                  <PersonIcon />
                </Avatar>
                <IconButton
                  className={classes.editAvatarButton}
                  onClick={handleAvatarEditClick}
                  aria-label="edit avatar"
                  aria-controls="avatar-menu"
                  aria-haspopup="true"
                >
                  <EditIcon />
                </IconButton>
                <Menu
                  id="avatar-menu"
                  anchorEl={avatarMenuAnchor}
                  open={Boolean(avatarMenuAnchor)}
                  onClose={handleAvatarMenuClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                >
                  <MenuItem onClick={handleUploadClick}>
                    <ListItemIcon>
                      <PhotoCameraIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Upload Photo</ListItemText>
                  </MenuItem>
                  {userData.avatar && (
                    <MenuItem onClick={handleRemoveAvatar}>
                      <ListItemIcon>
                        <DeleteIcon fontSize="small" color="error" />
                      </ListItemIcon>
                      <ListItemText sx={{ color: theme.palette.error.main }}>
                        Remove Photo
                      </ListItemText>
                    </MenuItem>
                  )}
                </Menu>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  style={{ display: "none" }}
                />
              </Box>
              <Box className={classes.centeredUserInfo}>
                <Typography variant="h5" className={classes.userName}>
                  {userData.name}
                </Typography>
                <Typography variant="body1" className={classes.userEmail}>
                  {userData.email}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid
          item
          xs={12}
          sm={10}
          md={8}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            padding: 0,
            [theme.breakpoints.down("sm")]: {
              padding: 0,
            },
          }}
        >
          <Card
            className={classes.detailsCard}
            sx={{ maxWidth: 600, width: "100%", margin: "0 auto" }}
          >
            <CardContent>
              <Box className={classes.sectionHeader}>
                <Box className={classes.titleAndEdit}>
                  <Typography variant="h6">Profile Information</Typography>
                  {!isEditing ? (
                    <Button
                      startIcon={<EditIcon />}
                      onClick={handleEdit}
                      className={classes.editButton}
                    >
                      Edit
                    </Button>
                  ) : (
                    <Box className={classes.editActions}>
                      <Button
                        startIcon={<SaveIcon />}
                        onClick={handleSave}
                        variant="contained"
                        color="primary"
                        className={classes.saveButton}
                      >
                        Save
                      </Button>
                      <Button
                        startIcon={<CancelIcon />}
                        onClick={handleCancel}
                        variant="outlined"
                        className={classes.cancelButton}
                      >
                        Cancel
                      </Button>
                    </Box>
                  )}
                </Box>
              </Box>

              <Divider className={classes.divider} />

              <Grid container spacing={3} className={classes.formGrid}>
                <Grid item xs={12}>
                  <TextField
                    label="Full Name"
                    value={isEditing ? editedData.name : userData.name}
                    onChange={handleInputChange("name")}
                    fullWidth
                    disabled={!isEditing}
                    InputProps={{
                      startAdornment: (
                        <PersonIcon className={classes.inputIcon} />
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Email Address"
                    value={isEditing ? editedData.email : userData.email}
                    onChange={handleInputChange("email")}
                    fullWidth
                    disabled={!isEditing}
                    InputProps={{
                      startAdornment: (
                        <EmailIcon className={classes.inputIcon} />
                      ),
                    }}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          <Box sx={{ width: "100%" }}>
            <Card className={classes.subscriptionCard}>
              <CardContent sx={{ p: 0 }}>
                <Box
                  className={`${classes.sectionHeader} ${classes.subscriptionHeader}`}
                >
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 600, color: "#1E293B" }}
                  >
                    Subscription Details
                  </Typography>
                  <Button
                    variant="outlined"
                    onClick={handleManageSubscription}
                    className={classes.manageBillingButton}
                    startIcon={<SubscriptionIcon sx={{ color: "#334155" }} />}
                  >
                    Manage Billing
                  </Button>
                </Box>

                <Box className={classes.subscriptionContent}>
                  <Box className={classes.subscriptionBox}>
                    <Box className={classes.planHeader}>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 2 }}
                      >
                        <Box className={classes.planIconContainer}>
                          <SubscriptionIcon />
                        </Box>
                        <Box>
                          <Typography variant="body2" sx={{ opacity: 0.8 }}>
                            Current Plan
                          </Typography>
                          <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            Writer Plan
                          </Typography>
                        </Box>
                      </Box>
                      <Chip
                        label="ACTIVE"
                        size="small"
                        className={classes.activeChip}
                      />
                    </Box>

                    <Box className={classes.planDetails}>
                      <Box className={classes.planInfoContainer}>
                        <Box>
                          <Typography
                            variant="body2"
                            sx={{ color: "#64748B" }}
                            gutterBottom
                          >
                            Next billing date
                          </Typography>
                          <Typography
                            variant="h6"
                            sx={{ fontWeight: 600, color: "#1E293B" }}
                          >
                            {userData.subscription.nextBillingDate}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography
                            variant="body2"
                            sx={{ color: "#64748B" }}
                            gutterBottom
                          >
                            Monthly payment
                          </Typography>
                          <Typography
                            variant="h6"
                            sx={{ fontWeight: 600, color: "#1E293B" }}
                          >
                            $15.00
                          </Typography>
                        </Box>
                      </Box>

                      <Box className={classes.planActions}>
                        <Typography variant="body2" sx={{ color: "#64748B" }}>
                          Want to explore other plan options?
                        </Typography>
                        <Button
                          variant="contained"
                          onClick={handleChangePlan}
                          className={classes.comparePlansButton}
                        >
                          Compare Plans
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Grid>
      </Grid>

      <Dialog
        open={subscriptionDialogOpen}
        onClose={handleCloseSubscriptionDialog}
        maxWidth="md"
        fullWidth
        className={classes.subscriptionDialog}
        PaperProps={{
          className: classes.dialogPaper,
        }}
      >
        <DialogTitle className={classes.dialogTitle}>
          <SubscriptionIcon sx={{ color: "#1E293B" }} />
          <Typography
            variant="h6"
            sx={{ fontSize: { xs: "1.125rem", sm: "1.25rem" } }}
          >
            {subscriptionDialogMode === "manage"
              ? "Manage Billing"
              : "Compare Plans"}
          </Typography>
        </DialogTitle>
        <DialogContent className={classes.dialogContent}>
          {subscriptionDialogMode === "manage" ? (
            <Box>
              <Box className={classes.currentPlanSummary}>
                <Box sx={{ position: "relative", zIndex: 1 }}>
                  <Typography variant="h6" gutterBottom>
                    Writer Plan
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 2,
                    }}
                  >
                    <Typography variant="body1" sx={{ opacity: 0.9 }}>
                      Monthly payment
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: 600 }}>
                      $15.00
                    </Typography>
                  </Box>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      Next billing
                    </Typography>
                    <Typography variant="body1">
                      {userData.subscription.nextBillingDate}
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    position: "absolute",
                    right: -20,
                    bottom: -20,
                    width: 100,
                    height: 100,
                    bgcolor: "rgba(255, 255, 255, 0.1)",
                    borderRadius: "50%",
                  }}
                />
              </Box>

              <Box sx={{ mb: 4 }}>
                <Box className={classes.paymentMethodHeader}>
                  <Typography variant="h6" sx={{ color: "#1E293B" }}>
                    Payment Method
                  </Typography>
                  <Button
                    size="small"
                    variant="outlined"
                    className={classes.paymentMethodButton}
                  >
                    Update
                  </Button>
                </Box>
                <Paper className={classes.paymentMethodPaper}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Box className={classes.cardIconContainer}>
                      <Box
                        component="img"
                        src="/visa-icon.png"
                        alt="Visa"
                        sx={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                        }}
                      />
                    </Box>
                    <Box>
                      <Typography variant="body1">
                        •••• •••• •••• 4242
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Expires 12/2024
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              </Box>

              <Box>
                <Typography variant="h6" sx={{ color: "#1E293B" }} gutterBottom>
                  Billing History
                </Typography>
                <Paper className={classes.billingHistoryPaper}>
                  {[
                    { date: "2024-03-25", amount: "$15.00" },
                    { date: "2024-02-25", amount: "$15.00" },
                    { date: "2024-01-25", amount: "$15.00" },
                  ].map((invoice, index, arr) => (
                    <Box
                      key={index}
                      className={classes.billingHistoryItem}
                      sx={{
                        borderBottom:
                          index !== arr.length - 1 ? "1px solid" : "none",
                        borderColor: "divider",
                      }}
                    >
                      <Box>
                        <Typography variant="body1">Writer Plan</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {invoice.date}
                        </Typography>
                      </Box>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 2 }}
                      >
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                          {invoice.amount}
                        </Typography>
                        <Button size="small" className={classes.downloadButton}>
                          <Box
                            component="img"
                            src="/download-icon.png"
                            alt="Download"
                            sx={{ width: 20, height: 20 }}
                          />
                        </Button>
                      </Box>
                    </Box>
                  ))}
                </Paper>
              </Box>
            </Box>
          ) : (
            <Box>
              <Box sx={{ mb: 4 }}>
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  gutterBottom
                >
                  CURRENT PLAN
                </Typography>
                {/* ... existing current plan content ... */}
              </Box>

              <Divider sx={{ my: 3 }} />

              <Box>
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  gutterBottom
                >
                  AVAILABLE PLANS
                </Typography>
                {/* ... existing plans grid ... */}
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions className={classes.dialogActions}>
          <Button
            onClick={handleCloseSubscriptionDialog}
            className={classes.closeButton}
          >
            Close
          </Button>
          {subscriptionDialogMode === "manage" ? (
            <Button
              variant="contained"
              onClick={handleCloseSubscriptionDialog}
              className={classes.actionButton}
            >
              Done
            </Button>
          ) : (
            <Button
              onClick={handleUpgradeSubscription}
              variant="contained"
              startIcon={<SaveIcon />}
              className={classes.actionButton}
            >
              Upgrade Plan
            </Button>
          )}
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default UserProfile;
