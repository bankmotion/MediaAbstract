// src/pages/dashboard/dashboardStyles.ts
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  wrapper: {
    display: "flex",
    // flexDirection: "column",
    // minHeight: "100vh",
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
    top: 0,
    left: 0,
    right: 0,
    background: "#fff",
    zIndex: 1200,
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
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
    width: "100%",
    maxWidth: "1200px",
    margin: "0 auto",
    padding: theme.spacing(3, 2),
    paddingTop: "80px",
    backgroundColor: "#f9f9f9",
    position: "relative",
    minHeight: "calc(100vh - 60px)",
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2, 1),
      paddingTop: "76px",
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
    marginTop: theme.spacing(1),
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
  sectionTitle: {
    fontSize: "1.5rem",
    fontWeight: 600,
    marginBottom: theme.spacing(3),
    color: theme.palette.text.primary,
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(1),
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.2rem",
      marginBottom: theme.spacing(2),
    },
  },

  statsSection: {
    display: "flex",
    gap: theme.spacing(2),
    marginBottom: theme.spacing(4),
    [theme.breakpoints.down("sm")]: {
      gap: theme.spacing(1),
    },
  },
  statGrid: {
    flex: 1,
    minWidth: 0,
  },
  statCard: {
    height: "100%",
    background: "#fff",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
    transition: "all 0.2s ease",
    "&:hover": {
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    },
  },
  statIcon: {
    fontSize: "1.5rem",
    color: theme.palette.primary.main,
    marginBottom: theme.spacing(1),
  },
  statNumber: {
    fontSize: "1.75rem",
    fontWeight: 600,
    color: theme.palette.primary.main,
    marginBottom: theme.spacing(0.5),
  },
  statLabel: {
    fontSize: "0.875rem",
    color: theme.palette.text.secondary,
    fontWeight: 500,
  },
  statProgress: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: "4px",
    background:
      "linear-gradient(90deg, rgba(25, 118, 210, 0.2) 0%, rgba(62, 91, 121, 0.1) 100%)",
    "&::after": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      height: "100%",
      width: "70%",
      background: "linear-gradient(90deg, #1976d2, #64b5f6)",
      animation: "progress 2s ease-in-out infinite",
    },
  },
  "@keyframes progress": {
    "0%": {
      width: "0%",
    },
    "100%": {
      width: "70%",
    },
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing(4),
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      gap: theme.spacing(2),
    },
  },
  pitchCard: {
    height: "100%",
    background: "#fff",
    borderRadius: "16px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
    transition: "all 0.3s ease",
    border: "1px solid rgba(25, 118, 210, 0.1)",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    position: "relative",
    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
      borderColor: "rgba(25, 118, 210, 0.2)",
    },
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "4px",
      background: "linear-gradient(90deg, #1976d2, #64b5f6)",
    },
  },
  pitchCardContent: {
    padding: theme.spacing(2.5),
    height: "100%",
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
    position: "relative",
    zIndex: 1,
  },
  pitchHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: theme.spacing(1),
    minHeight: "48px",
    position: "relative",
  },
  pitchTitle: {
    fontWeight: 600,
    fontSize: "1.1rem",
    color: theme.palette.text.primary,
    flex: 1,
    marginRight: theme.spacing(2),
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    minWidth: 0,
    lineHeight: 1.4,
  },
  pitchStatus: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(1),
    padding: theme.spacing(0.5, 1),
    borderRadius: "8px",
    fontSize: "0.875rem",
    fontWeight: 500,
    whiteSpace: "nowrap",
    flexShrink: 0,
    background: "rgba(25, 118, 210, 0.08)",
    color: theme.palette.primary.main,
    "&.submitted": {
      background: "rgba(25, 118, 210, 0.08)",
      color: theme.palette.primary.main,
    },
    "&.matched": {
      background: "rgba(76, 175, 80, 0.08)",
      color: "#4caf50",
    },
  },
  pitchStatusDot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    "&.submitted": {
      backgroundColor: theme.palette.primary.main,
    },
    "&.matched": {
      backgroundColor: "#4caf50",
    },
  },
  pitchMatches: {
    marginTop: "auto",
    paddingTop: theme.spacing(2),
    borderTop: "1px solid rgba(0,0,0,0.08)",
    background: "rgba(25, 118, 210, 0.02)",
    borderRadius: "8px",
    padding: theme.spacing(1.5),
  },
  matchList: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(1.5),
    marginBottom: theme.spacing(2),
  },
  matchItem: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(1),
    fontSize: "0.875rem",
    color: theme.palette.text.secondary,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    padding: theme.spacing(0.5, 1),
    borderRadius: "6px",
    background: "rgba(255, 255, 255, 0.5)",
    transition: "all 0.2s ease",
    "&:hover": {
      background: "rgba(255, 255, 255, 0.8)",
      transform: "translateX(4px)",
    },
  },
  matchScore: {
    fontWeight: 600,
    color: theme.palette.primary.main,
    background: "rgba(25, 118, 210, 0.1)",
    padding: theme.spacing(0.25, 0.75),
    borderRadius: "4px",
    marginLeft: theme.spacing(0.5),
  },
  pitchActions: {
    display: "flex",
    gap: theme.spacing(1),
    marginTop: "auto",
    "& button": {
      flex: 1,
      minWidth: "100px",
      borderRadius: "8px",
      textTransform: "none",
      fontWeight: 500,
      padding: theme.spacing(0.75, 1.5),
      transition: "all 0.2s ease",
      "&.primary": {
        background: "rgba(25, 118, 210, 0.1)",
        color: theme.palette.primary.main,
        "&:hover": {
          background: "rgba(25, 118, 210, 0.2)",
          transform: "translateY(-2px)",
        },
      },
      "&.secondary": {
        background: "rgba(0, 0, 0, 0.05)",
        color: theme.palette.text.secondary,
        "&:hover": {
          background: "rgba(0, 0, 0, 0.1)",
          transform: "translateY(-2px)",
        },
      },
    },
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
    padding: theme.spacing(3),
    background: "#fff",
    borderRadius: "16px",
    boxShadow: "0 2px 12px rgba(0, 0, 0, 0.05)",
    transition: "all 0.3s ease",
    "&:hover": {
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
    },
  },
  savedOutletsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: theme.spacing(3),
    marginTop: theme.spacing(2),
  },
  savedPitchCard: {
    background: "#fff",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
    border: "1px solid rgba(0, 0, 0, 0.05)",
    transition: "all 0.3s ease",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
    },
  },
  savedPitchHeader: {
    padding: theme.spacing(2),
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(1.5),
    cursor: "pointer",
    borderBottom: "1px solid rgba(0, 0, 0, 0.05)",
    "&:hover": {
      background: "rgba(0, 0, 0, 0.01)",
    },
  },
  savedPitchIcon: {
    color: theme.palette.primary.main,
    fontSize: "1.5rem",
  },
  savedPitchTitle: {
    fontSize: "1rem",
    fontWeight: 500,
    color: theme.palette.text.primary,
    flex: 1,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    maxWidth: "calc(100% - 40px)",
  },
  savedPitchDropdown: {
    color: theme.palette.text.secondary,
    transition: "transform 0.3s ease",
    "&.expanded": {
      transform: "rotate(180deg)",
    },
  },
  savedOutletsList: {
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(1.5),
    maxHeight: "0",
    overflow: "hidden",
    transition: "max-height 0.3s ease-out, padding 0.3s ease-out",
    "&.expanded": {
      maxHeight: "500px",
      padding: theme.spacing(2),
    },
    "&::-webkit-scrollbar": {
      width: "6px",
    },
    "&::-webkit-scrollbar-track": {
      background: "rgba(0, 0, 0, 0.05)",
      borderRadius: "3px",
    },
    "&::-webkit-scrollbar-thumb": {
      background: "rgba(0, 0, 0, 0.1)",
      borderRadius: "3px",
      "&:hover": {
        background: "rgba(0, 0, 0, 0.2)",
      },
    },
  },
  savedOutletItem: {
    padding: theme.spacing(1.5),
    borderRadius: "8px",
    background: "rgba(0, 0, 0, 0.02)",
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(1.5),
    cursor: "pointer",
    transition: "all 0.2s ease",
    "&:hover": {
      background: "rgba(0, 0, 0, 0.04)",
      transform: "translateX(4px)",
    },
  },
  savedOutletName: {
    fontSize: "0.9rem",
    fontWeight: 500,
    color: theme.palette.text.primary,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    width: "100%",
  },
  emptyStateCard: {
    padding: theme.spacing(4),
    textAlign: "center",
    background: "rgba(0, 0, 0, 0.02)",
    borderRadius: "12px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: theme.spacing(2),
  },
  emptyStateIcon: {
    fontSize: "3rem",
    color: theme.palette.text.secondary,
    opacity: 0.5,
  },
  emptyStateText: {
    color: theme.palette.text.secondary,
    maxWidth: "400px",
    margin: "0 auto",
  },
  moreButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing(1),
    padding: theme.spacing(1.5),
    background: "rgba(0, 0, 0, 0.02)",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    marginTop: theme.spacing(1),
    "&:hover": {
      background: "rgba(0, 0, 0, 0.04)",
    },
  },
  moreButtonText: {
    fontSize: "0.9rem",
    fontWeight: 500,
    color: theme.palette.primary.main,
  },
  moreButtonIcon: {
    color: theme.palette.primary.main,
    transition: "transform 0.3s ease",
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
    position: "relative",
    minHeight: "calc(100vh - 140px)",
    marginTop: theme.spacing(2),
    [theme.breakpoints.down("md")]: {
      gridTemplateColumns: "1fr",
      minHeight: "auto",
    },
  },

  mainContent: {
    width: "100%",
  },

  activitySidebar: {
    position: "sticky",
    top: "80px",
    height: "calc(100vh - 140px)",
    backgroundColor: "#fff",
    borderRadius: "16px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
    overflow: "hidden",
    transition: "all 0.3s ease",
    border: "1px solid rgba(0,0,0,0.05)",
    display: "flex",
    flexDirection: "column",
    alignSelf: "flex-start",
    "&:hover": {
      boxShadow: "0 6px 24px rgba(0,0,0,0.12)",
    },
    [theme.breakpoints.down("md")]: {
      position: "relative",
      top: 0,
      height: "auto",
      marginBottom: theme.spacing(3),
      order: -1,
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
    position: "sticky",
    top: 0,
    zIndex: 1,
    [theme.breakpoints.down("md")]: {
      position: "relative",
    },
  },

  activityContent: {
    padding: theme.spacing(2),
    flex: 1,
    overflowY: "auto",
    height: "calc(100vh - 240px)",
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
      height: "auto",
      maxHeight: "300px",
    },
    [theme.breakpoints.down("sm")]: {
      maxHeight: "270px",
      padding: theme.spacing(1.5),
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
      flexDirection: "column",
      alignItems: "stretch",
      width: "100%",
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
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      padding: theme.spacing(1.5),
    },
  },
  statValue: {
    fontWeight: 600,
    fontSize: "1.2rem",
    color: theme.palette.primary.main,
  },
  pitchActionButton: {
    padding: theme.spacing(0.75, 1.5),
    fontSize: "0.875rem",
    borderRadius: "8px",
    textTransform: "none",
    fontWeight: 500,
    minWidth: "auto",
    whiteSpace: "nowrap",
    "&.primary": {
      background: "rgba(25, 118, 210, 0.1)",
      color: theme.palette.primary.main,
      "&:hover": {
        background: "rgba(25, 118, 210, 0.2)",
      },
    },
    "&.secondary": {
      background: "rgba(0, 0, 0, 0.05)",
      color: theme.palette.text.secondary,
      "&:hover": {
        background: "rgba(0, 0, 0, 0.1)",
      },
    },
  },
  savedOutletsTitle: {
    fontSize: "1.5rem",
    fontWeight: 600,
    marginBottom: theme.spacing(3),
    color: theme.palette.text.primary,
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.0rem",
      marginBottom: theme.spacing(2),
    },
  },
  sectionHeader: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(1),
    marginBottom: theme.spacing(2),
    fontWeight: 600,
  },

  savedDate: {
    fontSize: "0.875rem",
    color: theme.palette.text.secondary,
    margin: theme.spacing(2),
  },
  newPitchButton: {
    padding: theme.spacing(1, 2),
    borderRadius: "12px",
    textTransform: "none",
    fontWeight: 600,
    fontSize: "0.95rem",
    boxShadow: "0 4px 12px rgba(25, 118, 210, 0.2)",
    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
    color: "#fff",
    transition: "all 0.3s ease",
    height: "fit-content",
    alignSelf: "center",
    "&:hover": {
      boxShadow: "0 6px 16px rgba(25, 118, 210, 0.3)",
      transform: "translateY(-2px)",
      background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
    },
    "& .MuiButton-startIcon": {
      marginRight: theme.spacing(0.5),
      "& svg": {
        fontSize: "1.25rem",
      },
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      marginTop: theme.spacing(2),
      padding: theme.spacing(1.25, 2),
      fontSize: "0.9rem",
    },
  },
}));

export default useStyles;
