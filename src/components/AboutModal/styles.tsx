import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  dialogPaper: {
    borderRadius: 16,
    padding: theme.spacing(2),
    background: "#ffffff",
    boxShadow: "0 12px 40px rgba(0, 0, 0, 0.08)",
    border: "1px solid rgba(0, 0, 0, 0.08)",
    [theme.breakpoints.down("sm")]: {
      margin: theme.spacing(2),
      borderRadius: 12,
    },
  },

  "@keyframes float": {
    "0%": {
      transform: "translateY(0px)",
    },
    "50%": {
      transform: "translateY(-10px)",
    },
    "100%": {
      transform: "translateY(0px)",
    },
  },

  dialogTitle: {
    padding: theme.spacing(4),
    position: "relative",
    borderBottom: `1px solid ${theme.palette.divider}`,
    background: "#ffffff",
    borderRadius: "16px 16px 0 0",
    overflow: "hidden",
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: "3px",
      background: "#2C3E50",
    },
  },

  "@keyframes gradient": {
    "0%": {
      backgroundPosition: "0% 50%",
    },
    "50%": {
      backgroundPosition: "100% 50%",
    },
    "100%": {
      backgroundPosition: "0% 50%",
    },
  },

  titleContainer: {
    textAlign: "center",
    marginBottom: theme.spacing(2),
    position: "relative",
  },

  titleWrapper: {
    position: "relative",
    display: "inline-block",
  },

  title: {
    fontWeight: 700,
    color: "#2C3E50",
    textAlign: "center",
    fontSize: "2.25rem",
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.75rem",
    },
  },

  titleDecoration: {
    position: "absolute",
    bottom: -8,
    left: "50%",
    transform: "translateX(-50%)",
    width: "50px",
    height: "3px",
    background: "#3498DB",
    borderRadius: "2px",
  },

  subtitle: {
    color: theme.palette.text.secondary,
    fontSize: "1.1rem",
    marginTop: theme.spacing(1),
    fontWeight: 500,
    marginBottom: theme.spacing(2),
  },

  badgeContainer: {
    display: "flex",
    justifyContent: "center",
    gap: theme.spacing(2),
    marginTop: theme.spacing(2),
  },

  badge: {
    borderRadius: "8px",
    padding: theme.spacing(0.75, 2),
    fontWeight: 600,
    fontSize: "0.875rem",
    boxShadow: "none",
    border: "1px solid rgba(0, 0, 0, 0.1)",
    "& .MuiChip-icon": {
      color: "inherit",
      fontSize: "1rem",
      marginRight: theme.spacing(0.5),
    },
    "&.MuiChip-colorPrimary": {
      backgroundColor: "#E3F2FD",
      color: "#1565C0",
      borderColor: "#90CAF9",
      "& .MuiChip-icon": {
        color: "#1565C0",
      },
    },
    "&.MuiChip-colorSecondary": {
      backgroundColor: "#E8F5E9",
      color: "#2E7D32",
      borderColor: "#A5D6A7",
      "& .MuiChip-icon": {
        color: "#2E7D32",
      },
    },
  },

  closeButton: {
    position: "absolute",
    right: theme.spacing(2),
    top: theme.spacing(2),
    color: theme.palette.grey[600],
    transition: "all 0.3s ease",
    "&:hover": {
      color: theme.palette.grey[800],
      transform: "rotate(90deg)",
      background: "rgba(0, 0, 0, 0.04)",
    },
  },

  dialogContent: {
    padding: theme.spacing(4),
    background: "#ffffff",
    position: "relative",
  },

  contentWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(4),
  },

  section: {
    padding: theme.spacing(4),
    borderRadius: 12,
    background: "#ffffff",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.04)",
    transition: "all 0.3s ease",
    border: "1px solid rgba(0, 0, 0, 0.06)",
    position: "relative",
    overflow: "hidden",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 8px 24px rgba(0, 0, 0, 0.08)",
    },
  },

  sectionHovered: {
    transform: "translateY(-2px)",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.08)",
  },

  iconContainer: {
    display: "flex",
    justifyContent: "center",
    marginBottom: theme.spacing(2),
  },

  iconWrapper: {
    position: "relative",
    "&::before": {
      content: '""',
      position: "absolute",
      top: "-8px",
      left: "-8px",
      right: "-8px",
      bottom: "-8px",
      background: "rgba(52, 152, 219, 0.08)",
      borderRadius: "50%",
    },
  },

  "@keyframes pulse": {
    "0%": {
      transform: "scale(0.95)",
      opacity: 0.5,
    },
    "50%": {
      transform: "scale(1.05)",
      opacity: 0.8,
    },
    "100%": {
      transform: "scale(0.95)",
      opacity: 0.5,
    },
  },

  sectionIcon: {
    fontSize: "2rem",
    color: "#ffffff",
    background: "#3498DB",
    padding: theme.spacing(1.25),
    borderRadius: "50%",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.08)",
    position: "relative",
    zIndex: 1,
  },

  sectionTitle: {
    fontWeight: 600,
    color: "#2C3E50",
    marginBottom: theme.spacing(2),
    textAlign: "center",
    position: "relative",
    "&::after": {
      content: '""',
      position: "absolute",
      bottom: -6,
      left: "50%",
      transform: "translateX(-50%)",
      width: "32px",
      height: "2px",
      background: "#3498DB",
      borderRadius: "1px",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.25rem",
    },
  },

  sectionDivider: {
    margin: theme.spacing(2, 0),
    background: "#E2E8F0",
    height: "1px",
    border: "none",
  },

  sectionText: {
    color: "#4A5568",
    lineHeight: 1.7,
    fontSize: "1rem",
    textAlign: "center",
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.95rem",
    },
  },

  ctaContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: theme.spacing(4),
    position: "relative",
    "&::before": {
      content: '""',
      position: "absolute",
      top: "-16px",
      left: "50%",
      transform: "translateX(-50%)",
      width: "60%",
      height: "1px",
      background: "#E2E8F0",
    },
  },

  ctaButton: {
    padding: theme.spacing(1.5, 4),
    fontSize: "1rem",
    fontWeight: 600,
    borderRadius: 8,
    textTransform: "none",
    background: "#3498DB",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.08)",
    color: "#ffffff",
    position: "relative",
    overflow: "hidden",
    "&:hover": {
      transform: "translateY(-1px)",
      boxShadow: "0 6px 12px rgba(0, 0, 0, 0.12)",
      background: "#2980B9",
    },
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(1, 3),
      fontSize: "0.95rem",
    },
  },
}));

export default useStyles;
