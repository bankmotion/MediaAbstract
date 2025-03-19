// src/pages/AgenciesIntro/styles.ts
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  introWrapper: {
    padding: theme.spacing(6),
    maxWidth: 1200,
    margin: "0 auto",
    textAlign: "center",
  },
  title: {
    fontWeight: 700,
    marginBottom: theme.spacing(2),
    color: "#1a1a1a",
  },
  subtitle: {
    color: "#555",
    marginBottom: theme.spacing(4),
    fontSize: "1.2rem",
  },
  pricingSection: {
    marginTop: theme.spacing(4),
  },
  pricingHeader: {
    fontWeight: 600,
    marginBottom: theme.spacing(3),
    fontSize: "1.5rem",
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
    color: "#007BFF",
  },
  planDesc: {
    color: "#555",
    fontSize: "0.95rem",
    lineHeight: 1.6,
  },
  continueBtn: {
    marginTop: theme.spacing(4),
    padding: theme.spacing(1.5, 4),
    fontWeight: 600,
    fontSize: "1rem",
    textTransform: "none",
  },
}));

export default useStyles;
