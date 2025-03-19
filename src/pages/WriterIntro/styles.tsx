import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  introWrapper: {
    padding: theme.spacing(6, 3),
    maxWidth: 900,
    margin: "auto",
    textAlign: "center",
  },
  title: {
    fontWeight: 700,
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
  },
  pricingSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: theme.spacing(4),
  },
  pricingHeader: {
    fontWeight: 600,
    fontSize: "1.5rem",
    marginBottom: theme.spacing(2),
  },
  pricingCard: {
    padding: theme.spacing(3),
    borderRadius: 12,
    boxShadow: "0 8px 10px rgba(43, 42, 42, 0.08)",
    transition: "transform 0.3s ease",
    "&:hover": {
      transform: "scale(1.03)",
    },
  },
  planTitle: {
    fontWeight: 600,
    marginBottom: theme.spacing(1),
  },
  planPrice: {
    fontSize: "1.5rem",
    fontWeight: 700,
    color: theme.palette.primary.main,
    marginBottom: theme.spacing(1),
  },
  planDesc: {
    color: "#555",
    fontSize: "0.95rem",
  },
  continueBtn: {
    marginTop: theme.spacing(5),
    padding: theme.spacing(1.5, 4),
    fontSize: "1rem",
    fontWeight: 600,
    textTransform: "none",
  },
}));

export default useStyles;
