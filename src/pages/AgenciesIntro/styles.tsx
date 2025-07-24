// src/pages/AgenciesIntro/styles.ts
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
    paddingBottom: theme.spacing(10),
  },

  introWrapper: {
    padding: theme.spacing(6),
    maxWidth: 1200,
    margin: "0 auto",
    textAlign: "center",
    paddingBottom: theme.spacing(10),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(4, 2),
      maxWidth: "100%",
      paddingBottom: theme.spacing(10),
    },
  },
  title: {
    fontWeight: 700,
    marginBottom: theme.spacing(2),
    color: "#1a1a1a",
    [theme.breakpoints.down("sm")]: {
      fontSize: "2rem",
    },
  },
  subtitle: {
    color: "#555",
    marginBottom: theme.spacing(4),
    fontSize: "1.2rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1rem",
      marginBottom: theme.spacing(3),
    },
  },
  tagline: {
    fontSize: "1.2rem",
    fontWeight: 500,
    marginBottom: theme.spacing(4),
    color: "#007BFF",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1rem",
      marginBottom: theme.spacing(3),
    },
  },
  whySection: {
    marginBottom: theme.spacing(6),
    marginTop: theme.spacing(2),
  },
  whyTitle: {
    fontWeight: 700,
    fontSize: "1.6rem",
    marginBottom: theme.spacing(3),
    color: "#1a1a1a",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.3rem",
    },
  },
  whyDescription: {
    fontSize: "1rem",
    color: "#555",
    marginBottom: theme.spacing(3),
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.95rem",
      marginBottom: theme.spacing(2),
    },
  },
  iconTextGrid: {
    marginBottom: theme.spacing(4),
  },
  iconTextItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    padding: theme.spacing(2),
  },
  icon: {
    color: "#007BFF",
    marginBottom: theme.spacing(1.5),
  },
  iconTextTitle: {
    fontWeight: 600,
    fontSize: "1.1rem",
    marginBottom: theme.spacing(1),
  },
  iconTextDesc: {
    fontSize: "0.95rem",
    color: "#555",
    lineHeight: 1.6,
  },
  pricingSection: {
    marginTop: theme.spacing(4),
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(3),
    },
  },
  pricingHeader: {
    fontWeight: 600,
    marginBottom: theme.spacing(3),
    fontSize: "1.5rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.3rem",
      marginBottom: theme.spacing(2),
    },
  },
  pricingGrid: {
    marginBottom: theme.spacing(4),
  },
  pricingCard: {
    padding: theme.spacing(2),
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
    borderRadius: 12,
    border: "1px solid #e0e0e0",
    height: "100%",
    "&:hover": {
      transform: "scale(1.04)",
    },
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(1.5),
    },
  },
  planTitle: {
    fontWeight: 700,
    fontSize: "1.2rem",
    marginBottom: theme.spacing(1),
  },
  planPrice: {
    fontSize: "1.5rem",
    fontWeight: 600,
    marginBottom: theme.spacing(1),
    "&:hover": {
      transform: "scale(1.05)",
    },
    color: "#007BFF",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.3rem",
    },
  },
  planDesc: {
    color: "#555",
    fontSize: "0.95rem",
    lineHeight: 1.6,
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.9rem",
    },
  },
  continueBtn: {
    marginTop: theme.spacing(4),
    padding: theme.spacing(1.5, 4),
    fontWeight: 600,
    fontSize: "1rem",
    textTransform: "none",
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(3),
      padding: theme.spacing(1, 3),
      fontSize: "0.9rem",
    },
  },
  compareLinkContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: theme.spacing(3),
  },
  compareLink: {
    textTransform: "none",
    fontWeight: 500,
    "&:hover": {
      textDecoration: "underline",
    },
  },
}));

export default useStyles;
