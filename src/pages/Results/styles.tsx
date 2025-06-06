import { makeStyles } from "tss-react/mui";
import { Theme } from "@mui/material";

const styles = makeStyles()((theme: Theme) => ({
  body: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    maxWidth: "1200px",
    // width: "100%",
    padding: theme.spacing(6, 2),
    paddingTop: "80px",
    margin: "0 auto",
    textAlign: "center",
    overflow: "hidden",
    backgroundColor: "#f9f9f9",

    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(4, 1),
      margin: theme.spacing(1),
      paddingTop: "80px",
    },
  },

  title: {
    fontSize: "2rem",
    fontWeight: 700,
    textAlign: "center",
    marginBottom: theme.spacing(4),
    color: "#333",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.6rem",
    },
  },

  noResultsContainer: {
    textAlign: "center",
    padding: theme.spacing(4),
  },
  noResultsImage: {
    width: "200px",
    margin: "0 auto",
  },
  noResultsMessage: {
    marginTop: theme.spacing(2),
    fontWeight: "bold",
    color: theme.palette.text.primary,
  },
  noResultsSubtext: {
    marginBottom: theme.spacing(2),
    color: theme.palette.text.secondary,
  },

  mobileList: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },

  mobileCard: {
    padding: theme.spacing(2),
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
    transition: "0.3s ease",
    marginBottom: theme.spacing(1),
    wordBreak: "break-word",
    "& a, & .MuiTypography-root": {
      wordBreak: "break-word",
      fontSize: "0.97rem",
    },
  },

  tableContainer: {
    marginTop: theme.spacing(4),
    boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
    borderRadius: 10,
    overflowX: "auto",
    width: "100%",
    maxWidth: "100%",
    marginBottom: theme.spacing(4),
    [theme.breakpoints.down("sm")]: {
      maxWidth: "100vw",
      overflow: "auto",
    },
    "& .MuiTableCell-root": {
      padding: theme.spacing(1.5),
      maxWidth: 320,
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    },
  },

  tableCell: {
    padding: theme.spacing(2),
    "& strong": {
      fontWeight: 600,
    },
  },
  contactCell: {
    maxWidth: 260,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  pitchLinkCell: {
    maxWidth: 180,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },

  matchDetailsCell: {
    width: "200px",
    wordBreak: "break-word",
  },

  cardbody: {
    marginBottom: theme.spacing(3),
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.08)",
    backgroundColor: "#fff",
    transition: "0.3s ease",
    "&:hover": {
      transform: "translateY(-3px)",
      boxShadow: "0 6px 20px rgba(0, 0, 0, 0.12)",
    },
    [theme.breakpoints.down("sm")]: {
      marginBottom: theme.spacing(2),
    },
  },

  cardcontent: {
    padding: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(0.5),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2.5),
    },
  },

  name: {
    fontSize: "1.1rem",
    fontWeight: 600,
    color: "#1a1a1a",
    marginBottom: theme.spacing(1),
    textDecoration: "underline",
    wordBreak: "break-word",

    [theme.breakpoints.down("sm")]: {
      fontSize: "1.1rem",
    },
  },

  guide: {
    marginTop: theme.spacing(1),
    fontSize: "0.95rem",
    color: "#555",
    wordBreak: "break-word",
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.9rem",
    },
  },

  score: {
    marginTop: theme.spacing(1),
    fontSize: "0.95rem",
    fontWeight: 500,
    color: "#222",
    wordBreak: "break-word",
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.9rem",
    },
  },

  tooltip: {
    fontWeight: 600,
    color: "#007BFF",
    //marginTop: "5px",
    cursor: "pointer",
    //    color: "#2e7d32", // MUI green tone
    marginBottom: "5px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.9rem",
    },
  },

  customTooltip: {
    fontSize: "1rem",
    padding: "6px",
    backgroundColor: "#f5faff",
    color: "#1a1a1a",
    border: "1px solidrgb(179, 203, 240)",
    borderRadius: 8,
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },

  exportcsvButton: {
    marginTop: theme.spacing(2),
    alignSelf: "center",
    padding: theme.spacing(1.2, 4),
    fontWeight: 600,
    textTransform: "none",
    borderRadius: 8,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      padding: theme.spacing(1.2, 2),
    },
  },

  backHomeButton: {
    marginTop: theme.spacing(1),
    // marginBottom: theme.spacing(4),
    textTransform: "none",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  actionButtons: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
    // paddingBottom: theme.spacing(4),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: theme.spacing(2),
    flexWrap: "wrap",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "stretch",
    },
  },
  pagination: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
    // paddingBottom: theme.spacing(4),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: theme.spacing(2),
    flexWrap: "wrap",
    [theme.breakpoints.down("sm")]: {
      // margin: theme.spacing(2),
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
  },

  matchDetailsColumn: {
    backgroundColor: "rgba(25, 118, 210, 0.02)",
    position: "relative",
    "&::before": {
      content: '""',
      position: "absolute",
      left: 0,
      top: 0,
      bottom: 0,
      width: "4px",
      backgroundColor: theme.palette.primary.main,
      borderRadius: "4px 0 0 4px",
    },
  },
  matchDetailsHeader: {
    backgroundColor: "rgba(25, 118, 210, 0.05)",
    fontWeight: 600,
    color: theme.palette.primary.main,
    "& strong": {
      display: "flex",
      alignItems: "center",
      gap: theme.spacing(1),
    },
  },
  expandedRow: {
    backgroundColor: "rgba(25, 118, 210, 0.08)",
    transition: "background-color 0.3s ease",
    "& td": {
      borderBottom: "none",
    },
  },
  matchExplanation: {
    padding: theme.spacing(2.5),
    backgroundColor: "#f8f9ff",
    borderRadius: "12px",
    marginTop: theme.spacing(1),
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
    border: "1px solid rgba(25, 118, 210, 0.1)",
    transition: "all 0.3s ease",
    position: "relative",
    "&::before": {
      content: '""',
      position: "absolute",
      left: "-4px",
      top: 0,
      bottom: 0,
      width: "4px",
      backgroundColor: theme.palette.primary.main,
      borderRadius: "4px",
    },
    "&:hover": {
      boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
      transform: "translateX(2px)",
    },
    "& p": {
      margin: 0,
      lineHeight: 1.6,
      fontSize: "0.95rem",
      color: "#2c3e50",
    },
  },
  matchDetailsButton: {
    textTransform: "none",
    color: theme.palette.primary.main,
    fontWeight: 500,
    padding: theme.spacing(0.5, 1.5),
    borderRadius: "8px",
    backgroundColor: "rgba(25, 118, 210, 0.08)",
    transition: "all 0.2s ease",
    "&:hover": {
      backgroundColor: "rgba(25, 118, 210, 0.12)",
      transform: "translateY(-1px)",
    },
    "& .MuiButton-endIcon": {
      marginLeft: theme.spacing(0.5),
      transition: "transform 0.2s ease",
    },
  },
  expandedMatch: {
    backgroundColor: "#f0f4ff",
    "& p": {
      color: "#1a237e",
    },
  },
  matchExplanationTooltip: {
    backgroundColor: "#f5faff",
    color: "#1a1a1a",
    border: "1px solid rgba(25, 118, 210, 0.1)",
    borderRadius: 8,
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    padding: theme.spacing(2),
    maxWidth: 300,
    "& p": {
      margin: 0,
      lineHeight: 1.6,
      fontSize: "0.95rem",
    },
  },
  matchExplanationIcon: {
    color: theme.palette.primary.main,
    cursor: "pointer",
    fontSize: "1.1rem",
    marginLeft: theme.spacing(1),
    verticalAlign: "middle",
    "&:hover": {
      opacity: 0.8,
    },
  },

  tableOutletName: {
    cursor: "pointer",
    color: theme.palette.primary.main,
    textDecoration: "underline",
    "&:hover": {
      color: theme.palette.primary.dark,
    },
  },
}));

export default styles;
