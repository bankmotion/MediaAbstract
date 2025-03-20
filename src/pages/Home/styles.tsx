// src/pages/homeStyles.ts
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  wrapper: {
    //minHeight: "100vh",
    background: "linear-gradient(to right, #fdfbfb, #ebedee)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(4, 2),
  },

  loginWrapper: {
    display: "flex",
    justifyContent: "flex-end",
    paddingRight: theme.spacing(4),
    paddingTop: theme.spacing(2),
    position: "absolute",
    right: 0,
    top: 0,
    zIndex: 10,
    [theme.breakpoints.down("sm")]: {
      paddingRight: theme.spacing(2),
      paddingTop: theme.spacing(1),
    },
  },

  loginButton: {
    textTransform: "none",
    fontWeight: 600,
    fontSize: "1rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.9rem",
      padding: theme.spacing(0.5, 1.5),
    },
  },

  heroSection: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: theme.spacing(6),
    boxShadow: "0 12px 30px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    maxWidth: 700,
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(4),
      margin: theme.spacing(8, 2, 0),
    },
  },

  title: {
    fontWeight: 800,
    color: "#1a1a1a",
    marginBottom: theme.spacing(2),
    fontSize: "2.5rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: "2rem",
    },
  },

  subtitle: {
    color: "#555",
    fontSize: "20px",
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      fontSize: "1rem",
      marginTop: theme.spacing(2),
    },
  },

  tabRoot: {
    display: "flex",
    justifyContent: "center",
    maxWidth: 600,
    margin: "0 auto",
    marginTop: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      maxWidth: "100%",
      marginTop: theme.spacing(1),
    },
  },

  tabLabel: {
    fontWeight: 600,
    fontSize: "1rem",
    textTransform: "none",
    width: "300px",
    "&.Mui-selected": {
      color: "#007BFF",
      borderBottom: "2px solid #007BFF",
    },
    "&:hover": {
      color: "#0056b3",
      backgroundColor: "#f5faff",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.9rem",
      width: "150px",
      padding: theme.spacing(0, 1),
    },
  },

  tabIcon: {
    color: "#007BFF",
    marginRight: theme.spacing(1),
    [theme.breakpoints.down("sm")]: {
      marginRight: theme.spacing(0.5),
      fontSize: "1rem",
    },
  },

  startButton: {
    marginTop: theme.spacing(8),
    padding: theme.spacing(0.5, 2),
    fontSize: "1.2rem",
    fontWeight: 500,
    borderRadius: 8,
    backgroundColor: "#007BFF",
    textTransform: "none",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#0069d9",
    },
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(4),
      fontSize: "1rem",
      padding: theme.spacing(0.5, 1.5),
    },
  },
}));

export default useStyles;
