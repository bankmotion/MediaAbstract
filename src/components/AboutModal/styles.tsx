import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  dialogPaper: {
    borderRadius: 16,
    padding: theme.spacing(2),
    background: "#ffffff",
    boxShadow: "0 12px 40px rgba(37, 99, 235, 0.08)",
    border: "1px solid rgba(37, 99, 235, 0.08)",
    position: "relative",
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundImage: `
        radial-gradient(circle at 1px 1px, rgba(0, 0, 0, 0.03) 1px, transparent 0),
        linear-gradient(90deg, rgba(0, 0, 0, 0.02) 1px, transparent 1px),
        linear-gradient(rgba(0, 0, 0, 0.02) 1px, transparent 1px)
      `,
      backgroundSize: "24px 24px, 48px 48px, 48px 48px",
      backgroundPosition: "center",
      opacity: 0.8,
      zIndex: 0,
      pointerEvents: "none",
    },
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
    borderBottom: "1px solid rgba(37, 99, 235, 0.08)",
    background: "#ffffff",
    borderRadius: "16px 16px 0 0",
    overflow: "hidden",
    backdropFilter: "blur(10px)",
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: "3px",
      background: "linear-gradient(90deg, #2563eb, #1d4ed8)",
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
    marginBottom: theme.spacing(3),
    position: "relative",
  },

  titleWrapper: {
    position: "relative",
    display: "inline-block",
  },

  title: {
    fontWeight: 700,
    color: "#1a1a1a",
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
    background: "#2563eb",
    borderRadius: "2px",
  },

  subtitle: {
    color: "#4a4a4a",
    fontSize: "1.1rem",
    marginTop: theme.spacing(1),
    fontWeight: 500,
    marginBottom: theme.spacing(2),
    lineHeight: 1.6,
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
    border: "1px solid rgba(37, 99, 235, 0.1)",
    "& .MuiChip-icon": {
      color: "inherit",
      fontSize: "1rem",
      marginRight: theme.spacing(0.5),
    },
    "&.MuiChip-colorPrimary": {
      backgroundColor: "rgba(37, 99, 235, 0.05)",
      color: "#2563eb",
      borderColor: "rgba(37, 99, 235, 0.1)",
      "& .MuiChip-icon": {
        color: "#2563eb",
      },
    },
    "&.MuiChip-colorSecondary": {
      backgroundColor: "rgba(37, 99, 235, 0.05)",
      color: "#2563eb",
      borderColor: "rgba(37, 99, 235, 0.1)",
      "& .MuiChip-icon": {
        color: "#2563eb",
      },
    },
  },

  closeButton: {
    position: "absolute",
    right: theme.spacing(2),
    top: theme.spacing(2),
    color: "#64748b",
    transition: "all 0.3s ease",
    "&:hover": {
      color: "#2563eb",
      transform: "rotate(90deg)",
      background: "rgba(37, 99, 235, 0.04)",
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
    gap: theme.spacing(5),
  },

  section: {
    padding: theme.spacing(5),
    borderRadius: 12,
    background: "#ffffff",
    boxShadow: "0 4px 12px rgba(37, 99, 235, 0.04)",
    transition: "all 0.3s ease",
    border: "1px solid rgba(37, 99, 235, 0.08)",
    position: "relative",
    overflow: "hidden",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 8px 24px rgba(37, 99, 235, 0.08)",
      "& .iconWrapper::before": {
        background: "rgba(37, 99, 235, 0.05)",
        transform: "rotate(45deg) scale(1.05)",
      },
      "& .iconWrapper::after": {
        borderColor: "rgba(37, 99, 235, 0.12)",
        transform: "rotate(45deg) scale(1.05)",
      },
      "& .sectionIcon": {
        transform: "scale(1.1)",
        color: "#2563eb",
      },
    },
  },

  sectionHovered: {
    transform: "translateY(-2px)",
    boxShadow: "0 8px 24px rgba(37, 99, 235, 0.08)",
  },

  iconContainer: {
    display: "flex",
    justifyContent: "center",
    marginBottom: theme.spacing(4),
    position: "relative",
  },

  iconWrapper: {
    position: "relative",
    width: "64px",
    height: "64px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "rgba(37, 99, 235, 0.05)",
      borderRadius: "16px",
      transform: "rotate(45deg)",
      transition: "all 0.3s ease",
    },
    "&::after": {
      content: '""',
      position: "absolute",
      top: "-4px",
      left: "-4px",
      right: "-4px",
      bottom: "-4px",
      border: "1px solid rgba(37, 99, 235, 0.08)",
      borderRadius: "20px",
      transform: "rotate(45deg)",
      transition: "all 0.3s ease",
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
    fontSize: "1.75rem",
    color: "#2563eb",
    position: "relative",
    zIndex: 1,
    transition: "all 0.3s ease",
  },

  sectionTitle: {
    fontWeight: 600,
    color: "#1a1a1a",
    marginBottom: theme.spacing(3),
    textAlign: "center",
    position: "relative",
    "&::after": {
      content: '""',
      position: "absolute",
      bottom: -8,
      left: "50%",
      transform: "translateX(-50%)",
      width: "32px",
      height: "2px",
      background: "#2563eb",
      borderRadius: "1px",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.25rem",
    },
  },

  sectionDivider: {
    margin: theme.spacing(3, 0),
    background: "rgba(37, 99, 235, 0.08)",
    height: "1px",
    border: "none",
  },

  sectionText: {
    color: "#4a4a4a",
    lineHeight: 1.8,
    fontSize: "1.05rem",
    textAlign: "center",
    padding: theme.spacing(0, 2),
    [theme.breakpoints.down("sm")]: {
      fontSize: "1rem",
      padding: theme.spacing(0, 1),
    },
  },

  ctaContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
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
      background: "rgba(37, 99, 235, 0.08)",
    },
  },

  ctaButton: {
    padding: theme.spacing(1.5, 4),
    fontSize: "1rem",
    fontWeight: 600,
    borderRadius: 10,
    textTransform: "none",
    background: "#2563eb",
    boxShadow: "0 4px 6px rgba(37, 99, 235, 0.2)",
    color: "#ffffff",
    position: "relative",
    overflow: "hidden",
    "&:hover": {
      transform: "translateY(-1px)",
      boxShadow: "0 6px 12px rgba(37, 99, 235, 0.3)",
      background: "#1d4ed8",
    },
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(1, 3),
      fontSize: "0.95rem",
    },
  },
}));

export default useStyles;
