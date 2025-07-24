import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  introWrapper: {
    padding: theme.spacing(6, 3),
    maxWidth: 900,
    margin: "auto",
    textAlign: "center",
    marginTop: theme.spacing(8),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(4, 2),
    },
  },
  title: {
    fontWeight: 700,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
    fontSize: "2.5rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: "2rem",
    },
  },
  subtitle: {
    fontSize: "1.2rem",
    color: "#666",
    marginBottom: theme.spacing(4),
    [theme.breakpoints.down("sm")]: {
      fontSize: "1rem",
      marginBottom: theme.spacing(3),
    },
  },

  whySection: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(6),
  },
  whyHeader: {
    fontSize: "1.6rem",
    fontWeight: 600,
    marginBottom: theme.spacing(3),
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
  whyItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: theme.spacing(1),
  },
  whyIcon: {
    fontSize: "3rem",
    color: theme.palette.primary.main,
  },
  whyTitle: {
    fontWeight: 500,
    fontSize: "1rem",
    color: "#333",
  },
  pricingSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: theme.spacing(4),
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(3),
    },
  },
  pricingHeader: {
    fontWeight: 600,
    fontSize: "1.5rem",
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.3rem",
      marginBottom: theme.spacing(1.5),
    },
  },
  pricingCard: {
    padding: theme.spacing(3),
    border: "1px solid #ccc",
    borderRadius: 12,
    boxShadow: "0 8px 10px rgba(43, 42, 42, 0.08)",
    transition: "transform 0.3s ease",
    "&:hover": {
      transform: "scale(1.04)",
    },
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2),
    },
  },
  planTitle: {
    fontWeight: 600,
    marginBottom: theme.spacing(1),
    [theme.breakpoints.down("sm")]: {
      fontSize: "1rem",
    },
  },
  planPrice: {
    fontSize: "1.5rem",
    fontWeight: 700,
    color: theme.palette.primary.main,
    marginBottom: theme.spacing(1),
    "&:hover": {
      transform: "scale(1.05)",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.3rem",
    },
  },
  planDesc: {
    color: "#555",
    fontSize: "0.95rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.9rem",
    },
  },
  continueBtn: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),

    padding: theme.spacing(1.5, 4),
    fontSize: "1rem",
    fontWeight: 600,
    textTransform: "none",
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(4),
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
