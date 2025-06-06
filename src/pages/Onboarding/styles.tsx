import { makeStyles } from "tss-react/mui";

const styles = makeStyles()((theme: any) => ({
  body: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(6, 2),
    // paddingTop: "80px",
    maxWidth: "800px",
    margin: "0 auto",
    textAlign: "center",
    backgroundColor: "#ffffff",
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(4, 2),
      margin: theme.spacing(2),
      paddingTop: "40px",
    },
  },

  title: {
    fontWeight: 700,
    marginBottom: theme.spacing(4),
    color: "#333333",
    fontSize: "2rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.5rem",
      marginBottom: theme.spacing(3),
    },
  },

  tabRoot: {
    width: "100%",
    maxWidth: 500,
    margin: "0 auto",
    marginTop: theme.spacing(2),
  },

  pitchField: {
    fontWeight: 600,
    textTransform: "none",
    fontSize: "1rem",
    margin: "0",
    transition: "none",
    animation: "none",
    "& .MuiInputBase-root": {
      textAlign: "center",
      alignItems: "center",
    },
    "& textarea": {
      textAlign: "center",
      alignContent: "center",
      lineHeight: "1.5",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.9rem",
    },
  },

  pitchFieldContainer: {
    position: "relative",
    width: "100%",
    marginBottom: theme.spacing(2),
  },

  tipsButton: {
    position: "absolute",
    right: 0,
    top: -30,
    color: theme.palette.primary.main,
    fontSize: "0.875rem",
    fontWeight: 500,
    textTransform: "none",
    padding: theme.spacing(0.5, 1),
    "&:hover": {
      backgroundColor: "rgba(25, 118, 210, 0.04)",
    },
  },

  tipsTooltip: {
    backgroundColor: "#fff",
    color: "rgba(0, 0, 0, 0.87)",
    fontSize: "0.875rem",
    maxWidth: 300,
    padding: theme.spacing(2),
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    "& .MuiTooltip-arrow": {
      color: "#fff",
    },
  },

  tipsList: {
    margin: 0,
    paddingLeft: theme.spacing(2),
    "& li": {
      marginBottom: theme.spacing(1),
    },
  },

  inputLabel: {
    fontSize: "1rem",
    [theme.breakpoints.down("sm")]: {
      // fontSize: "0.9rem",
    },
  },

  inputPlaceholder: {
    "&::placeholder": {
      fontSize: "1rem",

      [theme.breakpoints.down("sm")]: {
        fontSize: "0.85rem",
      },
    },
  },

  audienceOption: {
    fontWeight: 600,
    textTransform: "none",
    fontSize: "1rem",
    marginBottom: "15px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.9rem",
    },
  },

  subbutton: {
    margin: 20,
    width: 200,

    [theme.breakpoints.down("sm")]: {
      width: "100%",
      margin: theme.spacing(3, 0),
    },
  },
  backDashboardButton: {
    margin: 20,
    width: 200,

    [theme.breakpoints.down("sm")]: {
      width: "100%",
      margin: theme.spacing(3, 0),
    },
  },
  stepLabel: {
    fontWeight: 700,
    fontSize: "1.25rem",
    marginTop: "3rem",
    marginBottom: theme.spacing(1),
    color: theme.palette.primary.main,
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.1rem",
    },
  },
  stepDescription: {
    fontSize: "1rem",
    marginBottom: theme.spacing(2.5),
    color: "#555",
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.95rem",
      marginBottom: theme.spacing(3.5),
    },
  },
  refineLink: {
    cursor: "pointer",
    textDecoration: "underline",
    color: theme.palette.primary.main,
    fontWeight: 500,
    marginTop: "0",
  },
  scrollToTopButton: {
    position: "fixed",
    bottom: theme.spacing(8),
    right: theme.spacing(4),
    zIndex: 1000,
    backgroundColor: "#1976d2",
    color: "white",
    "&:hover": { backgroundColor: "#1565c0" },
    display: "flex",
  },
  refineButton: {
    margin: "16px 0",
    minWidth: 140,
    width: "auto",
    fontSize: "1.05rem",
    fontWeight: 600,
    borderRadius: 999,
    textTransform: "none",
    border: "none",
    color: theme.palette.primary.dark,
    background: "linear-gradient(90deg, #e3f0ff 0%, #f0f4ff 100%)",
    boxShadow: "0 2px 8px rgba(25, 118, 210, 0.07)",
    letterSpacing: 0.2,
    padding: "8px 28px",
    transition: "background 0.2s, color 0.2s",
    "&:hover": {
      background: "linear-gradient(90deg, #d0e6ff 0%, #e0eaff 100%)",
      color: theme.palette.primary.main,
      boxShadow: "0 4px 16px rgba(25, 118, 210, 0.12)",
    },
    "& .MuiButton-startIcon": {
      marginRight: 8,
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      margin: theme.spacing(2, 0),
      fontSize: "1rem",
      padding: "8px 0",
    },
  },
}));

export default styles;
