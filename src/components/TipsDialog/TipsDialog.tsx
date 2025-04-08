import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
} from "@mui/material";

interface TipsDialogProps {
  open: boolean;
  onClose: () => void;
}

const TipsDialog: React.FC<TipsDialogProps> = ({ open, onClose }) => {
  const tipsContent = (
    <Box>
      <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
        Pitching Tips:
      </Typography>
      <ul style={{ margin: 0, paddingLeft: "1.5rem" }}>
        <li>Keep it concise (1-2 sentences)</li>
        <li>
          Include relevant keywords (e.g., "business", "tech", "innovation")
        </li>
        <li>Focus on the unique value proposition</li>
        <li>Be specific about your target audience</li>
        <li>Highlight the problem you're solving</li>
      </ul>
    </Box>
  );

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: 2,
          padding: 2,
          maxWidth: "90%",
          width: "100%",
        },
      }}
    >
      <DialogTitle sx={{ fontWeight: 600, pb: 1 }}>Pitching Tips</DialogTitle>
      <DialogContent>{tipsContent}</DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button
          onClick={onClose}
          variant="contained"
          color="primary"
          sx={{
            textTransform: "none",
            borderRadius: 2,
            px: 3,
            fontWeight: 600,
          }}
        >
          Got it
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TipsDialog;
