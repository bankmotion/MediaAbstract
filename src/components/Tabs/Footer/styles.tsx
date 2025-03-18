import { makeStyles } from "tss-react/mui";

const styles = makeStyles()((theme: any) => ({
  body: {
    backgroundColor: "#f8f9fa", // light subtle background
    padding: "1.5rem 1rem",
    textAlign: "center",
    borderTop: "1px solid #e0e0e0",
    marginTop: "auto",
    position: "fixed",
    bottom: "20px",
    width: "100%",
  },
  letter: {
    fontSize: "0.95rem",
    color: "#6c757d",
    margin: 0,
    lineHeight: 1.6,
  },
  link: {
    color: "#007bff",
    textDecoration: "none",
    fontWeight: 500,
    transition: "color 0.3s ease",
    "&:hover": {
      color: "#0056b3",
      textDecoration: "underline",
    },
  },
}));

export default styles;
