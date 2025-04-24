import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    background: "linear-gradient(to right, #fdfbfb, #ebedee)",
    minHeight: "100vh",
    padding: theme.spacing(3),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2),
    },
  },
  header: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(4),
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "flex-start",
      gap: theme.spacing(2),
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
  },
  profileCard: {
    height: "100%",
    background: "#fff",
    borderRadius: "16px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
    transition: "all 0.3s ease",
    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: "0 8px 24px rgba(0, 0, 0, 0.12)",
    },
  },
  profileCardContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(4),
    textAlign: "center",
  },
  avatarContainer: {
    position: "relative",
    marginBottom: theme.spacing(2),
  },
  avatar: {
    width: 120,
    height: 120,
    border: "3px solid #fff",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    transition: "all 0.3s ease",
    "&:hover": {
      transform: "scale(1.05)",
      boxShadow: "0 6px 16px rgba(0,0,0,0.15)",
    },
  },
  editAvatarButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  userName: {
    fontWeight: 600,
    marginBottom: theme.spacing(1),
  },
  userEmail: {
    color: theme.palette.text.secondary,
  },
  detailsCard: {
    background: "#fff",
    borderRadius: "16px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
    marginBottom: theme.spacing(3),
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
    borderRadius: "16px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
  },
  manageSubscriptionButton: {
    textTransform: "none",
    borderRadius: "8px",
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
    borderRadius: "12px",
  },
  subscriptionIcon: {
    color: theme.palette.primary.main,
    fontSize: "2rem",
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
