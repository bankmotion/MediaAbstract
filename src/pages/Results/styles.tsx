import { makeStyles } from "tss-react/mui";

const styles = makeStyles()((theme: any) => ({
  body: {
    padding: theme.spacing(4),
    maxWidth: "1000px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(4),
    backgroundColor: "#f9f9f9",
    minHeight: "100vh",
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(4, 2),
    },
  },

  title: {
    fontSize: "2rem",
    fontWeight: 700,
    textAlign: "center",
    marginBottom: theme.spacing(1),
    color: "#333",
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
    height: "210px",
  },

  cardcontent: {
    padding: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(0.5),
  },

  name: {
    fontSize: "1.25rem",
    fontWeight: 600,
    color: "#1a1a1a",
    marginBottom: theme.spacing(1),
  },

  guide: {
    marginTop: theme.spacing(1),
    fontSize: "0.95rem",
    color: "#555",
  },

  score: {
    marginTop: theme.spacing(1),
    fontSize: "0.95rem",
    fontWeight: 500,
    color: "#222",
  },

  tooltip: {
    fontWeight: 600,
    color: "#007BFF",
    marginTop: "8px",
    cursor: "pointer",
    //    color: "#2e7d32", // MUI green tone
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
  },

  backHomeButton: {
    marginTop: theme.spacing(2),
    textTransform: "none",
  },
  actionButtons: {
    marginTop: theme.spacing(4),
    display: "flex",
    justifyContent: "center",
    gap: theme.spacing(2),
    flexWrap: "wrap",
  },
}));

export default styles;
