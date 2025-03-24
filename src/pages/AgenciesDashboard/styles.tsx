// src/pages/dashboard/dashboardStyles.ts
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  wrapper: {
    background: "linear-gradient(to right, #fdfbfb, #ebedee)",
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(10),
    [theme.breakpoints.down("sm")]: {
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

  body: {
    padding: theme.spacing(4, 2),
    display: "flex",
    flexDirection: "column",
  },

  statsSection: {
    display: "flex",
    //flexWrap: "wrap",
    // gap: theme.spacing(2),
    justifyContent: "center",
    alignItems: "center",
    marginBottom: theme.spacing(6),
    [theme.breakpoints.down("sm")]: {
      flexWrap: "wrap",
      marginBottom: theme.spacing(2),
    },
  },
  statGrid: {
    maxWidth: 180,
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

    width: "200px",
    height: "50px",
    fontSize: "18px",
    padding: "15px 25px",
    marginTop: "16px",

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
    marginBottom: "15px",
    width: "200px",

    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },

  nextStepsSection: {
    marginBottom: theme.spacing(4),
    backgroundColor: "#f7f9fc",
    padding: theme.spacing(2),
    borderRadius: 12,
    boxShadow: "0px 2px 8px rgba(0,0,0,0.5)",
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
