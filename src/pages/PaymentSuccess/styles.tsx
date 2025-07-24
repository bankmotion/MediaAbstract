import { makeStyles } from "tss-react/mui";

export const useStyles = makeStyles()((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
    padding: "2rem",
  },
  successCard: {
    background: "white",
    borderRadius: "20px",
    padding: "3rem",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    maxWidth: "500px",
    width: "100%",
  },
  iconWrapper: {
    marginBottom: "2rem",
    color: "#10b981",
  },
  title: {
    fontSize: "2rem",
    color: "#1f2937",
    marginBottom: "1rem",
    fontWeight: 700,
  },
  message: {
    color: "#6b7280",
    fontSize: "1.1rem",
    marginBottom: "2rem",
    lineHeight: 1.6,
  },
  button: {
    background: "#10b981",
    color: "white",
    border: "none",
    padding: "1rem 2rem",
    borderRadius: "10px",
    fontSize: "1rem",
    fontWeight: 600,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    margin: "0 auto",
    transition: "background 0.3s ease",
    "&:hover": {
      background: "#059669",
    },
  },
}));
