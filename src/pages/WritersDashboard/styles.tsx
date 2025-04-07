// src/pages/dashboard/dashboardStyles.ts
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  wrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(to right, #fdfbfb, #ebedee)",
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(10),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2, 0),
      paddingBottom: theme.spacing(6),
    },
  },
  appbar: {
    display: "flex",
    height: "60px",
    position: "fixed",
    top: "0",
    background: "#fff",
    zIndex: 1000,
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  logoButton: {
    textTransform: "none",
    padding: 0,
    minWidth: "auto",
  },
  logoText: {
    fontWeight: 700,
    fontSize: "1.25rem",
    color: "#000",
    "&:hover": {
      fontSize: "1.5rem",
    },
  },
  logoutButton: {
    fontWeight: 600,
    width: "100px",
    height: "40px",
    textTransform: "none",
    [theme.breakpoints.down("sm")]: {
      width: "100px",
      height: "30px",
    },
  },

  body: {
    padding: theme.spacing(2, 2),
    display: "flex",
    flexDirection: "column",
    marginBottom: "20px",
    // maxWidth: "1000px",
  },
  bodyHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing(3),
    marginTop: theme.spacing(6),
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      marginBottom: theme.spacing(2),
      marginTop: theme.spacing(8),
    },
  },

  userInfo: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      gap: theme.spacing(1),
    },
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
    width: 48,
    height: 48,
    [theme.breakpoints.down("sm")]: {
      width: 40,
      height: 40,
    },
  },
  welcomeText: {
    fontWeight: 700,
    fontSize: "1.6rem",
    color: "#333",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.3rem",
    },
  },

  divider: {
    margin: `${theme.spacing(2)} 0`,
  },
  nextStepsSection: {
    marginBottom: theme.spacing(4),
    backgroundColor: "#f7f9fc",
    padding: theme.spacing(2),
    borderRadius: 12,
    boxShadow: "0px 2px 8px rgba(0,0,0,0.5)",
  },
  sectionHeader: {
    fontSize: "1.5rem",
    fontWeight: 600,
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.25rem",
    },
  },

  statsSection: {
    display: "flex",
    flexWrap: "wrap",
    gap: theme.spacing(2),
    justifyContent: "center",
    alignItems: "center",
    marginBottom: theme.spacing(8),
    [theme.breakpoints.down("sm")]: {
      flexWrap: "wrap",
      marginBottom: theme.spacing(5),
    },
  },
  statGrid: {
    maxWidth: 170,
    flex: "1 1 auto", // allow to stretch a bit
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      marginBottom: theme.spacing(2),
    },
  },
  statCard: {
    width: "100%",
    border: "1px solid #e0e0e0",
    textAlign: "center",
    padding: theme.spacing(2),
    borderRadius: 12,
    boxShadow: "0 3px 10px rgba(0,0,0,0.08)",
    backgroundColor: "#fff",
    height: "100%",
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
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-start",
    marginBottom: theme.spacing(3),
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
    },
  },
  actionButton: {
    padding: theme.spacing(1.2, 3),
    fontSize: "1rem",
    borderRadius: 8,
    textTransform: "none",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      fontSize: "0.95rem",
      padding: theme.spacing(1, 2),
    },
  },
  sectionTitle: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    fontWeight: 600,
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.2rem",
      marginBottom: theme.spacing(2),
    },
  },
  pitchCard: {
    backgroundColor: "#fff",
    padding: theme.spacing(2),
    borderRadius: 10,
    boxShadow: "0px 2px 8px rgba(0,0,0,0.05)",
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(1.5),
    },
  },
  pitchTitle: {
    fontWeight: 600,
    fontSize: "1.1rem",
    marginBottom: theme.spacing(1),
    [theme.breakpoints.down("sm")]: {
      fontSize: "1rem",
    },
  },
  pitchStatus: {
    width: 10,
    height: 10,
    borderRadius: "50%",
    marginRight: 1,
  },
  activityTimeline: {
    paddingLeft: 0,
    marginTop: theme.spacing(2),
  },
  activityItem: {
    alignItems: "flex-start",
  },
  savedOutletsSection: {
    marginTop: theme.spacing(4),
  },
  savedOutletsGrid: {
    display: "grid",
    paddingLeft: "15px",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: theme.spacing(4),
    [theme.breakpoints.down("md")]: {
      gridTemplateColumns: "repeat(2, 1fr)",
    },
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      flexDirection: "column",
      gridTemplateColumns: "100%",
      gap: theme.spacing(2),
      marginTop: "10px",
    },
  },
  savedPitchCard: {
    minHeight: "210px",
    backgroundColor: "#fff",
    borderRadius: 12,
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
    transition: "transform 0.2s, box-shadow 0.2s",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    },
    [theme.breakpoints.down("sm")]: {
      minHeight: "0px",
    },
  },
  savedPitchHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(2),
    borderBottom: "1px solid rgba(0,0,0,0.08)",
    cursor: "pointer",
  },
  savedPitchTitle: {
    flex: 1,
    fontWeight: 600,
    fontSize: "1.1rem",
    color: theme.palette.text.primary,
  },
  savedPitchIcon: {
    color: theme.palette.primary.main,
    marginRight: theme.spacing(1),
  },
  savedPitchDropdown: {
    color: theme.palette.text.secondary,
    transition: "transform 0.2s",
    "&.expanded": {
      transform: "rotate(180deg)",
    },
  },
  savedOutletsList: {
    padding: theme.spacing(1),
    maxHeight: 0,
    overflow: "hidden",
    transition: "max-height 0.3s ease-out, padding 0.3s ease-out",
    "&.expanded": {
      maxHeight: "500px",
      padding: theme.spacing(2),
    },
    "&.initial": {
      maxHeight: "100px",
      padding: theme.spacing(2),
    },
  },
  savedOutletItem: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(1),
    borderRadius: 8,
    cursor: "pointer",
    transition: "background-color 0.2s",
    "&:hover": {
      backgroundColor: "rgba(0,0,0,0.04)",
    },
  },
  savedOutletName: {
    color: theme.palette.primary.main,
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
      color: theme.palette.primary.dark,
    },
  },
  emptyStateCard: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(4),
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    textAlign: "center",
  },
  emptyStateIcon: {
    fontSize: 48,
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(2),
  },
  emptyStateText: {
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(2),
  },
  moreButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(1.5),
    // margin: theme.spacing(1),
    color: theme.palette.primary.main,
    cursor: "pointer",
    "&:hover": {
      color: theme.palette.primary.dark,
    },
  },
  moreButtonText: {
    marginRight: theme.spacing(1),
    fontSize: "0.9rem",
  },
  moreButtonIcon: {
    transition: "transform 0.2s",
    "&.expanded": {
      transform: "rotate(180deg)",
    },
  },
}));

export default useStyles;
