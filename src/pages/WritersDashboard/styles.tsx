// src/pages/dashboard/dashboardStyles.ts
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  wrapper: {
    padding: theme.spacing(4),
    minHeight: "100vh",
    backgroundColor: "#f3f4f8",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing(3),
  },
  userInfo: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(2),
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
  },
  welcomeText: {
    fontWeight: 700,
    fontSize: "1.6rem",
    color: "#333",
  },
  logoutButton: {
    fontWeight: 500,
    textTransform: "none",
    borderRadius: 8,
  },
  divider: {
    margin: `${theme.spacing(2)} 0`,
  },
  statsSection: {
    marginBottom: theme.spacing(4),
  },
  statCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: theme.spacing(2),
    boxShadow: "0px 4px 12px rgba(0,0,0,0.05)",
    textAlign: "center",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-start",
    marginBottom: theme.spacing(3),
  },
  actionButton: {
    padding: theme.spacing(1.2, 3),
    fontSize: "1rem",
    borderRadius: 8,
    textTransform: "none",
  },
  sectionTitle: {
    marginBottom: theme.spacing(2),
    fontWeight: 600,
  },
  pitchCard: {
    backgroundColor: "#fff",
    padding: theme.spacing(2),
    borderRadius: 10,
    boxShadow: "0px 2px 8px rgba(0,0,0,0.05)",
  },
  pitchTitle: {
    fontWeight: 600,
    fontSize: "1.1rem",
    marginBottom: theme.spacing(1),
  },
}));

export default useStyles;
