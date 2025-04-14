import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  root: {
    padding: theme.spacing(5),
    maxWidth: 1200,
    margin: "0 auto",

    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(3, 2),
    },
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing(3),
    [theme.breakpoints.down("sm")]: {
      flexDirection: "row",
      alignItems: "flex-start",
      gap: theme.spacing(2),
      marginBottom: theme.spacing(2),
      position: "relative",
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
      paddingRight: theme.spacing(6),
    },
  },
  backButton: {
    textTransform: "none",
    [theme.breakpoints.down("sm")]: {
      position: "absolute",
      right: 0,
      top: 0,
      minWidth: "auto",
      width: 40,
      height: 40,
      borderRadius: "50%",
      padding: 0,
    },
  },
  searchContainer: {
    marginBottom: theme.spacing(3),
  },
  searchInput: {
    width: "100%",
    maxWidth: 400,
    "& .MuiOutlinedInput-root": {
      height: 40,
    },
    [theme.breakpoints.down("sm")]: {
      "& .MuiOutlinedInput-root": {
        height: 40,
      },
      "& .MuiInputBase-input": {
        padding: "8px 14px",
      },
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
  actionButtons: {
    display: "flex",
    justifyContent: "center",
    marginTop: theme.spacing(3),
  },
  submissionDialog: {
    borderRadius: theme.shape.borderRadius,
  },
  dialogTitle: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: theme.spacing(2),
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  closeButton: {
    padding: theme.spacing(0.5),
  },
  emailInput: {
    marginTop: theme.spacing(2),
  },
  dialogActions: {
    padding: theme.spacing(2),
    borderTop: `1px solid ${theme.palette.divider}`,
  },
}));

export default useStyles;
