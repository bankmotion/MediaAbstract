import { makeStyles } from "tss-react/mui";
import { keyframes } from "@emotion/react";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const useStyles = makeStyles()((theme) => ({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    background: "linear-gradient(145deg, #f6f8fc 0%, #ffffff 100%)",
    minHeight: "100vh",
    padding: theme.spacing(3),
    paddingBottom: theme.spacing(10),

    animation: `${fadeIn} 0.6s ease-out`,
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2),
      paddingBottom: theme.spacing(10),
    },
  },
  header: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(3),
    backdropFilter: "blur(10px)",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: "16px",
    padding: theme.spacing(2, 3),
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "flex-start",
      gap: theme.spacing(2),
      padding: theme.spacing(2),
    },
  },
  backButton: {
    marginRight: theme.spacing(2),
    textTransform: "none",
    color: theme.palette.primary.main,
    borderRadius: "12px",
    padding: theme.spacing(1, 2),
    transition: "all 0.3s ease",
    "&:hover": {
      backgroundColor: `${theme.palette.primary.main}15`,
      transform: "translateX(-4px)",
    },
  },
  pageTitle: {
    fontWeight: 700,
    color: theme.palette.primary.main,
    fontSize: "2rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.75rem",
    },
  },
  content: {
    maxWidth: "1200px",
    margin: "0 auto",
    width: "100%",
    padding: theme.spacing(0, 2),
    [theme.breakpoints.down("sm")]: {
      margin: 0,
      padding: theme.spacing(0),
      width: "100%",
      "& .MuiGrid-item": {
        padding: theme.spacing(1),
      },
    },
  },
  profileCard: {
    background: "rgba(255, 255, 255, 0.9)",
    borderRadius: "24px",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
    marginBottom: theme.spacing(2),
    width: "100%",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: "0 12px 48px rgba(0, 0, 0, 0.12)",
    },
    [theme.breakpoints.down("sm")]: {
      maxWidth: "100%",
      margin: theme.spacing(0, 0, 2),
      borderRadius: "16px",
    },
  },
  profileCardContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(4),
    textAlign: "center",
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(3),
    },
  },
  avatarContainer: {
    position: "relative",
    marginBottom: theme.spacing(3),
    width: "fit-content",
    "&::after": {
      content: '""',
      position: "absolute",
      top: -4,
      left: -4,
      right: -4,
      bottom: -4,
      background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
      borderRadius: "50%",
      zIndex: -1,
      opacity: 0.2,
    },
  },
  avatar: {
    width: 140,
    height: 140,
    border: "4px solid #fff",
    boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
    transition: "transform 0.3s ease",
    "&:hover": {
      transform: "scale(1.05)",
    },
    [theme.breakpoints.down("sm")]: {
      width: 120,
      height: 120,
    },
  },
  editAvatarButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
    padding: "8px",
    boxShadow: "0 4px 12px rgba(33, 150, 243, 0.3)",
    transition: "all 0.3s ease",
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
      transform: "scale(1.1)",
    },
  },
  userName: {
    fontWeight: 700,
    marginBottom: theme.spacing(1),
    fontSize: "1.5rem",
    color: "rgba(0, 0, 0, 0.87)",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.25rem",
    },
  },
  userEmail: {
    color: theme.palette.text.secondary,
    fontSize: "1rem",
    fontWeight: 500,
  },
  detailsCard: {
    background: "rgba(255, 255, 255, 0.9)",
    borderRadius: "24px",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
    marginBottom: theme.spacing(2),
    transition: "transform 0.3s ease",
    "&:hover": {
      transform: "translateY(-4px)",
    },
    [theme.breakpoints.down("sm")]: {
      maxWidth: "100%",
      margin: 0,
      marginBottom: theme.spacing(2),
      borderRadius: "16px",
    },
  },
  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2, 3),
    borderBottom: "1px solid rgba(0, 0, 0, 0.06)",
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2),
      borderBottom: "none",
      flexDirection: "column",
      alignItems: "flex-start",
    },
  },
  editButton: {
    textTransform: "none",
    color: theme.palette.primary.main,
    borderRadius: "12px",
    padding: theme.spacing(1, 2),
    transition: "all 0.3s ease",
    "&:hover": {
      backgroundColor: `${theme.palette.primary.main}15`,
      transform: "scale(1.05)",
    },
  },
  editActions: {
    display: "flex",
    gap: theme.spacing(1),
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      marginTop: theme.spacing(2),
      gap: theme.spacing(1),
      "& > button": {
        flex: 1,
        minWidth: 0,
      },
    },
  },
  saveButton: {
    textTransform: "none",
    borderRadius: "12px",
    padding: theme.spacing(1, 3),
    boxShadow: "0 4px 12px rgba(33, 150, 243, 0.3)",
    transition: "all 0.3s ease",
    "&:hover": {
      transform: "scale(1.05)",
    },
    [theme.breakpoints.down("sm")]: {
      borderRadius: "8px",
      padding: theme.spacing(1),
      boxShadow: "none",
      backgroundColor: theme.palette.primary.main,
      color: "#fff",
      "&:hover": {
        transform: "none",
        backgroundColor: theme.palette.primary.dark,
      },
    },
  },
  cancelButton: {
    textTransform: "none",
    borderRadius: "12px",
    padding: theme.spacing(1, 3),
    transition: "all 0.3s ease",
    "&:hover": {
      backgroundColor: `${theme.palette.error.main}15`,
      color: theme.palette.error.main,
    },
    [theme.breakpoints.down("sm")]: {
      borderRadius: "8px",
      padding: theme.spacing(1),
      border: "1px solid rgba(0, 0, 0, 0.12)",
      color: "rgba(0, 0, 0, 0.87)",
      "&:hover": {
        backgroundColor: "rgba(0, 0, 0, 0.04)",
      },
    },
  },
  divider: {
    margin: theme.spacing(3, 0),
    backgroundColor: "rgba(0, 0, 0, 0.06)",
  },
  formGrid: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(0, 3, 3),
  },
  inputIcon: {
    color: theme.palette.primary.main,
    marginRight: theme.spacing(1),
  },
  subscriptionCard: {
    background: "rgba(255, 255, 255, 0.9)",
    borderRadius: "24px",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
    transition: "transform 0.3s ease",
    "&:hover": {
      transform: "translateY(-4px)",
    },
    [theme.breakpoints.down("sm")]: {
      maxWidth: "100%",
      margin: 0,
      borderRadius: "16px",
    },
  },
  manageSubscriptionButton: {
    textTransform: "none",
    borderRadius: "12px",
    padding: theme.spacing(1, 3),
    transition: "all 0.3s ease",
    "&:hover": {
      transform: "scale(1.05)",
      backgroundColor: theme.palette.primary.main,
      color: "#fff",
    },
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(0.75, 2),
      fontSize: "0.875rem",
    },
  },
  subscriptionGrid: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(0, 3, 3),
  },
  subscriptionInfo: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(2),
    padding: theme.spacing(3),
    backgroundColor: "rgba(33, 150, 243, 0.04)",
    borderRadius: "16px",
    transition: "transform 0.3s ease",
    "&:hover": {
      transform: "translateY(-4px)",
    },
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2),
      flexDirection: "column",
      alignItems: "flex-start",
      textAlign: "left",
    },
  },
  subscriptionIcon: {
    color: theme.palette.primary.main,
    fontSize: "2.5rem",
    filter: "drop-shadow(0 4px 8px rgba(33, 150, 243, 0.3))",
    [theme.breakpoints.down("sm")]: {
      fontSize: "2rem",
    },
  },
  statusChip: {
    fontWeight: 600,
    borderRadius: "12px",
    padding: theme.spacing(1, 2),
    height: "auto",
  },
  billingDate: {
    color: theme.palette.text.secondary,
    marginTop: theme.spacing(1),
    fontWeight: 500,
  },
  subscriptionDialog: {
    "& .MuiDialog-paper": {
      borderRadius: "24px",
      padding: theme.spacing(3),
      background: "linear-gradient(145deg, #ffffff 0%, #f6f8fc 100%)",
    },
  },
}));

export default useStyles;
