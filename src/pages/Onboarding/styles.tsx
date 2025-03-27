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
    marginBottom: theme.spacing(2),
    color: "#555",
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.95rem",
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
    bottom: 50,
    right: 20,
    zIndex: 1000,
    backgroundColor: "#1976d2",
    color: "white",
    "&:hover": { backgroundColor: "#1565c0" },
  },
}));

export default styles;
