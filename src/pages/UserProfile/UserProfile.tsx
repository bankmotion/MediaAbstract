import React, { useState, useRef } from "react";
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
import useStyles from "./styles";

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
    name: "Jane Doe",
    email: "jane.doe@example.com",
    subscription: {
      status: "active",
      plan: "Writer Plan",
      nextBillingDate: "2025-05-25",
    },
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(userData);
  const [subscriptionDialogOpen, setSubscriptionDialogOpen] = useState(false);

  const handleEdit = () => {
    setEditedData(userData);
    setIsEditing(true);
  };

  const handleSave = () => {
    setUserData(editedData);
    setIsEditing(false);
    // TODO: Add API call to update user data in Supabase
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

  const handleSubscriptionDialog = () => {
    setSubscriptionDialogOpen(true);
  };

  const handleCloseSubscriptionDialog = () => {
    setSubscriptionDialogOpen(false);
  };

  const handleUpgradeSubscription = () => {
    // TODO: Implement subscription upgrade logic
    handleCloseSubscriptionDialog();
  };

  const handleCancelSubscription = () => {
    // TODO: Implement subscription cancellation logic
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

  return (
    <Box className={classes.wrapper}>
      <Box className={classes.header}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/writers/dashboard")}
          className={classes.backButton}
        >
          Back to Dashboard
        </Button>
        <Typography variant="h4" className={classes.pageTitle}>
          User Profile
        </Typography>
      </Box>

      <Grid container spacing={2} className={classes.content}>
        <Grid
          item
          xs={12}
          sm={10}
          md={4}
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            [theme.breakpoints.down("sm")]: {
              padding: theme.spacing(1),
            },
          }}
        >
          <Card className={classes.profileCard}>
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
              <Typography variant="h5" className={classes.userName}>
                {userData.name}
              </Typography>
              <Typography variant="body1" className={classes.userEmail}>
                {userData.email}
              </Typography>
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
            width: "100%",
            [theme.breakpoints.down("sm")]: {
              padding: theme.spacing(1),
            },
          }}
        >
          <Card className={classes.detailsCard}>
            <CardContent>
              <Box className={classes.sectionHeader}>
                <Typography variant="h6">Profile Information</Typography>
                {!isEditing ? (
                  <Button
                    startIcon={<EditIcon />}
                    onClick={handleEdit}
                    className={classes.editButton}
                  >
                    Edit Profile
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

          <Card className={classes.subscriptionCard}>
            <CardContent>
              <Box className={classes.sectionHeader}>
                <Typography variant="h6">Subscription Details</Typography>
                <Button
                  variant="outlined"
                  onClick={handleSubscriptionDialog}
                  className={classes.manageSubscriptionButton}
                >
                  Manage Subscription
                </Button>
              </Box>

              <Divider className={classes.divider} />

              <Grid container spacing={3} className={classes.subscriptionGrid}>
                <Grid item xs={12} sm={6}>
                  <Box className={classes.subscriptionInfo}>
                    <SubscriptionIcon className={classes.subscriptionIcon} />
                    <Box>
                      <Typography variant="subtitle1">Current Plan</Typography>
                      <Typography variant="h6">
                        {userData.subscription.plan}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box className={classes.subscriptionInfo}>
                    <Chip
                      label={userData.subscription.status.toUpperCase()}
                      color={
                        userData.subscription.status === "active"
                          ? "success"
                          : "warning"
                      }
                      className={classes.statusChip}
                    />
                    <Typography variant="body2" className={classes.billingDate}>
                      Next billing date: {userData.subscription.nextBillingDate}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Dialog
        open={subscriptionDialogOpen}
        onClose={handleCloseSubscriptionDialog}
        maxWidth="sm"
        fullWidth
        className={classes.subscriptionDialog}
      >
        <DialogTitle
          sx={{
            pb: 1,
            display: "flex",
            alignItems: "center",
            gap: 1,
            px: { xs: 2, sm: 3 },
          }}
        >
          <SubscriptionIcon sx={{ color: "primary.main" }} />
          <Typography
            variant="h6"
            sx={{ fontSize: { xs: "1.125rem", sm: "1.25rem" } }}
          >
            Manage Subscription
          </Typography>
        </DialogTitle>
        <DialogContent
          sx={{
            pt: 2,
            px: { xs: 2, sm: 3 },
          }}
        >
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="subtitle2"
              color="text.secondary"
              gutterBottom
              sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
            >
              CURRENT PLAN
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: { xs: "flex-start", sm: "center" },
                flexDirection: { xs: "column", sm: "row" },
                justifyContent: "space-between",
                mb: 2,
                gap: { xs: 1, sm: 0 },
              }}
            >
              <Typography
                variant="h6"
                component="span"
                sx={{
                  fontSize: { xs: "1.125rem", sm: "1.25rem" },
                }}
              >
                {userData.subscription.plan}
              </Typography>
              <Chip
                label={userData.subscription.status.toUpperCase()}
                color={
                  userData.subscription.status === "active"
                    ? "success"
                    : "warning"
                }
                size="small"
                sx={{ fontWeight: 500 }}
              />
            </Box>
            <Box
              sx={{
                bgcolor: "background.default",
                borderRadius: 1,
                p: 2,
                display: "flex",
                flexDirection: "column",
                gap: 0.5,
              }}
            >
              <Typography variant="body2" color="text.secondary">
                Next billing date
              </Typography>
              <Typography variant="body1" fontWeight={500}>
                {userData.subscription.nextBillingDate}
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Box>
            <Typography
              variant="subtitle2"
              color="text.secondary"
              gutterBottom
              sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
            >
              AVAILABLE PLANS
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                mb: 2,
              }}
            >
              {/* Professional Plan */}
              <Box
                sx={{
                  p: 2,
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 1,
                  cursor: "pointer",
                  "&:hover": {
                    bgcolor: "background.default",
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    justifyContent: "space-between",
                    alignItems: { xs: "flex-start", sm: "flex-start" },
                    mb: 1,
                    gap: { xs: 1, sm: 0 },
                  }}
                >
                  <Box>
                    <Typography
                      variant="subtitle1"
                      fontWeight={600}
                      sx={{
                        fontSize: { xs: "1rem", sm: "1.125rem" },
                      }}
                    >
                      Professional Plan
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      For serious writers and professionals
                    </Typography>
                  </Box>
                  <Typography
                    variant="h6"
                    color="primary.main"
                    sx={{
                      fontSize: { xs: "1.25rem", sm: "1.5rem" },
                    }}
                  >
                    $19.99
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Includes advanced features, priority support, and unlimited
                  access
                </Typography>
              </Box>

              {/* Enterprise Plan */}
              <Box
                sx={{
                  p: 2,
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 1,
                  cursor: "pointer",
                  "&:hover": {
                    bgcolor: "background.default",
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    justifyContent: "space-between",
                    alignItems: { xs: "flex-start", sm: "flex-start" },
                    mb: 1,
                    gap: { xs: 1, sm: 0 },
                  }}
                >
                  <Box>
                    <Typography
                      variant="subtitle1"
                      fontWeight={600}
                      sx={{
                        fontSize: { xs: "1rem", sm: "1.125rem" },
                      }}
                    >
                      Enterprise Plan
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      For teams and organizations
                    </Typography>
                  </Box>
                  <Typography
                    variant="h6"
                    color="primary.main"
                    sx={{
                      fontSize: { xs: "1.25rem", sm: "1.5rem" },
                    }}
                  >
                    $49.99
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Custom features, dedicated support, and team collaboration
                  tools
                </Typography>
              </Box>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions
          sx={{
            px: { xs: 2, sm: 3 },
            pb: { xs: 2, sm: 3 },
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 1,
            "& > button": {
              width: { xs: "100%", sm: "auto" },
            },
          }}
        >
          <Button
            onClick={handleCloseSubscriptionDialog}
            sx={{
              color: "text.secondary",
              order: { xs: 1, sm: 0 },
              "&:hover": {
                bgcolor: "background.default",
              },
            }}
          >
            Close
          </Button>
          {userData.subscription.status === "active" && (
            <Button
              onClick={handleCancelSubscription}
              color="error"
              variant="outlined"
              startIcon={<CancelIcon />}
              sx={{ order: { xs: 0, sm: 1 } }}
            >
              Cancel Subscription
            </Button>
          )}
          <Button
            onClick={handleUpgradeSubscription}
            variant="contained"
            startIcon={<SaveIcon />}
            sx={{ order: { xs: -1, sm: 2 } }}
          >
            Upgrade Plan
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserProfile;
