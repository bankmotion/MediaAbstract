import { makeStyles } from "tss-react/mui";
import { keyframes } from "@emotion/react";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`;

const useStyles = makeStyles()((theme) => ({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    background: "linear-gradient(150deg, #ffffff 0%, #f5f9ff 100%)",
    minHeight: "100vh",
    padding: theme.spacing(4),
    paddingBottom: theme.spacing(8),
    animation: `${fadeIn} 0.5s ease-out`,
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2, 2, 4),
      background: "#ffffff",
    },
  },
  header: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(4),
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: "16px",
    padding: theme.spacing(3),
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.04)",
    position: "relative",
    overflow: "hidden",
    backdropFilter: "blur(8px)",
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: "3px",
      background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
      opacity: 0.8,
    },
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "flex-start",
      gap: theme.spacing(1.5),
      padding: theme.spacing(2),
      backgroundColor: "transparent",
      boxShadow: "none",
    },
  },
  backButton: {
    marginRight: theme.spacing(3),
    textTransform: "none",
    color: theme.palette.text.primary,
    borderRadius: "8px",
    padding: theme.spacing(1, 2),
    fontSize: "0.95rem",
    fontWeight: 500,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.06)",
      transform: "translateX(-2px)",
    },
    [theme.breakpoints.down("sm")]: {
      marginRight: 0,
      backgroundColor: "transparent",
    },
  },
  pageTitle: {
    fontWeight: 600,
    color: theme.palette.text.primary,
    fontSize: "1.75rem",
    letterSpacing: "-0.3px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.5rem",
    },
  },
  content: {
    maxWidth: "1200px",
    margin: "0 auto",
    width: "100%",
    padding: theme.spacing(0, 2),
    [theme.breakpoints.down("sm")]: {
      padding: 0,
      margin: 0,
      "& .MuiGrid-item": {
        padding: theme.spacing(1, 0),
      },
    },
  },
  profileCard: {
    background: "#ffffff",
    borderRadius: "16px",
    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.04)",
    marginBottom: theme.spacing(3),
    width: "100%",
    transition: "all 0.3s ease",
    position: "relative",
    overflow: "hidden",
    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: "0 20px 60px rgba(0, 0, 0, 0.06)",
    },
    [theme.breakpoints.down("sm")]: {
      marginBottom: theme.spacing(2),
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.06)",
      "&:hover": {
        transform: "none",
      },
    },
  },
  profileCardContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(4),
    textAlign: "center",
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2),
    },
  },
  avatarContainer: {
    position: "relative",
    marginBottom: theme.spacing(3),
    "&::after": {
      content: '""',
      position: "absolute",
      top: -4,
      left: -4,
      right: -4,
      bottom: -4,
      background: `linear-gradient(135deg, ${theme.palette.primary.light}20, ${theme.palette.primary.main}20)`,
      borderRadius: "50%",
      zIndex: -1,
      transition: "all 0.3s ease",
    },
  },
  avatar: {
    width: 140,
    height: 140,
    border: "3px solid #ffffff",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.08)",
    transition: "all 0.3s ease",
    [theme.breakpoints.down("sm")]: {
      width: 120,
      height: 120,
    },
  },
  editAvatarButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#ffffff",
    color: theme.palette.primary.main,
    padding: "8px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    "&:hover": {
      backgroundColor: "#ffffff",
      transform: "scale(1.05)",
    },
  },
  userName: {
    fontWeight: 600,
    marginBottom: theme.spacing(0.5),
    fontSize: "1.5rem",
    color: theme.palette.text.primary,
    letterSpacing: "-0.3px",
  },
  userEmail: {
    color: theme.palette.text.secondary,
    fontSize: "1rem",
    fontWeight: 400,
  },
  detailsCard: {
    background: "#ffffff",
    borderRadius: "16px",
    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.04)",
    marginBottom: theme.spacing(3),
    overflow: "hidden",
    transition: "all 0.3s ease",
    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: "0 20px 60px rgba(0, 0, 0, 0.06)",
    },
    [theme.breakpoints.down("sm")]: {
      marginBottom: theme.spacing(2),
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.06)",
      "&:hover": {
        transform: "none",
      },
    },
  },
  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: theme.spacing(3),
    borderBottom: "1px solid rgba(0, 0, 0, 0.06)",
    backgroundColor: "rgba(0, 0, 0, 0.02)",
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2),
      flexDirection: "column",
      alignItems: "flex-start",
      gap: theme.spacing(1.5),
    },
  },
  editButton: {
    textTransform: "none",
    borderRadius: "8px",
    padding: theme.spacing(1, 3),
    color: theme.palette.text.primary,
    backgroundColor: "rgba(0, 0, 0, 0.04)",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.08)",
    },
  },
  editActions: {
    display: "flex",
    gap: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      "& > button": {
        flex: 1,
      },
    },
  },
  saveButton: {
    textTransform: "none",
    borderRadius: "8px",
    padding: theme.spacing(1.25, 3),
    backgroundColor: theme.palette.primary.main,
    color: "#ffffff",
    fontWeight: 500,
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  cancelButton: {
    textTransform: "none",
    borderRadius: "8px",
    padding: theme.spacing(1.25, 3),
    border: "1px solid rgba(0, 0, 0, 0.12)",
    color: theme.palette.text.primary,
    fontWeight: 500,
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.04)",
    },
  },
  formGrid: {
    padding: theme.spacing(3),
    "& .MuiTextField-root": {
      "& .MuiOutlinedInput-root": {
        borderRadius: "8px",
        backgroundColor: "rgba(0, 0, 0, 0.02)",
        transition: "all 0.2s ease",
        "&:hover": {
          backgroundColor: "rgba(0, 0, 0, 0.03)",
        },
        "&.Mui-focused": {
          backgroundColor: "#ffffff",
        },
      },
    },
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2),
    },
  },
  divider: {
    margin: theme.spacing(3, 0),
    backgroundColor: "rgba(0, 0, 0, 0.06)",
  },
  inputIcon: {
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(1),
  },
  subscriptionCard: {
    background: "#ffffff",
    borderRadius: "16px",
    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.04)",
    overflow: "hidden",
    [theme.breakpoints.down("sm")]: {
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.06)",
    },
  },
  subscriptionInfo: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(2.5),
    padding: theme.spacing(2.5),
    backgroundColor: "rgba(0, 0, 0, 0.02)",
    borderRadius: "12px",
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2),
      gap: theme.spacing(1.5),
      flexDirection: "column",
      alignItems: "flex-start",
    },
  },
  subscriptionIcon: {
    color: theme.palette.primary.main,
    fontSize: "2rem",
  },
  statusChip: {
    borderRadius: "6px",
    height: "28px",
    fontWeight: 500,
    fontSize: "0.875rem",
  },
  billingDate: {
    color: theme.palette.text.secondary,
    fontSize: "0.875rem",
    marginTop: theme.spacing(0.5),
  },
  subscriptionDialog: {
    "& .MuiDialog-paper": {
      borderRadius: "16px",
      padding: theme.spacing(2),
    },
  },
  manageSubscriptionButton: {
    textTransform: "none",
    borderRadius: "8px",
    padding: theme.spacing(1, 2),
    color: theme.palette.primary.main,
    border: `1px solid ${theme.palette.primary.main}`,
    "&:hover": {
      backgroundColor: `${theme.palette.primary.main}10`,
    },
  },
  subscriptionGrid: {
    padding: theme.spacing(3),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2),
    },
  },
}));

export default useStyles;
