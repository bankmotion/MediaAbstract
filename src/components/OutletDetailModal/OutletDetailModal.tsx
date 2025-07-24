import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Divider,
  IconButton,
  Snackbar,
  Tooltip,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import InfoIcon from "@mui/icons-material/Info";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import CloseIcon from "@mui/icons-material/Close";
import useStyles from "./style";

interface OutletDetailsModalProps {
  open: boolean;
  handleClose: () => void;
  outlet: any;
}

const OutletDetailModal: React.FC<OutletDetailsModalProps> = ({
  open,
  handleClose,
  outlet,
}) => {
  const { classes } = useStyles();
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  if (!outlet) return null;

  const handleCopyEmail = () => {
    if (outlet.contact_email) {
      navigator.clipboard.writeText(outlet.contact_email);
      setSnackbarOpen(true);
    }
  };
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      {/* Header */}
      <Box className={classes.header}>
        <DialogTitle className={classes.title}>{outlet.name}</DialogTitle>
        <IconButton onClick={handleClose} size="small">
          <CloseIcon />
        </IconButton>
      </Box>

      <DialogContent className={classes.content}>
        {/* Pitch Guidelines */}
        <Box className={classes.section}>
          <InfoIcon className={classes.iconBlue} />
          <Typography variant="h6" className={classes.sectionTitle}>
            Pitch Guidelines:
          </Typography>
        </Box>
        <Typography className={classes.text}>
          {outlet.guidelines || "No guidelines available."}
        </Typography>
        <Divider className={classes.divider} />

        {/* Pitch Tips */}
        <Box className={classes.section}>
          <TipsAndUpdatesIcon className={classes.iconOrange} />
          <Typography variant="h6" className={classes.sectionTitle}>
            Pitch Tips:
          </Typography>
        </Box>
        <Typography className={classes.text}>
          {outlet.pitch_tips || "No tips available."}
        </Typography>
        <Divider className={classes.divider} />

        {/* AI Partnered Status */}
        <Box className={classes.section}>
          <InfoIcon className={classes.iconBlue} />
          <Typography variant="h6" className={classes.sectionTitle}>
            AI Partnered Status:
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" gap={1}>
          <Typography 
            className={classes.text}
            style={
              outlet.ai_partnered === "Yes"
                ? { color: "#1976d2", fontWeight: 600 }
                : outlet.ai_partnered === "No"
                ? { color: "#d32f2f", fontWeight: 600 }
                : { color: "#666" }
            }
          >
            {outlet.ai_partnered === "Yes"
              ? "✓ AI Partnered"
              : outlet.ai_partnered === "No"
              ? "✗ Not AI Partnered"
              : outlet.ai_partnered === "Unconfirmed"
              ? "? Unconfirmed"
              : "Unknown"}
          </Typography>
          <Tooltip
            title={
              outlet.ai_partnered === "Yes"
                ? "This outlet has a confirmed partnership with an AI platform like OpenAI. Publishing here may increase your story's visibility in AI-generated search results, summaries, and tools like ChatGPT or Perplexity."
                : outlet.ai_partnered === "No"
                ? "This outlet has confirmed they do not have an AI partnership. Status may change over time as more media organizations sign licensing agreements with AI platforms."
                : "Status unconfirmed per trackers. This outlet's AI partnership status is unclear based on current tracking data."
            }
            arrow
            classes={{ tooltip: classes.matchExplanationTooltip }}
          >
            <InfoIcon className={classes.matchExplanationIcon} />
          </Tooltip>
        </Box>
        <Divider className={classes.divider} />

        {/* Editor Contact */}
        <Box className={classes.section}>
          <EmailIcon className={classes.iconGreen} />
          <Typography variant="h6" className={classes.sectionTitle}>
            Editor Contact:
          </Typography>
        </Box>
        <Typography
          className={classes.text}
          style={{ cursor: "pointer", color: "#1976d2" }}
          onClick={handleCopyEmail}
        >
          {outlet.contact_email || "No contact available."}
        </Typography>
      </DialogContent>

      {/* Footer */}
      <DialogActions className={classes.footer}>
        <Button
          onClick={handleClose}
          variant="contained"
          color="primary"
          className={classes.button}
        >
          Close
        </Button>
      </DialogActions>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message="Email copied to clipboard!"
      />
    </Dialog>
  );
};

export default OutletDetailModal;
