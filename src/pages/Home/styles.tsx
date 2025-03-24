// src/pages/homeStyles.ts
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  wrapper: {
    background: "linear-gradient(to right, #fdfbfb, #ebedee)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(4, 2),
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(20),
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
  loginButton: {
    fontWeight: 600,
    width: "100px",
    height: "40px",
    textTransform: "none",
    [theme.breakpoints.down("sm")]: {
      width: "100px",
      height: "30px",
    },
  },

  heroSection: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: theme.spacing(6),
    marginTop: theme.spacing(4),
    boxShadow: "0 12px 30px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    maxWidth: 700,
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      borderRadius: 10,
      padding: theme.spacing(4, 1.5),
      margin: theme.spacing(10, 2, 0),
    },
  },

  title: {
    fontWeight: 800,
    color: "#1a1a1a",
    marginBottom: theme.spacing(2),
    fontSize: "2.5rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.8rem",
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
    justifyContent: "space-between",
    maxWidth: 600,
    margin: "0 auto",
    marginTop: theme.spacing(2),

    [theme.breakpoints.down("sm")]: {
      maxWidth: "100%",
      marginTop: theme.spacing(1),
      margin: "0",
    },
  },

  tabLabel: {
    fontWeight: 600,
    fontSize: "1rem",
    textTransform: "none",
    //whiteSpace: "nowrap",
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
      fontSize: "0.8rem",
      width: "170px",
      padding: "0",
      // padding: theme.spacing(0, 1),
    },
  },

  tabIcon: {
    color: "#007BFF",
    marginRight: theme.spacing(1),
    [theme.breakpoints.down("sm")]: {
      // marginRight: theme.spacing(0.5),
      fontSize: "1rem",
      margin: "0",
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

  howItWorksSection: {
    marginTop: theme.spacing(6),
    textAlign: "center",
    padding: theme.spacing(4, 2),
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(6),
      padding: theme.spacing(3, 1),
    },
  },

  howItWorksHeader: {
    fontSize: "1.8rem",
    fontWeight: 700,
    marginBottom: theme.spacing(4),
    color: "#1a1a1a",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.5rem",
    },
  },

  howCard: {
    height: "250px",
    borderRadius: 16,
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
    transition: "all 0.3s ease",
    "&:hover": {
      transform: "translateY(-6px)",
    },
  },

  howCardContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(4),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(3),
    },
  },

  howIcon: {
    fontSize: "3rem",
    color: theme.palette.primary.main,
    marginBottom: theme.spacing(2),
  },

  howTitle: {
    fontWeight: 600,
    fontSize: "1.2rem",
    marginBottom: theme.spacing(1),
  },

  howText: {
    fontSize: "1rem",
    color: "#555",
    textAlign: "center",
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.95rem",
    },
  },
}));

export default useStyles;
