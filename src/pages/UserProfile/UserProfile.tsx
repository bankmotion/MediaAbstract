import React, { useState } from "react";
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
  Switch,
  FormControlLabel,
  Alert,
  Snackbar,
} from "@mui/material";
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  CardMembership as SubscriptionIcon,
  Notifications as NotificationsIcon,
  ArrowBack as ArrowBackIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import useStyles from "./styles";

interface UserProfileData {
  name: string;
  email: string;
  subscriptionStatus: "free" | "premium" | "enterprise";
  subscriptionEndDate: string;
  notificationsEnabled: boolean;
}

const UserProfile = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();

  // Mock data - will be replaced with actual data from Supabase
  const [profileData, setProfileData] = useState<UserProfileData>({
    name: "Jane Doe",
    email: "jane.doe@example.com",
    subscriptionStatus: "premium",
    subscriptionEndDate: "2024-12-31",
    notificationsEnabled: true,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState<UserProfileData>(profileData);
  const [showUpgradeDialog, setShowUpgradeDialog] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleEdit = () => {
    setEditedData(profileData);
    setIsEditing(true);
  };

  const handleSave = () => {
    // Here we'll add the API call to update the profile
    setProfileData(editedData);
    setIsEditing(false);
    setSnackbarMessage("Profile updated successfully!");
    setShowSnackbar(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleInputChange =
    (field: keyof UserProfileData) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setEditedData({
        ...editedData,
        [field]: event.target.value,
      });
    };

  const handleNotificationToggle = () => {
    setEditedData({
      ...editedData,
      notificationsEnabled: !editedData.notificationsEnabled,
    });
  };

  const handleUpgradeSubscription = () => {
    setShowUpgradeDialog(true);
  };

  const handleCloseUpgradeDialog = () => {
    setShowUpgradeDialog(false);
  };

  const getSubscriptionColor = (status: string) => {
    switch (status) {
      case "premium":
        return "#4caf50";
      case "enterprise":
        return "#1976d2";
      default:
        return "#757575";
    }
  };

  return (
    <Box className={classes.wrapper}>
      <Box className={classes.header}>
        <Box className={classes.headerLeft}>
          <IconButton
            onClick={() => navigate(-1)}
            className={classes.backButton}
            size="large"
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h4" className={classes.title}>
            User Profile
          </Typography>
        </Box>
        <Button
          variant="outlined"
          startIcon={<EditIcon />}
          onClick={handleEdit}
          className={classes.editButton}
        >
          Edit Profile
        </Button>
      </Box>

      <Box className={classes.content}>
        <Card className={classes.profileCard}>
          <CardContent>
            <Box className={classes.avatarSection}>
              <Avatar
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                alt="User Avatar"
                className={classes.avatar}
              >
                <PersonIcon />
              </Avatar>
              {isEditing ? (
                <Box className={classes.editActions}>
                  <IconButton
                    color="primary"
                    onClick={handleSave}
                    className={classes.actionButton}
                  >
                    <SaveIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={handleCancel}
                    className={classes.actionButton}
                  >
                    <CancelIcon />
                  </IconButton>
                </Box>
              ) : null}
            </Box>

            <Box className={classes.profileInfo}>
              <Box className={classes.infoSection}>
                <Typography variant="subtitle2" className={classes.label}>
                  Full Name
                </Typography>
                {isEditing ? (
                  <TextField
                    fullWidth
                    value={editedData.name}
                    onChange={handleInputChange("name")}
                    variant="outlined"
                    size="small"
                  />
                ) : (
                  <Typography variant="body1" className={classes.value}>
                    {profileData.name}
                  </Typography>
                )}
              </Box>

              <Box className={classes.infoSection}>
                <Typography variant="subtitle2" className={classes.label}>
                  Email Address
                </Typography>
                {isEditing ? (
                  <TextField
                    fullWidth
                    value={editedData.email}
                    onChange={handleInputChange("email")}
                    variant="outlined"
                    size="small"
                    type="email"
                  />
                ) : (
                  <Typography variant="body1" className={classes.value}>
                    {profileData.email}
                  </Typography>
                )}
              </Box>

              <Divider className={classes.divider} />

              <Box className={classes.infoSection}>
                <Typography variant="subtitle2" className={classes.label}>
                  Subscription Status
                </Typography>
                <Box className={classes.subscriptionInfo}>
                  <Typography
                    variant="body1"
                    className={classes.subscriptionStatus}
                    style={{
                      color: getSubscriptionColor(
                        profileData.subscriptionStatus
                      ),
                    }}
                  >
                    {profileData.subscriptionStatus.charAt(0).toUpperCase() +
                      profileData.subscriptionStatus.slice(1)}
                  </Typography>
                  <Typography
                    variant="body2"
                    className={classes.subscriptionDate}
                  >
                    Valid until{" "}
                    {new Date(
                      profileData.subscriptionEndDate
                    ).toLocaleDateString()}
                  </Typography>
                  {profileData.subscriptionStatus !== "enterprise" && (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleUpgradeSubscription}
                      className={classes.upgradeButton}
                    >
                      Upgrade Plan
                    </Button>
                  )}
                </Box>
              </Box>

              <Box className={classes.infoSection}>
                <Typography variant="subtitle2" className={classes.label}>
                  Notifications
                </Typography>
                <FormControlLabel
                  control={
                    <Switch
                      checked={
                        isEditing
                          ? editedData.notificationsEnabled
                          : profileData.notificationsEnabled
                      }
                      onChange={handleNotificationToggle}
                      disabled={!isEditing}
                    />
                  }
                  label="Enable email notifications"
                />
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>

      <Dialog
        open={showUpgradeDialog}
        onClose={handleCloseUpgradeDialog}
        maxWidth="sm"
        fullWidth
        className={classes.upgradeDialog}
      >
        <DialogTitle className={classes.dialogTitle}>
          <SubscriptionIcon className={classes.dialogIcon} />
          Upgrade Your Subscription
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" className={classes.dialogContent}>
            Choose a plan that best fits your needs:
          </Typography>
          <Box className={classes.plansContainer}>
            <Card className={classes.planCard}>
              <CardContent>
                <Typography variant="h6">Premium</Typography>
                <Typography variant="h4" className={classes.price}>
                  $29
                </Typography>
                <Typography variant="body2" className={classes.period}>
                  per month
                </Typography>
                <ul className={classes.featuresList}>
                  <li>Unlimited pitches</li>
                  <li>Priority support</li>
                  <li>Advanced analytics</li>
                </ul>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  className={classes.selectPlanButton}
                >
                  Select Plan
                </Button>
              </CardContent>
            </Card>

            <Card className={classes.planCard}>
              <CardContent>
                <Typography variant="h6">Enterprise</Typography>
                <Typography variant="h4" className={classes.price}>
                  $99
                </Typography>
                <Typography variant="body2" className={classes.period}>
                  per month
                </Typography>
                <ul className={classes.featuresList}>
                  <li>All Premium features</li>
                  <li>Team collaboration</li>
                  <li>Custom integrations</li>
                  <li>Dedicated support</li>
                </ul>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  className={classes.selectPlanButton}
                >
                  Select Plan
                </Button>
              </CardContent>
            </Card>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUpgradeDialog} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={showSnackbar}
        autoHideDuration={6000}
        onClose={() => setShowSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setShowSnackbar(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default UserProfile;
