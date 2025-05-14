import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  dialogPaper: {
    borderRadius: 16,
    padding: theme.spacing(2),
    background: "#ffffff",
    boxShadow: "0 12px 40px rgba(0, 0, 0, 0.08)",
    border: "1px solid rgba(0, 0, 0, 0.08)",
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
    borderBottom: "1px solid rgba(0, 0, 0, 0.04)",
    background: "rgba(255, 255, 255, 0.98)",
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
      background: "linear-gradient(90deg, #1a1a1a, #333333)",
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
    background: "#1a1a1a",
    borderRadius: "2px",
  },

  subtitle: {
    color: "#4a4a4a",
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
      backgroundColor: "rgba(26, 26, 26, 0.05)",
      color: "#1a1a1a",
      borderColor: "rgba(26, 26, 26, 0.1)",
      "& .MuiChip-icon": {
        color: "#1a1a1a",
      },
    },
    "&.MuiChip-colorSecondary": {
      backgroundColor: "rgba(26, 26, 26, 0.05)",
      color: "#1a1a1a",
      borderColor: "rgba(26, 26, 26, 0.1)",
      "& .MuiChip-icon": {
        color: "#1a1a1a",
      },
    },
  },

  closeButton: {
    position: "absolute",
    right: theme.spacing(2),
    top: theme.spacing(2),
    color: "#666666",
    transition: "all 0.3s ease",
    "&:hover": {
      color: "#1a1a1a",
      transform: "rotate(90deg)",
      background: "rgba(0, 0, 0, 0.04)",
    },
  },

  dialogContent: {
    padding: theme.spacing(4),
    background: "rgba(255, 255, 255, 0.98)",
    position: "relative",
    backdropFilter: "blur(10px)",
  },

  contentWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(4),
  },

  section: {
    padding: theme.spacing(4),
    borderRadius: 12,
    background: "rgba(255, 255, 255, 0.98)",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.04)",
    transition: "all 0.3s ease",
    border: "1px solid rgba(0, 0, 0, 0.04)",
    position: "relative",
    overflow: "hidden",
    backdropFilter: "blur(10px)",
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
      background: "rgba(26, 26, 26, 0.05)",
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
    background: "#1a1a1a",
    padding: theme.spacing(1.25),
    borderRadius: "50%",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.08)",
    position: "relative",
    zIndex: 1,
  },

  sectionTitle: {
    fontWeight: 600,
    color: "#1a1a1a",
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
      background: "#1a1a1a",
      borderRadius: "1px",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.25rem",
    },
  },

  sectionDivider: {
    margin: theme.spacing(2, 0),
    background: "rgba(0, 0, 0, 0.04)",
    height: "1px",
    border: "none",
  },

  sectionText: {
    color: "#4a4a4a",
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
      background: "rgba(0, 0, 0, 0.04)",
    },
  },

  ctaButton: {
    padding: theme.spacing(1.5, 4),
    fontSize: "1rem",
    fontWeight: 600,
    borderRadius: 8,
    textTransform: "none",
    background: "#1a1a1a",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.08)",
    color: "#ffffff",
    position: "relative",
    overflow: "hidden",
    "&:hover": {
      transform: "translateY(-1px)",
      boxShadow: "0 6px 12px rgba(0, 0, 0, 0.12)",
      background: "#333333",
    },
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(1, 3),
      fontSize: "0.95rem",
    },
  },
}));

export default useStyles;
