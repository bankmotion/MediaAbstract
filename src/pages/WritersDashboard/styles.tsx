// src/pages/dashboard/dashboardStyles.ts
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  wrapper: {
    background: "linear-gradient(to right, #fdfbfb, #ebedee)",
    paddingTop: theme.spacing(8),

    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2, 0),
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

  body: {
    padding: theme.spacing(2),
  },
  bodyHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing(3),
    marginTop: theme.spacing(6),
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      marginBottom: theme.spacing(2),
      marginTop: theme.spacing(8),
    },
  },

  logoutContainer: {
    top: theme.spacing(1),
    right: theme.spacing(2),
    zIndex: 10,
    [theme.breakpoints.down("sm")]: {
      position: "static",
      width: "100%",
      display: "flex",
      justifyContent: "flex-end",
      marginBottom: theme.spacing(1),
    },
  },

  userInfo: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      gap: theme.spacing(1),
    },
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
    width: 48,
    height: 48,
    [theme.breakpoints.down("sm")]: {
      width: 40,
      height: 40,
    },
  },
  welcomeText: {
    fontWeight: 700,
    fontSize: "1.6rem",
    color: "#333",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.3rem",
    },
  },

  divider: {
    margin: `${theme.spacing(2)} 0`,
  },
  statsSection: {
    marginBottom: theme.spacing(4),
    [theme.breakpoints.down("sm")]: {
      marginBottom: theme.spacing(3),
    },
  },
  statCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: theme.spacing(2),
    boxShadow: "0px 4px 12px rgba(0,0,0,0.05)",
    textAlign: "center",
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(1.5),
    },
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
    marginBottom: theme.spacing(2),
    fontWeight: 600,
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.2rem",
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
  statIcon: {
    fontSize: 36,
    color: theme.palette.primary.main,
    marginBottom: theme.spacing(1),
    [theme.breakpoints.down("sm")]: {
      fontSize: 30,
    },
  },
  statNumber: {
    fontSize: "2rem",
    fontWeight: 600,
    marginTop: theme.spacing(1),
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.6rem",
    },
  },
}));

export default useStyles;
