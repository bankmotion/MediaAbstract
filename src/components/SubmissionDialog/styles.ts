import { makeStyles } from "tss-react/mui";

const styles = makeStyles()((theme: any) => ({
  dialogPaper: {
    borderRadius: 3,
    overflow: "hidden",
    background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
  },
  header: {
    background: "linear-gradient(135deg, #1976d2 0%, #2196f3 100%)",
    padding: theme.spacing(3),
    color: "white",
  },
  title: {
    fontWeight: 700,
    letterSpacing: "0.5px",
  },
  content: {
    padding: theme.spacing(3),
  },
  iconContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(2),
  },
  sendIcon: {
    color: "#1976d2",
    fontSize: 32,
    marginRight: theme.spacing(2),
  },
  submitTitle: {
    fontWeight: 600,
    marginBottom: theme.spacing(0.5),
  },
  note: {
    marginTop: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    borderLeft: "3px solid #1976d2",
    fontStyle: "italic",
  },
  dialogActions: {
    padding: theme.spacing(0, 3, 3, 3),
    gap: theme.spacing(2),
    alignItems: "center",
  },
  dialogActionsColumn: {
    flexDirection: "column",
  },
  dialogActionsRow: {
    flexDirection: "row",
  },
  notYetMessageBox: {
    width: "100%",
    textAlign: "center",
    padding: theme.spacing(2),
    background: "linear-gradient(135deg, #f5f5f5 0%, #ffffff 100%)",
    borderRadius: 2,
    border: "1px solid #e0e0e0",
  },
  notYetMessageText: {
    color: "#1976d2",
    fontWeight: 500,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing(1),
  },
  notYetButton: {
    fontWeight: 600,
    borderRadius: 2,
    padding: theme.spacing(1, 3),
    borderWidth: 2,
    background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
    color: "#1976d2",
    "&:hover": {
      borderWidth: 2,
      background: "linear-gradient(135deg, #f5f5f5 0%, #ffffff 100%)",
      boxShadow: "0 4px 14px rgba(0, 0, 0, 0.1)",
    },
    transition: "all 0.3s ease",
  },
  continueButton: {
    fontWeight: 600,
    borderRadius: 2,
    padding: theme.spacing(1, 3),
    background: "linear-gradient(135deg, #1976d2 0%, #2196f3 100%)",
    boxShadow: "0 4px 14px rgba(33, 150, 243, 0.4)",
    "&:hover": {
      background: "linear-gradient(135deg, #1565c0 0%, #1e88e5 100%)",
      boxShadow: "0 6px 20px rgba(33, 150, 243, 0.5)",
    },
  },
}));

export default styles;
