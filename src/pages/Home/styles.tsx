// src/pages/homeStyles.ts
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  wrapper: {
    background: "#f8fafc",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(4, 2),
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(20),
    minHeight: "100vh",
    position: "relative",
  },

  appbar: {
    display: "flex",
    height: "64px",
    position: "fixed",
    top: "0",
    left: 0,
    right: 0,
    backgroundColor: "#ffffff",
    zIndex: 1000,
    borderBottom: "1px solid rgba(0, 0, 0, 0.08)",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
    backdropFilter: "blur(8px)",
    borderRadius: "0 0 12px 12px",
    transition: "all 0.3s ease",
  },

  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    padding: theme.spacing(0, 4),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(0, 2),
    },
  },

  logoButton: {
    textTransform: "none",
    padding: 0,
    minWidth: "auto",
    transition: "all 0.2s ease",
  },

  logoText: {
    fontWeight: 600,
    fontSize: "1.4rem",
    color: "#1a1a1a",
    transition: "all 0.2s ease",
    "&:hover": {
      color: "#2563eb",
    },
  },

  loginButton: {
    fontWeight: 500,
    width: "110px",
    height: "38px",
    textTransform: "none",
    borderRadius: "6px",
    border: "1px solid #e0e0e0",
    transition: "all 0.2s ease",
    "&:hover": {
      backgroundColor: "#f1f5f9",
      borderColor: "#2563eb",
      color: "#2563eb",
    },
    [theme.breakpoints.down("sm")]: {
      width: "90px",
      height: "34px",
    },
  },

  heroSection: {
    background: "#ffffff",
    borderRadius: "16px",
    padding: theme.spacing(8),
    marginTop: theme.spacing(6),
    boxShadow: "0 4px 24px rgba(0, 0, 0, 0.06)",
    textAlign: "center",
    maxWidth: 800,
    width: "100%",
    position: "relative",
    zIndex: 1,
    border: "1px solid rgba(0, 0, 0, 0.04)",
    [theme.breakpoints.down("sm")]: {
      borderRadius: "12px",
      padding: theme.spacing(4, 2),
      margin: theme.spacing(10, 2, 0),
    },
  },

  title: {
    fontWeight: 700,
    color: "#1a1a1a",
    marginBottom: theme.spacing(3),
    fontSize: "2.8rem",
    lineHeight: 1.2,
    letterSpacing: "-0.02em",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.8rem",
    },
  },

  subtitle: {
    color: "#1e293b",
    fontSize: "1.2rem",
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(3),
    lineHeight: 1.6,
    fontWeight: 500,
    [theme.breakpoints.down("sm")]: {
      fontSize: "1rem",
      marginTop: theme.spacing(2),
      color: "#334155",
    },
  },

  tabRoot: {
    display: "flex",
    justifyContent: "center",
    maxWidth: 600,
    margin: "0 auto",
    marginTop: theme.spacing(4),
    backgroundColor: "#f1f5f9",
    borderRadius: "10px",
    padding: theme.spacing(0.5),
    [theme.breakpoints.down("sm")]: {
      maxWidth: "100%",
      marginTop: theme.spacing(2),
    },
  },

  tabLabel: {
    fontWeight: 500,
    fontSize: "1rem",
    textTransform: "none",
    width: "260px",
    borderRadius: "8px",
    transition: "all 0.2s ease",
    "&.Mui-selected": {
      color: "#2563eb",
      backgroundColor: "#ffffff",
      boxShadow: "0 2px 8px rgba(37, 99, 235, 0.1)",
    },
    "&:hover": {
      color: "#2563eb",
      backgroundColor: "rgba(255, 255, 255, 0.8)",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.9rem",
      width: "150px",
    },
  },

  tabIcon: {
    color: "#64748b",
    marginRight: theme.spacing(1),
    fontSize: "1.2rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.1rem",
    },
  },

  startButton: {
    marginTop: theme.spacing(8),
    padding: theme.spacing(1.2, 3.5),
    fontSize: "1.1rem",
    fontWeight: 600,
    borderRadius: "10px",
    backgroundColor: "#2563eb",
    textTransform: "none",
    color: "#fff",
    boxShadow: "0 2px 8px rgba(37, 99, 235, 0.2)",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    "&:hover": {
      backgroundColor: "#1d4ed8",
      transform: "translateY(-2px)",
      boxShadow: "0 4px 12px rgba(37, 99, 235, 0.3)",
    },
    "&:active": {
      transform: "translateY(0)",
      boxShadow: "0 2px 8px rgba(37, 99, 235, 0.2)",
    },
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(4),
      fontSize: "1rem",
      padding: theme.spacing(1, 3),
    },
  },

  howItWorksSection: {
    marginTop: theme.spacing(10),
    textAlign: "center",
    padding: theme.spacing(4, 2),
    position: "relative",
    zIndex: 1,
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(6),
      padding: theme.spacing(3, 1),
    },
  },

  howItWorksHeader: {
    fontSize: "2rem",
    fontWeight: 600,
    marginBottom: theme.spacing(6),
    color: "#1a1a1a",
    letterSpacing: "-0.02em",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.6rem",
    },
  },

  howCard: {
    height: "260px",
    borderRadius: "16px",
    boxShadow: "0 4px 24px rgba(0, 0, 0, 0.06)",
    transition: "all 0.3s ease",
    background: "#ffffff",
    position: "relative",
    overflow: "hidden",
    border: "1px solid rgba(0, 0, 0, 0.04)",
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: "3px",
      background: "linear-gradient(90deg, #2563eb, #1d4ed8)",
      opacity: 0,
      transition: "opacity 0.3s ease",
    },
    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: "0 8px 32px rgba(37, 99, 235, 0.1)",
      "&::before": {
        opacity: 1,
      },
    },
  },

  howCardContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(4),
    height: "100%",
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(3),
    },
  },

  howIcon: {
    fontSize: "2.8rem",
    color: "#2563eb",
    marginBottom: theme.spacing(2),
    transition: "all 0.2s ease",
  },

  howTitle: {
    fontWeight: 600,
    fontSize: "1.3rem",
    marginBottom: theme.spacing(1.5),
    color: "#1a1a1a",
  },

  howText: {
    fontSize: "1rem",
    color: "#4a4a4a",
    textAlign: "center",
    lineHeight: 1.6,
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.95rem",
    },
  },

  scrollToTopButton: {
    position: "fixed",
    bottom: theme.spacing(8),
    right: theme.spacing(4),
    zIndex: 1000,
    backgroundColor: "#2563eb",
    color: "white",
    "&:hover": {
      backgroundColor: "#1d4ed8",
    },
    display: "flex",
  },
}));

export default useStyles;
