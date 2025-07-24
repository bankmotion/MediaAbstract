import React, { useState } from "react";
import {
  Box,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Paper,
} from "@mui/material";
import useStyles from "./styles";

interface VettingQuestionsProps {
  onComplete: (isAgency: boolean) => void;
}

const VettingQuestions: React.FC<VettingQuestionsProps> = ({ onComplete }) => {
  const { classes } = useStyles();
  const [usageType, setUsageType] = useState<string>("");
  const [isAgency, setIsAgency] = useState<string>("");
  const [showAgencyDialog, setShowAgencyDialog] = useState(false);

  const handleSubmit = () => {
    const isAgencyUser = isAgency === "yes" || usageType === "agency";
    if (isAgencyUser) {
      setShowAgencyDialog(true);
    } else {
      onComplete(false);
    }
  };

  const handleAgencyDialogClose = () => {
    setShowAgencyDialog(false);
    onComplete(true);
  };

  const isFormValid = usageType && isAgency;

  return (
    <Paper className={classes.root} elevation={1}>
      <Typography variant="h5" gutterBottom align="center">
        Tell us about yourself
      </Typography>

      <div className={classes.question}>
        <Typography className={classes.questionTitle}>
          How do you typically use contributed content in your work?
        </Typography>
        <RadioGroup
          className={classes.radioGroup}
          value={usageType}
          onChange={(e) => setUsageType(e.target.value)}
        >
          <FormControlLabel
            value="freelance"
            control={<Radio />}
            label="I'm a freelance writer or content creator"
          />
          <FormControlLabel
            value="individual"
            control={<Radio />}
            label="I'm an individual PR professional"
          />
          <FormControlLabel
            value="agency"
            control={<Radio />}
            label="I work for a brand, content team, or agency"
          />
        </RadioGroup>
      </div>

      <div className={classes.question}>
        <Typography className={classes.questionTitle}>
          Are you signing up on behalf of a company, brand, content team, or
          agency?
        </Typography>
        <RadioGroup
          className={classes.radioGroup}
          value={isAgency}
          onChange={(e) => setIsAgency(e.target.value)}
        >
          <FormControlLabel
            value="no"
            control={<Radio />}
            label="No, I'm signing up as an individual"
          />
          <FormControlLabel
            value="yes"
            control={<Radio />}
            label="Yes, I represent a company, brand, content team, or agency"
          />
        </RadioGroup>
      </div>

      {(isAgency === "yes" || usageType === "agency") && (
        <Alert severity="info" className={classes.alert}>
          Based on your responses, you might be better suited for our Team plan.
          Would you like to learn more about our team features?
        </Alert>
      )}

      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={!isFormValid}
        fullWidth
        className={classes.continueButton}
      >
        Continue
      </Button>

      <Dialog
        open={showAgencyDialog}
        onClose={() => setShowAgencyDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Consider Our Team Plan</DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <Typography gutterBottom>
            We noticed you might be signing up as part of a team, brand, content
            team, or agency. Our Team plan offers:
          </Typography>
          <ul>
            <li>Team collaboration features</li>
            <li>Multiple user accounts</li>
            <li>Enhanced CRM integration</li>
            <li>Priority support</li>
            <li>Advanced analytics and reporting</li>
            <li>Custom onboarding and training</li>
          </ul>
          <Typography>
            Would you like to explore our Team plan instead?
          </Typography>
        </DialogContent>
        <DialogActions className={classes.dialogActions}>
          <Button
            onClick={() => setShowAgencyDialog(false)}
            color="primary"
            variant="outlined"
          >
            Continue with Writer Plan
          </Button>
          <Button
            onClick={handleAgencyDialogClose}
            color="primary"
            variant="contained"
          >
            View Team Plan
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default VettingQuestions;
