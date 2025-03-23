// src/pages/dashboard/dashboardStyles.ts
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  wrapper: {
    padding: theme.spacing(4),
    minHeight: "100vh",
    backgroundColor: "#f5f7fa",
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2),
    },
  },
  navheader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: theme.spacing(2, 1),
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",

    zIndex: 1000,
    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(1.0, 0),
      paddingLeft: theme.spacing(1.5),
    },
  },

  logoText: {
    display: "flex",
    justifyContent: "flex-start",
    fontWeight: 700,
    fontSize: "1.25rem",
    color: "#000",
    paddingLeft: theme.spacing(1.5),

    "&:hover": {
      fontSize: "1.5rem",
    },
  },

  header: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: theme.spacing(2),
    marginBottom: theme.spacing(4),
  },
  logoutContainer: {
    position: "absolute",
    top: theme.spacing(2),
    right: theme.spacing(2),
    zIndex: 10,
    [theme.breakpoints.down("sm")]: {
      position: "static",
      width: "100%",
      display: "flex",
      justifyContent: "flex-end",
      // marginBottom: theme.spacing(1),
    },
  },

  welcomeText: {
    fontSize: "2rem",
    fontWeight: 700,
    color: theme.palette.primary.main,
    paddingTop: theme.spacing(8),
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.5rem",
      width: "100%",
      textAlign: "center",
      paddingTop: theme.spacing(8),
    },
  },
  logoutButton: {
    fontWeight: 500,
    textTransform: "none",
    marginRight: theme.spacing(2),

    [theme.breakpoints.down("sm")]: {
      fontSize: "0.8rem",
      padding: theme.spacing(0.5, 1.0),
      marginRight: theme.spacing(3),
    },
  },
  statsSection: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: theme.spacing(8),
    [theme.breakpoints.down("sm")]: {
      marginBottom: theme.spacing(5),
    },
  },
  statGrid: {
    [theme.breakpoints.down("sm")]: {
      marginBottom: theme.spacing(2),
    },
  },
  statCard: {
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
  buttonRow: {
    display: "flex",
    gap: theme.spacing(2),
    marginBottom: theme.spacing(3),
    // flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",

    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  newPitchBtn: {
    textTransform: "none",
    fontWeight: 600,
    backgroundColor: "#E6F0FA",
    color: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: "#d4e5f5",
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  addUserBtn: {
    textTransform: "none",
    fontWeight: 600,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  sectionHeader: {
    fontSize: "1.5rem",
    fontWeight: 600,
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.25rem",
    },
  },
  pitchCard: {
    marginBottom: theme.spacing(2),
    backgroundColor: "#fff",
    borderRadius: 10,
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
  },
  pitchTitle: {
    fontWeight: 600,
    fontSize: "1.1rem",
    marginBottom: 4,
    [theme.breakpoints.down("sm")]: {
      fontSize: "1rem",
    },
  },
  sectionHeaderRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "flex-start",
      gap: theme.spacing(1),
    },
  },
  exportButton: {
    textTransform: "none",
    fontWeight: 500,
    fontSize: "0.9rem",
    color: theme.palette.primary.main,
    borderColor: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: "#f0f7ff",
    },
  },
}));

export default useStyles;
