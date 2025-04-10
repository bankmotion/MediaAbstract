import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  dialogPaper: {
    borderRadius: 24,
    padding: theme.spacing(2),
    background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    backdropFilter: "blur(10px)",
    animation: "$float 6s ease-in-out infinite",
    [theme.breakpoints.down("sm")]: {
      margin: theme.spacing(2),
      borderRadius: 16,
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
    background: "linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)",
    borderRadius: "24px 24px 0 0",
    overflow: "hidden",
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: "4px",
      background: "linear-gradient(90deg, #007BFF, #00C6FF, #007BFF)",
      animation: "$gradient 3s ease infinite",
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
    fontWeight: 800,
    background: "linear-gradient(45deg, #007BFF 30%, #00C6FF 90%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    textAlign: "center",
    fontSize: "2.5rem",
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.8rem",
    },
  },

  titleDecoration: {
    position: "absolute",
    bottom: -10,
    left: "50%",
    transform: "translateX(-50%)",
    width: "60px",
    height: "4px",
    background: "linear-gradient(90deg, #007BFF, #00C6FF)",
    borderRadius: "2px",
  },

  subtitle: {
    color: theme.palette.text.secondary,
    fontSize: "1.2rem",
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
    borderRadius: "20px",
    padding: theme.spacing(0.5, 2),
    fontWeight: 600,
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    "& .MuiChip-icon": {
      color: "inherit",
    },
  },

  closeButton: {
    position: "absolute",
    right: theme.spacing(2),
    top: theme.spacing(2),
    color: theme.palette.grey[500],
    transition: "all 0.3s ease",
    "&:hover": {
      color: theme.palette.grey[700],
      transform: "rotate(90deg) scale(1.1)",
      background: "rgba(0, 0, 0, 0.05)",
    },
  },

  dialogContent: {
    padding: theme.spacing(4),
    background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
    position: "relative",
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background:
        "radial-gradient(circle at 50% 50%, rgba(0, 123, 255, 0.05) 0%, transparent 70%)",
      pointerEvents: "none",
    },
  },

  contentWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(4),
  },

  section: {
    padding: theme.spacing(4),
    borderRadius: 16,
    background: "rgba(255, 255, 255, 0.9)",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    position: "relative",
    overflow: "hidden",
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background:
        "linear-gradient(45deg, transparent, rgba(0, 123, 255, 0.05), transparent)",
      transform: "translateX(-100%)",
      transition: "transform 0.6s ease",
    },
    "&:hover": {
      transform: "translateY(-4px) scale(1.02)",
      boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
      background: "rgba(255, 255, 255, 1)",
      "&::before": {
        transform: "translateX(100%)",
      },
    },
  },

  sectionHovered: {
    transform: "translateY(-4px) scale(1.02)",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
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
      top: "-10px",
      left: "-10px",
      right: "-10px",
      bottom: "-10px",
      background:
        "radial-gradient(circle, rgba(0, 123, 255, 0.1) 0%, transparent 70%)",
      borderRadius: "50%",
      animation: "$pulse 2s infinite",
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
    fontSize: "2.5rem",
    color: "#ffffff",
    background: "linear-gradient(45deg, #007BFF 30%, #00C6FF 90%)",
    padding: theme.spacing(1.5),
    borderRadius: "50%",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    position: "relative",
    zIndex: 1,
  },

  sectionTitle: {
    fontWeight: 700,
    color: theme.palette.primary.main,
    marginBottom: theme.spacing(2),
    textAlign: "center",
    position: "relative",
    "&::after": {
      content: '""',
      position: "absolute",
      bottom: -8,
      left: "50%",
      transform: "translateX(-50%)",
      width: "40px",
      height: "2px",
      background: "linear-gradient(90deg, #007BFF, #00C6FF)",
      borderRadius: "1px",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.25rem",
    },
  },

  sectionDivider: {
    margin: theme.spacing(2, 0),
    background: "linear-gradient(90deg, transparent, #007BFF, transparent)",
    height: "1px",
    border: "none",
  },

  sectionText: {
    color: theme.palette.text.secondary,
    lineHeight: 1.8,
    fontSize: "1.1rem",
    textAlign: "center",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1rem",
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
      top: "-20px",
      left: "50%",
      transform: "translateX(-50%)",
      width: "80%",
      height: "1px",
      background: "linear-gradient(90deg, transparent, #007BFF, transparent)",
    },
  },

  ctaButton: {
    padding: theme.spacing(1.5, 4),
    fontSize: "1.1rem",
    fontWeight: 600,
    borderRadius: 12,
    textTransform: "none",
    background: "linear-gradient(45deg, #007BFF 30%, #00C6FF 90%)",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    color: "#ffffff",
    position: "relative",
    overflow: "hidden",
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background:
        "linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.2), transparent)",
      transform: "translateX(-100%)",
      transition: "transform 0.6s ease",
    },
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)",
      background: "linear-gradient(45deg, #0069d9 30%, #00b3ff 90%)",
      "&::before": {
        transform: "translateX(100%)",
      },
    },
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(1, 3),
      fontSize: "1rem",
    },
  },
}));

export default useStyles;
