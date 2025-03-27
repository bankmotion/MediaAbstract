import { makeStyles } from "tss-react/mui";

const styles = makeStyles()((theme: any) => ({
  modalBody: {
    borderRadius: "10px",
  },
  modalContainer: {
    padding: theme.spacing(4),
    position: "relative",
    textAlign: "center",
    backgroundColor: "#ffffff",
    // borderRadius: theme.spacing(3),
    boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
  },
  modalTitle: {
    fontWeight: 700,
    fontSize: "1.6rem",
    color: "#222",
    marginBottom: theme.spacing(1),
    paddingTop: 0,
    lineHeight: 1.4,
  },

  closeButton: {
    display: "flex",
    justifyContent: "flex-end",
    position: "absolute",
    top: 8,
    right: 8,
  },
  modalText: {
    textAlign: "center",
    fontSize: "1rem",
    padding: "0 12px",
    marginTop: 1,
    color: "#444",
  },
  action: {
    justifyContent: "center",
    paddingBottom: 3,
  },
  modalButton: {
    padding: theme.spacing(1.2, 4),
    fontSize: "1rem",
    fontWeight: 600,
    borderRadius: theme.spacing(2),
    backgroundColor: "#007BFF",
    boxShadow: "0 4px 12px rgba(0,123,255,0.3)",
    textTransform: "none",
    transition: "all 0.3s ease",
    "&:hover": {
      backgroundColor: "#0069d9",
      transform: "translateY(-1px)",
      boxShadow: "0 6px 16px rgba(0,105,217,0.4)",
    },
  },
}));

export default styles;
