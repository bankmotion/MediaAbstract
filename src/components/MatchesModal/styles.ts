import { makeStyles } from "tss-react/mui";
import { Theme } from "@mui/material";

const useStyles = makeStyles()((theme: Theme) => ({
  dialogTitle: {
    padding: theme.spacing(3, 4),
    borderBottom: `1px solid ${theme.palette.divider}`,
    backgroundColor: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: theme.spacing(2),
    position: "relative",
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2),
      flexDirection: "row",
      alignItems: "flex-start",
    },
  },
  titleWrapper: {
    flex: 1,
    paddingRight: theme.spacing(4),
    [theme.breakpoints.down("sm")]: {
      paddingRight: theme.spacing(2),
    },
  },
  title: {
    fontSize: "1.75rem",
    fontWeight: 700,
    color: "#333",
    lineHeight: 1.3,
    margin: 0,
    wordBreak: "break-word",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.35rem",
      lineHeight: 1.4,
    },
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(2),
    top: "50%",
    transform: "translateY(-50%)",
    padding: theme.spacing(1),
    color: theme.palette.grey[500],
    transition: "all 0.2s ease",
    "&:hover": {
      backgroundColor: theme.palette.grey[100],
      color: theme.palette.grey[700],
    },
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(0.5),
      top: theme.spacing(2),
      right: theme.spacing(1),
    },
  },
  closeIcon: {
    fontSize: "1.5rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.25rem",
    },
  },
  dialogContent: {
    padding: theme.spacing(4),
    backgroundColor: "#f9f9f9",
    "&::-webkit-scrollbar": {
      width: "8px",
    },
    "&::-webkit-scrollbar-track": {
      background: "#f1f1f1",
    },
    "&::-webkit-scrollbar-thumb": {
      background: "#888",
      borderRadius: "4px",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      background: "#555",
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
    backgroundColor: "#fff",
    [theme.breakpoints.down("sm")]: {
      maxWidth: "100vw",
      overflow: "auto",
    },
    "& .MuiTableCell-root": {
      padding: theme.spacing(1.5),
    },
  },
  tableCell: {
    padding: theme.spacing(2),
    "& strong": {
      fontWeight: 600,
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
    "&:hover": {
      transform: "translateY(-3px)",
      boxShadow: "0 6px 20px rgba(0,0,0,0.12)",
    },
  },
  name: {
    fontSize: "1.2rem",
    fontWeight: 600,
    color: "#1a1a1a",
    marginBottom: theme.spacing(1),
    textDecoration: "underline",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.1rem",
    },
  },
  guide: {
    marginTop: theme.spacing(1),
    fontSize: "0.95rem",
    color: "#555",
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.9rem",
    },
  },
  score: {
    marginTop: theme.spacing(1),
    fontSize: "0.95rem",
    fontWeight: 500,
    color: "#222",
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.9rem",
    },
  },
  tooltip: {
    fontWeight: 600,
    color: "#007BFF",
    cursor: "pointer",
    marginBottom: "5px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.9rem",
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
  pagination: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: theme.spacing(2),
    flexWrap: "wrap",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
  },
}));

export default useStyles;
