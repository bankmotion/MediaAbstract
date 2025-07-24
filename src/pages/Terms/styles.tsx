import { makeStyles } from "tss-react/mui";

const styles = makeStyles()((theme: any) => ({
  root: {
    display: "flex",
    minHeight: "140vh",
    backgroundColor: "#ffffff",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      minHeight: "100vh",
      paddingBottom: "30px",
    },
  },

  sidebar: {
    width: "280px",
    borderRight: "1px solid #eaeaea",
    padding: theme.spacing(4, 2),
    position: "fixed",
    height: "100vh",
    overflowY: "auto",
    backgroundColor: "#fafafa",
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },

  content: {
    flex: 1,
    marginLeft: "280px",
    padding: theme.spacing(6, 4),
    maxWidth: "600px",
    [theme.breakpoints.down("md")]: {
      marginLeft: 0,
      padding: 0,
      maxWidth: "100%",
    },
  },

  // Mobile-specific styles
  mobileHeader: {
    display: "none",
    [theme.breakpoints.down("md")]: {
      display: "flex",
      flexDirection: "column",
      padding: theme.spacing(2),
      backgroundColor: "#ffffff",
      borderBottom: "1px solid #eaeaea",
      position: "sticky",
      top: 0,
      zIndex: 1000,
    },
  },

  mobileTitle: {
    fontSize: "1.5rem",
    fontWeight: 700,
    color: "#1a1a1a",
    marginBottom: theme.spacing(1),
  },

  mobileSubtitle: {
    fontSize: "0.875rem",
    color: "#666",
  },

  mobileContent: {
    display: "none",
    [theme.breakpoints.down("md")]: {
      display: "block",
      padding: theme.spacing(2),
    },
  },

  mobileSection: {
    marginBottom: theme.spacing(2),
    border: "1px solid #eaeaea",
    borderRadius: "12px",
    overflow: "hidden",
  },

  mobileSectionHeader: {
    padding: theme.spacing(2),
    backgroundColor: "#fafafa",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#f5f5f5",
    },
  },

  mobileSectionTitle: {
    fontSize: "1rem",
    fontWeight: 600,
    color: "#1a1a1a",
    margin: 0,
  },

  mobileSectionContent: {
    padding: theme.spacing(2),
    fontSize: "0.875rem",
    lineHeight: 1.6,
    color: "#4a4a4a",
    backgroundColor: "#ffffff",
  },

  mobileBackButton: {
    display: "none",
    [theme.breakpoints.down("md")]: {
      display: "flex",
      alignItems: "center",
      color: "#666",
      textDecoration: "none",
      marginBottom: theme.spacing(2),
      padding: theme.spacing(1),
      borderRadius: "8px",
      "&:hover": {
        backgroundColor: "rgba(0, 0, 0, 0.04)",
      },
    },
  },

  // Desktop styles
  navItem: {
    display: "block",
    padding: theme.spacing(1.5, 2),
    marginBottom: theme.spacing(1),
    borderRadius: "8px",
    color: "#666",
    textDecoration: "none",
    transition: "all 0.2s ease",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.04)",
      color: "#1976d2",
    },
    "&.active": {
      backgroundColor: "#1976d2",
      color: "#fff",
    },
  },

  title: {
    fontSize: "2rem",
    fontWeight: 700,
    color: "#1a1a1a",
    marginBottom: theme.spacing(6),
    paddingBottom: theme.spacing(2),
    borderBottom: "2px solid #eaeaea",
  },

  section: {
    marginBottom: theme.spacing(6),
    "&:last-child": {
      marginBottom: 0,
    },
  },

  sectionTitle: {
    fontSize: "1.5rem",
    fontWeight: 600,
    color: "#1a1a1a",
    marginBottom: theme.spacing(2),
    display: "flex",
    alignItems: "center",
    "&::before": {
      content: '""',
      display: "inline-block",
      width: "4px",
      height: "24px",
      backgroundColor: "#1976d2",
      marginRight: theme.spacing(2),
      borderRadius: "2px",
    },
  },

  sectionContent: {
    fontSize: "1rem",
    lineHeight: 1.7,
    color: "#4a4a4a",
  },

  backButton: {
    display: "inline-flex",
    alignItems: "center",
    color: "#666",
    textDecoration: "none",
    marginBottom: theme.spacing(4),
    padding: theme.spacing(1, 2),
    borderRadius: "8px",
    transition: "all 0.2s ease",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.04)",
      color: "#1976d2",
    },
  },

  backIcon: {
    marginRight: theme.spacing(1),
  },

  platformName: {
    fontWeight: 600,
    color: "#1976d2",
  },
}));

export default styles;
