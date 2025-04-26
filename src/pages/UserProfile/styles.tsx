import { Theme } from "@mui/material/styles";
import { makeStyles } from "tss-react/mui";
import { keyframes } from "@emotion/react";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`;

export const useStyles = makeStyles()((theme: Theme) => ({
  wrapper: {
    width: "100%",
    minHeight: "100vh",
    backgroundColor: "#F8FAFC",
  },
  header: {
    position: "relative",
    padding: theme.spacing(3, 4),
    backgroundColor: "#FFFFFF",
    borderBottom: "1px solid",
    borderColor: "#E2E8F0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2, 3),
    },
  },
  backButton: {
    color: "#64748B",
    position: "absolute",
    left: theme.spacing(4),
    [theme.breakpoints.down("sm")]: {
      left: theme.spacing(3),
    },
    "&:hover": {
      backgroundColor: "rgba(100, 116, 139, 0.04)",
    },
  },
  pageTitle: {
    fontWeight: 600,
    color: "#1E293B",
    fontSize: "1.5rem",
    letterSpacing: "-0.02em",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.25rem",
    },
  },
  content: {
    maxWidth: "1280px",
    margin: "0 auto",
    padding: theme.spacing(3, 2),
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(4),
    },
  },
  profileCard: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: "16px",
    boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)",
    padding: theme.spacing(3),
    marginBottom: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.down("sm")]: {
      width: "90%",
      margin: `${theme.spacing(2)} auto`,
      padding: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
  },
  profileCardContent: {
    padding: 0,
  },
  detailsCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: "16px",
    boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)",
    marginBottom: theme.spacing(3),
  },
  sectionHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "flex-start",
      gap: theme.spacing(1),
    },
  },
  editButton: {
    color: "#64748B",
    "&:hover": {
      backgroundColor: "rgba(100, 116, 139, 0.04)",
    },
  },
  editActions: {
    display: "flex",
    gap: theme.spacing(1),
    [theme.breakpoints.down("sm")]: {
      flexDirection: "row",
      gap: theme.spacing(1),
      width: "100%",
      "& button": {
        width: "100%",
      },
    },
  },
  saveButton: {
    backgroundColor: "#1E293B",
    "&:hover": {
      backgroundColor: "#0F172A",
    },
  },
  avatarContainer: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: theme.spacing(3),
  },
  avatar: {
    width: 120,
    height: 120,
    marginRight: 0,
    borderRadius: "50%",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.2s ease-in-out",
    "&:hover": {
      transform: "scale(1.05)",
    },
  },
  editAvatarButton: {
    position: "absolute",
    bottom: 0,
    left: "calc(50% + 30px)",
    transform: "translateX(-50%)",
    backgroundColor: "#FFFFFF",
    color: "#64748B",
    "&:hover": {
      backgroundColor: "#F1F5F9",
    },
  },
  userInfo: {
    flex: 1,

    margin: `${theme.spacing(2)} auto`,
  },
  userName: {
    color: "#1E293B",
    marginBottom: theme.spacing(1),
  },
  userEmail: {
    color: "#64748B",
    marginBottom: theme.spacing(2),
  },
  divider: {
    margin: theme.spacing(3, 0),
    backgroundColor: "#E2E8F0",
  },
  subscriptionCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: "16px",
    boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)",
  },
  subscriptionHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: theme.spacing(2, 3),
    borderBottom: "1px solid #E2E8F0",
  },
  subscriptionTitle: {
    color: "#1E293B",
    fontWeight: 600,
  },
  subscriptionStatus: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
  statusChip: {
    backgroundColor: "#E2F8F0",
    color: "#0D9488",
    fontWeight: 600,
    borderRadius: "6px",
    padding: theme.spacing(0.5, 1),
  },
  subscriptionPrice: {
    color: "#1E293B",
    fontWeight: 600,
    fontSize: "1.5rem",
    marginBottom: theme.spacing(1),
  },
  billingDate: {
    color: "#64748B",
    marginBottom: theme.spacing(2),
  },
  billingHistoryPaper: {
    backgroundColor: "#FFFFFF",
    borderRadius: "16px",
    boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)",
    padding: theme.spacing(3),
  },
  billingHistoryItem: {
    border: "1px solid #E2E8F0",
    borderRadius: "8px",
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    "&:last-child": {
      marginBottom: 0,
    },
  },
  downloadButton: {
    color: "#64748B",
    "&:hover": {
      backgroundColor: "rgba(100, 116, 139, 0.04)",
    },
  },
  dialogActions: {
    padding: theme.spacing(2),

    [theme.breakpoints.down("sm")]: {
      flexDirection: "row",
      gap: theme.spacing(1),
    },
  },
  closeButton: {
    color: "#64748B",
    order: 0,
    // margin: theme.spacing(2),

    "&:hover": {
      backgroundColor: "rgba(100, 116, 139, 0.04)",
    },
    [theme.breakpoints.down("sm")]: {
      order: 1,
    },
  },
  actionButton: {
    order: 1,
    backgroundColor: "#1E293B",
    "&:hover": {
      backgroundColor: "#0F172A",
    },
    [theme.breakpoints.down("sm")]: {
      order: 0,
    },
  },
  cancelButton: {
    color: "#64748B",
    "&:hover": {
      backgroundColor: "rgba(100, 116, 139, 0.04)",
    },
  },
  formGrid: {
    marginTop: theme.spacing(2),
  },
  inputIcon: {
    color: "#64748B",
  },
  manageBillingButton: {
    color: "#64748B",
    "&:hover": {
      backgroundColor: "rgba(100, 116, 139, 0.04)",
    },
  },
  subscriptionContent: {
    padding: 10,
  },
  subscriptionBox: {
    border: "1px solid #E2E8F0",
    borderRadius: "16px",
    overflow: "hidden",
  },
  planHeader: {
    backgroundColor: "#1E293B",
    color: "white",
    padding: theme.spacing(2),
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  planIconContainer: {
    width: 40,
    height: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: "8px",
  },
  activeChip: {
    backgroundColor: "#10B981",
    color: "white",
    fontWeight: 600,
  },
  planDetails: {
    padding: theme.spacing(2),
  },
  planInfoContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: theme.spacing(3),
  },
  planActions: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: theme.spacing(2),
    borderTop: "1px solid #E2E8F0",
  },
  comparePlansButton: {
    backgroundColor: "#1E293B",
    color: "white",
    "&:hover": {
      backgroundColor: "#0F172A",
    },
  },
  subscriptionDialog: {
    "& .MuiDialog-paper": {
      borderRadius: "16px",
    },
  },
  dialogPaper: {
    backgroundColor: "#FFFFFF",
    borderRadius: "16px",
  },
  dialogTitle: {
    padding: theme.spacing(2, 3),
    borderBottom: "1px solid #E2E8F0",
  },
  dialogContent: {
    padding: theme.spacing(3),
  },
  currentPlanSummary: {
    backgroundColor: "#1E293B",
    color: "white",
    padding: theme.spacing(3),
    borderRadius: "16px",
    marginBottom: theme.spacing(3),
  },
  paymentMethodHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing(2),
  },
  paymentMethodButton: {
    color: "#64748B",
    "&:hover": {
      backgroundColor: "rgba(100, 116, 139, 0.04)",
    },
  },
  paymentMethodPaper: {
    padding: theme.spacing(2),
    border: "1px solid #E2E8F0",
    borderRadius: "8px",
  },
  cardIconContainer: {
    width: 44,
    height: 28,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid #E2E8F0",
    borderRadius: "4px",
    padding: theme.spacing(1),
  },
  centeredUserInfo: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  },
  titleAndEdit: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
}));
