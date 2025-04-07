// src/pages/dashboard/dashboardStyles.ts
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  wrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(to right, #fdfbfb, #ebedee)",
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(10),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2, 0),
      paddingBottom: theme.spacing(6),
    },
  },
  appbar: {
    display: "flex",
    height: "60px",
    position: "fixed",
    top: "0",
    background: "#fff",
    zIndex: 1000,
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  logoButton: {
    textTransform: "none",
    padding: 0,
    minWidth: "auto",
  },
  logoText: {
    fontWeight: 700,
    fontSize: "1.25rem",
    color: "#000",
    "&:hover": {
      fontSize: "1.5rem",
    },
  },
  headerActions: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(2),
  },
  userProfile: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(1.5),
    padding: theme.spacing(1, 2),
    borderRadius: "12px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    "&:hover": {
      backgroundColor: "rgba(25, 118, 210, 0.05)",
    },
  },
  avatar: {
    width: 64,
    height: 64,
    border: "3px solid #fff",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    transition: "all 0.3s ease",
    "&:hover": {
      transform: "scale(1.05)",
      boxShadow: "0 6px 16px rgba(0,0,0,0.15)",
    },
    [theme.breakpoints.down("sm")]: {
      width: 56,
      height: 56,
    },
  },
  userInfo: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(2),
    position: "relative",
    zIndex: 1,
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      gap: theme.spacing(1),
    },
  },
  userName: {
    fontWeight: 600,
    fontSize: "0.95rem",
    color: theme.palette.text.primary,
  },
  userRole: {
    fontSize: "0.8rem",
    color: theme.palette.text.secondary,
  },
  logoutButton: {
    fontWeight: 600,
    width: "100px",
    height: "40px",
    textTransform: "none",
    [theme.breakpoints.down("sm")]: {
      width: "100px",
      height: "30px",
    },
  },

  body: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    maxWidth: "1200px",
    padding: theme.spacing(6, 2),
    paddingTop: "80px",
    margin: "0 auto",
    textAlign: "center",
    overflow: "hidden",
    backgroundColor: "#f9f9f9",

    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(4, 1),
      margin: theme.spacing(1),
      paddingTop: "40px",
    },
  },
  bodyHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(2),
    padding: theme.spacing(3),
    backgroundColor: "#ffffff",
    borderRadius: 16,
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
    position: "relative",
    overflow: "hidden",
    border: "1px solid rgba(25, 118, 210, 0.1)",
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background:
        "linear-gradient(135deg, rgba(25, 118, 210, 0.05) 0%, rgba(25, 118, 210, 0.02) 100%)",
      zIndex: 0,
    },
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      padding: theme.spacing(2),
      marginBottom: theme.spacing(3),
    },
  },

  welcomeText: {
    fontWeight: 700,
    fontSize: "2rem",
    background: "linear-gradient(45deg, #1976d2, #64b5f6)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    margin: 5,
    position: "relative",
    zIndex: 1,
    "&::after": {
      content: '""',
      position: "absolute",
      bottom: -4,
      left: 0,
      width: "100%",
      height: "2px",
      background: "linear-gradient(90deg, #1976d2, #64b5f6)",
      transform: "scaleX(0)",
      transformOrigin: "left",
      transition: "transform 0.3s ease",
    },
    "&:hover::after": {
      transform: "scaleX(1)",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.5rem",
    },
  },

  divider: {
    margin: `${theme.spacing(2)} 0`,
  },
  nextStepsSection: {
    marginBottom: theme.spacing(4),
    backgroundColor: "#ffffff",
    padding: theme.spacing(3),
    borderRadius: 16,
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
    position: "relative",
    overflow: "hidden",
    border: "1px solid rgba(25, 118, 210, 0.1)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: "0 15px 35px rgba(0, 0, 0, 0.12)",
    },
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      width: "4px",
      height: "100%",
      background: "linear-gradient(to bottom, #1976d2, #64b5f6)",
    },
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2),
      borderRadius: 12,
    },
  },
  nextStepItem: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(2),
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    backgroundColor: "rgba(25, 118, 210, 0.02)",
    borderRadius: 12,
    cursor: "pointer",
    transition: "all 0.3s ease",
    border: "1px solid rgba(25, 118, 210, 0.08)",
    "&:last-child": {
      marginBottom: 0,
    },
    "&:hover": {
      backgroundColor: "rgba(25, 118, 210, 0.05)",
      transform: "translateX(8px)",
      border: "1px solid rgba(25, 118, 210, 0.2)",
    },
  },
  nextStepIcon: {
    backgroundColor: "#fff",
    color: theme.palette.primary.main,
    padding: theme.spacing(1),
    borderRadius: "50%",
    boxShadow: "0 4px 12px rgba(25, 118, 210, 0.15)",
    transition: "all 0.3s ease",
    "& svg": {
      fontSize: "1.5rem",
    },
    "&:hover": {
      transform: "rotate(15deg)",
      boxShadow: "0 6px 16px rgba(25, 118, 210, 0.25)",
    },
  },
  nextStepContent: {
    flex: 1,
  },
  nextStepTitle: {
    fontWeight: 600,
    fontSize: "1.1rem",
    color: theme.palette.text.primary,
    marginBottom: theme.spacing(0.5),
  },
  nextStepDescription: {
    color: theme.palette.text.secondary,
    fontSize: "0.9rem",
    lineHeight: 1.5,
  },
  nextStepArrow: {
    color: theme.palette.primary.main,
    transition: "transform 0.3s ease",
    opacity: 0.7,
    "&:hover": {
      transform: "translateX(4px)",
      opacity: 1,
    },
  },
  sectionHeader: {
    fontSize: "1.5rem",
    fontWeight: 600,
    marginBottom: theme.spacing(3),
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(1.5),
    color: theme.palette.text.primary,
    "& svg": {
      color: theme.palette.primary.main,
      fontSize: "1.8rem",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.25rem",
      marginBottom: theme.spacing(2),
    },
  },

  statsSection: {
    display: "flex",
    flexWrap: "wrap",
    gap: theme.spacing(2),
    justifyContent: "center",
    alignItems: "center",
    marginBottom: theme.spacing(8),
    [theme.breakpoints.down("sm")]: {
      flexWrap: "wrap",
      marginBottom: theme.spacing(5),
    },
  },
  statGrid: {
    maxWidth: 170,
    flex: "1 1 auto", // allow to stretch a bit
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      marginBottom: theme.spacing(2),
    },
  },
  statCard: {
    width: "100%",
    border: "1px solid #e0e0e0",
    textAlign: "center",
    padding: theme.spacing(2),
    borderRadius: 12,
    boxShadow: "0 3px 10px rgba(0,0,0,0.08)",
    backgroundColor: "#fff",
    height: "100%",
  },
  statIcon: {
    fontSize: 36,
    color: theme.palette.primary.main,
    marginBottom: theme.spacing(1),
  },
  statNumber: {
    fontSize: "2rem",
    fontWeight: 600,
    marginTop: theme.spacing(1),
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-start",
    marginBottom: theme.spacing(3),
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
    },
  },
  actionButton: {
    padding: theme.spacing(1.2, 3),
    fontSize: "1rem",
    borderRadius: 8,
    textTransform: "none",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      fontSize: "0.95rem",
      padding: theme.spacing(1, 2),
    },
  },
  sectionTitle: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    fontWeight: 600,
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.2rem",
      marginBottom: theme.spacing(2),
    },
  },
  pitchCard: {
    backgroundColor: "#fff",
    padding: theme.spacing(2),
    borderRadius: 10,
    boxShadow: "0px 2px 8px rgba(0,0,0,0.05)",
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(1.5),
    },
  },
  pitchTitle: {
    fontWeight: 600,
    fontSize: "1.1rem",
    marginBottom: theme.spacing(1),
    [theme.breakpoints.down("sm")]: {
      fontSize: "1rem",
    },
  },
  pitchStatus: {
    width: 10,
    height: 10,
    borderRadius: "50%",
    marginRight: 1,
  },
  activityTimeline: {
    paddingLeft: 0,
    marginTop: theme.spacing(2),
  },
  activityItem: {
    display: "flex",
    alignItems: "flex-start",
    gap: theme.spacing(1.5),
    padding: theme.spacing(1.5),
    borderRadius: "8px",
    transition: "all 0.2s ease",
    cursor: "pointer",
    marginBottom: theme.spacing(1),
    border: "1px solid transparent",
    "&:hover": {
      backgroundColor: "rgba(25, 118, 210, 0.04)",
      border: "1px solid rgba(25, 118, 210, 0.1)",
      transform: "translateX(4px)",
    },
  },
  savedOutletsSection: {
    marginTop: theme.spacing(4),
  },
  savedOutletsGrid: {
    display: "grid",
    paddingLeft: "15px",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: theme.spacing(4),
    [theme.breakpoints.down("md")]: {
      gridTemplateColumns: "repeat(2, 1fr)",
    },
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      flexDirection: "column",
      gridTemplateColumns: "100%",
      gap: theme.spacing(2),
      marginTop: "10px",
    },
  },
  savedPitchCard: {
    minHeight: "210px",
    backgroundColor: "#fff",
    borderRadius: 12,
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
    transition: "transform 0.2s, box-shadow 0.2s",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    },
    [theme.breakpoints.down("sm")]: {
      minHeight: "0px",
    },
  },
  savedPitchHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(2),
    borderBottom: "1px solid rgba(0,0,0,0.08)",
    cursor: "pointer",
  },
  savedPitchTitle: {
    flex: 1,
    fontWeight: 600,
    fontSize: "1.1rem",
    color: theme.palette.text.primary,
  },
  savedPitchIcon: {
    color: theme.palette.primary.main,
    marginRight: theme.spacing(1),
  },
  savedPitchDropdown: {
    color: theme.palette.text.secondary,
    transition: "transform 0.2s",
    "&.expanded": {
      transform: "rotate(180deg)",
    },
  },
  savedOutletsList: {
    padding: theme.spacing(1),
    maxHeight: 0,
    overflow: "hidden",
    transition: "max-height 0.3s ease-out, padding 0.3s ease-out",
    "&.expanded": {
      maxHeight: "500px",
      padding: theme.spacing(2),
    },
    "&.initial": {
      maxHeight: "100px",
      padding: theme.spacing(2),
    },
  },
  savedOutletItem: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(1),
    borderRadius: 8,
    cursor: "pointer",
    transition: "background-color 0.2s",
    "&:hover": {
      backgroundColor: "rgba(0,0,0,0.04)",
    },
  },
  savedOutletName: {
    color: theme.palette.primary.main,
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
      color: theme.palette.primary.dark,
    },
  },
  emptyStateCard: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(4),
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    textAlign: "center",
  },
  emptyStateIcon: {
    fontSize: 48,
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(2),
  },
  emptyStateText: {
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(2),
  },
  moreButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(1.5),
    // margin: theme.spacing(1),
    color: theme.palette.primary.main,
    cursor: "pointer",
    "&:hover": {
      color: theme.palette.primary.dark,
    },
  },
  moreButtonText: {
    marginRight: theme.spacing(1),
    fontSize: "0.9rem",
  },
  moreButtonIcon: {
    transition: "transform 0.2s",
    "&.expanded": {
      transform: "rotate(180deg)",
    },
  },

  dashboardLayout: {
    display: "grid",
    gridTemplateColumns: "1fr 300px",
    gap: theme.spacing(3),
    width: "100%",
    alignItems: "start",
    [theme.breakpoints.down("md")]: {
      gridTemplateColumns: "1fr",
    },
  },

  mainContent: {
    width: "100%",
  },

  activitySidebar: {
    position: "sticky",
    top: "80px",
    backgroundColor: "#fff",
    borderRadius: "16px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
    overflow: "hidden",
    transition: "all 0.3s ease",
    border: "1px solid rgba(0,0,0,0.05)",
    "&:hover": {
      boxShadow: "0 6px 24px rgba(0,0,0,0.12)",
    },
    [theme.breakpoints.down("md")]: {
      position: "relative",
      top: 0,
      marginBottom: theme.spacing(4),
      order: -1, // This will move it to the top on mobile
    },
  },

  activityHeader: {
    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
    color: "#fff",
    padding: theme.spacing(2.5, 2),
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(1.5),
    borderBottom: "1px solid rgba(255,255,255,0.1)",
  },

  activityContent: {
    padding: theme.spacing(2),
    maxHeight: "calc(100vh - 200px)",
    overflowY: "auto",
    "&::-webkit-scrollbar": {
      width: "6px",
    },
    "&::-webkit-scrollbar-track": {
      background: "#f1f1f1",
      borderRadius: "3px",
    },
    "&::-webkit-scrollbar-thumb": {
      background: "#888",
      borderRadius: "3px",
      "&:hover": {
        background: "#666",
      },
    },
    [theme.breakpoints.down("md")]: {
      maxHeight: "300px",
    },
    [theme.breakpoints.down("sm")]: {
      maxHeight: "280px",
    },
  },

  activityIcon: {
    color: theme.palette.primary.main,
    backgroundColor: "rgba(25, 118, 210, 0.08)",
    padding: theme.spacing(1),
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.2s ease",
    "& svg": {
      fontSize: "1.2rem",
    },
    "&:hover": {
      backgroundColor: "rgba(25, 118, 210, 0.12)",
      transform: "scale(1.05)",
    },
  },

  activityText: {
    flex: 1,
    "& .action": {
      fontWeight: 500,
      color: theme.palette.text.primary,
      marginBottom: theme.spacing(0.5),
    },
    "& .timestamp": {
      color: theme.palette.text.secondary,
      fontSize: "0.85rem",
      display: "flex",
      alignItems: "center",
      gap: theme.spacing(0.5),
    },
  },

  noActivity: {
    padding: theme.spacing(4),
    textAlign: "center",
    color: theme.palette.text.secondary,
    "& svg": {
      fontSize: "2.5rem",
      marginBottom: theme.spacing(1),
      color: theme.palette.primary.light,
    },
  },

  userStats: {
    display: "flex",
    gap: theme.spacing(3),
    position: "relative",
    zIndex: 1,
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(2),
      gap: theme.spacing(2),
    },
  },
  statItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(1.5, 2),
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 12,
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
    transition: "all 0.3s ease",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      backgroundColor: "#fff",
    },
  },
  statValue: {
    fontWeight: 600,
    fontSize: "1.2rem",
    color: theme.palette.primary.main,
  },
  statLabel: {
    fontSize: "0.85rem",
    color: theme.palette.text.secondary,
  },
}));

export default useStyles;
