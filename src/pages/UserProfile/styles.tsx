import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    background: "#fff",
    minHeight: "100vh",
    padding: theme.spacing(3),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2),
    },
  },
  header: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(3),
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "flex-start",
      gap: theme.spacing(2),
      padding: theme.spacing(0, 2),
    },
  },
  backButton: {
    marginRight: theme.spacing(2),
    textTransform: "none",
    color: theme.palette.text.secondary,
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.04)",
    },
  },
  pageTitle: {
    fontWeight: 600,
    color: theme.palette.text.primary,
  },
  content: {
    maxWidth: "1200px",
    margin: "0 auto",
    width: "100%",
    padding: theme.spacing(0, 2),
    [theme.breakpoints.down("sm")]: {
      margin: 0,
      padding: theme.spacing(1),
      "& .MuiGrid-item": {
        padding: theme.spacing(1),
      },
    },
  },
  profileCard: {
    background: "#fff",
    borderRadius: "8px",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.3)",
    marginBottom: theme.spacing(2),
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      maxWidth: "100%",
      margin: theme.spacing(0, 0, 2),
    },
  },
  profileCardContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(3),
    textAlign: "center",
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2),
    },
  },
  avatarContainer: {
    position: "relative",
    marginBottom: theme.spacing(2),
    width: "fit-content",
  },
  avatar: {
    width: 120,
    height: 120,
    border: "3px solid #fff",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    [theme.breakpoints.down("sm")]: {
      width: 100,
      height: 100,
    },
  },
  editAvatarButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
    padding: "6px",
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  userName: {
    fontWeight: 600,
    marginBottom: theme.spacing(0.5),
    fontSize: "1.25rem",
  },
  userEmail: {
    color: theme.palette.text.secondary,
    fontSize: "0.9rem",
  },
  detailsCard: {
    background: "#fff",
    borderRadius: "8px",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.12)",
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      maxWidth: "100%",
      margin: "0 auto",
      marginBottom: theme.spacing(2),
    },
  },
  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing(2),
  },
  editButton: {
    textTransform: "none",
    color: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: "rgba(25, 118, 210, 0.04)",
    },
  },
  editActions: {
    display: "flex",
    gap: theme.spacing(1),
  },
  saveButton: {
    textTransform: "none",
    borderRadius: "8px",
  },
  cancelButton: {
    textTransform: "none",
    borderRadius: "8px",
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
  formGrid: {
    marginTop: theme.spacing(2),
  },
  inputIcon: {
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(1),
  },
  subscriptionCard: {
    background: "#fff",
    borderRadius: "8px",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.12)",
    [theme.breakpoints.down("sm")]: {
      maxWidth: "100%",
      margin: "0 auto",
    },
  },
  manageSubscriptionButton: {
    textTransform: "none",
    borderRadius: "8px",
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(0.5, 1),
      fontSize: "0.875rem",
    },
  },
  subscriptionGrid: {
    marginTop: theme.spacing(2),
  },
  subscriptionInfo: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(2),
    padding: theme.spacing(2),
    backgroundColor: "rgba(0, 0, 0, 0.02)",
    borderRadius: "8px",
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(1.5),
      flexDirection: "column",
      alignItems: "flex-start",
      textAlign: "left",
    },
  },
  subscriptionIcon: {
    color: theme.palette.primary.main,
    fontSize: "2rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.75rem",
    },
  },
  statusChip: {
    fontWeight: 600,
  },
  billingDate: {
    color: theme.palette.text.secondary,
    marginTop: theme.spacing(1),
  },
  subscriptionDialog: {
    "& .MuiDialog-paper": {
      borderRadius: "16px",
      padding: theme.spacing(2),
    },
  },
}));

export default useStyles;
