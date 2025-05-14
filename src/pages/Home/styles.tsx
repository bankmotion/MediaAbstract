// src/pages/homeStyles.ts
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  wrapper: {
    background: "#ffffff",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(4, 2),
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(20),
    minHeight: "100vh",
    position: "relative",
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: "100%",
      backgroundImage:
        "url('https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&w=2000&q=80')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      opacity: 0.2,
      zIndex: 0,
    },
  },

  appbar: {
    display: "flex",
    height: "64px",
    position: "fixed",
    top: "0",
    background: "rgba(255, 255, 255, 0.98)",
    zIndex: 1000,
    borderBottom: "1px solid rgba(0, 0, 0, 0.06)",
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
    color: "#2c3e50",
    transition: "all 0.2s ease",
    "&:hover": {
      color: "#34495e",
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
      backgroundColor: "#f5f5f5",
      borderColor: "#bdbdbd",
    },
    [theme.breakpoints.down("sm")]: {
      width: "90px",
      height: "34px",
    },
  },

  heroSection: {
    background: "#ffffff",
    borderRadius: "12px",
    padding: theme.spacing(8),
    marginTop: theme.spacing(6),
    boxShadow: "0 2px 12px rgba(0, 0, 0, 0.04)",
    textAlign: "center",
    maxWidth: 800,
    width: "100%",
    position: "relative",
    // opacity: 0.8,
    zIndex: 1,
    [theme.breakpoints.down("sm")]: {
      borderRadius: "8px",
      padding: theme.spacing(4, 2),
      margin: theme.spacing(10, 2, 0),
    },
  },

  title: {
    fontWeight: 700,
    color: "#2c3e50",
    marginBottom: theme.spacing(3),
    fontSize: "2.8rem",
    lineHeight: 1.2,
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.8rem",
    },
  },

  subtitle: {
    color: "#546e7a",
    fontSize: "1.2rem",
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(3),
    lineHeight: 1.6,
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
    marginTop: theme.spacing(4),
    backgroundColor: "#f8f9fa",
    borderRadius: "8px",
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
    borderRadius: "6px",
    transition: "all 0.2s ease",
    "&.Mui-selected": {
      color: "#2c3e50",
      backgroundColor: "#ffffff",
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
    },
    "&:hover": {
      color: "#34495e",
      backgroundColor: "rgba(255, 255, 255, 0.8)",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.9rem",
      width: "150px",
    },
  },

  tabIcon: {
    color: "#546e7a",
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
    fontWeight: 500,
    borderRadius: "8px",
    backgroundColor: "#2c3e50",
    textTransform: "none",
    color: "#fff",
    boxShadow: "0 2px 8px rgba(44, 62, 80, 0.15)",
    transition: "all 0.2s ease",
    "&:hover": {
      backgroundColor: "#34495e",
      transform: "translateY(-1px)",
      boxShadow: "0 4px 12px rgba(44, 62, 80, 0.2)",
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
    color: "#2c3e50",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.6rem",
    },
  },

  howCard: {
    height: "260px",
    borderRadius: "12px",
    boxShadow: "0 2px 12px rgba(0, 0, 0, 0.04)",
    transition: "all 0.3s ease",
    background: "#ffffff",
    position: "relative",
    overflow: "hidden",
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: "4px",
      background: "linear-gradient(90deg, #3498db, #2980b9)",
      opacity: 0,
      transition: "opacity 0.3s ease",
    },
    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
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
    color: "#3498db",
    marginBottom: theme.spacing(2),
    transition: "all 0.2s ease",
  },

  howTitle: {
    fontWeight: 600,
    fontSize: "1.3rem",
    marginBottom: theme.spacing(1.5),
    color: "#2c3e50",
  },

  howText: {
    fontSize: "1rem",
    color: "#546e7a",
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
    backgroundColor: "#2c3e50",
    color: "white",
    "&:hover": {
      backgroundColor: "#34495e",
    },
    display: "flex",
  },
}));

export default useStyles;
