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
  Chip,
  Grid,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  CardMembership as SubscriptionIcon,
  ArrowBack as ArrowBackIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import useStyles from "./styles";

const UserProfile = () => {
  const { classes } = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  // Mock user data - replace with actual data from Supabase
  const [userData, setUserData] = useState({
    name: "Jane Doe",
    email: "jane.doe@example.com",
    subscription: {
      status: "active",
      plan: "Writer Plan",
      nextBillingDate: "2024-04-21",
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

      <Grid container spacing={3} className={classes.content}>
        <Grid item xs={12} md={4}>
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
                {!isEditing && (
                  <IconButton
                    className={classes.editAvatarButton}
                    onClick={handleEdit}
                  >
                    <EditIcon />
                  </IconButton>
                )}
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

        <Grid item xs={12} md={8}>
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
        <DialogTitle>Manage Subscription</DialogTitle>
        <DialogContent>
          <Typography variant="body1" paragraph>
            Current Plan: {userData.subscription.plan}
          </Typography>
          <Typography variant="body2" color="textSecondary" paragraph>
            Your subscription will be billed on{" "}
            {userData.subscription.nextBillingDate}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSubscriptionDialog}>Close</Button>
          <Button
            onClick={handleUpgradeSubscription}
            variant="contained"
            color="primary"
          >
            Upgrade Plan
          </Button>
          <Button
            onClick={handleCancelSubscription}
            variant="outlined"
            color="error"
          >
            Cancel Subscription
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserProfile;
