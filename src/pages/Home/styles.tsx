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
    },
  },

  tabRoot: {
    display: "flex",
    justifyContent: "center",
    maxWidth: 500,
    margin: "0 auto",
    marginTop: theme.spacing(2),
  },

  tabLabel: {
    fontWeight: 600,
    fontSize: "1rem",
    textTransform: "none",
    "&.Mui-selected": {
      color: "#007BFF",
    },
    "&:hover": {
      backgroundColor: "#f5faff",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.95rem",
    },
  },

  tabIcon: {
    color: "#007BFF",
    marginRight: theme.spacing(1),
  },
}));

export default useStyles;
