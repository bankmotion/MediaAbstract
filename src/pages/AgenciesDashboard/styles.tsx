// src/pages/dashboard/dashboardStyles.ts
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  wrapper: {
    padding: theme.spacing(4),
    minHeight: "100vh",
    backgroundColor: "#f5f7fa",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing(4),
  },
  welcomeText: {
    fontSize: "2rem",
    fontWeight: 700,
    color: theme.palette.primary.main,
  },
  logoutButton: {
    textTransform: "none",
    fontWeight: 500,
  },
  statsSection: {
    marginBottom: theme.spacing(4),
  },
  statCard: {
    textAlign: "center",
    padding: theme.spacing(2),
    borderRadius: 12,
    boxShadow: "0 3px 10px rgba(0,0,0,0.08)",
    backgroundColor: "#fff",
  },
  statIcon: {
    fontSize: 36,
    color: theme.palette.primary.main,
    marginBottom: theme.spacing(1),
  },
  statNumber: {
    fontSize: "2rem",
    fontWeight: 600,
    marginTop: theme.spacing(1),
  },
  buttonRow: {
    display: "flex",
    gap: theme.spacing(2),
    marginBottom: theme.spacing(3),
    flexWrap: "wrap",
  },
  primaryActionBtn: {
    textTransform: "none",
    fontWeight: 600,
  },
  addUserBtn: {
    textTransform: "none",
    fontWeight: 600,
  },
  sectionHeader: {
    fontSize: "1.5rem",
    fontWeight: 600,
    marginBottom: theme.spacing(2),
  },
  pitchCard: {
    marginBottom: theme.spacing(2),
    backgroundColor: "#fff",
    borderRadius: 10,
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
  },
  pitchTitle: {
    fontWeight: 600,
    fontSize: "1.1rem",
    marginBottom: 4,
  },
}));

export default useStyles;
