import React from "react";
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
  Link,
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

  if (!outlet) return null;

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

        {/* Editor Contact */}
        <Box className={classes.section}>
          <EmailIcon className={classes.iconGreen} />
          <Typography variant="h6" className={classes.sectionTitle}>
            Editor Contact:
          </Typography>
        </Box>
        <Link href={"#"} color="primary">
          <Typography className={classes.text}>
            {outlet.contact_email || "No contact available."}
          </Typography>
        </Link>
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
    </Dialog>
  );
};

export default OutletDetailModal;
