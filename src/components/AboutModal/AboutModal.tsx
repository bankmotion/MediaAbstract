import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  Box,
  Button,
  IconButton,
  useTheme,
  Fade,
  Zoom,
  Divider,
  Chip,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import {
  Close as CloseIcon,
  BusinessCenter,
  Lightbulb,
  Groups,
  Star,
  TrendingUp,
} from "@mui/icons-material";
import useStyles from "./styles";
import Cookies from "js-cookie";

interface AboutModalProps {
  open: boolean;
  onClose: () => void;
}

const AboutModal: React.FC<AboutModalProps> = ({ open, onClose }) => {
  const { classes } = useStyles();
  const theme = useTheme();
  const [hoveredSection, setHoveredSection] = useState<number | null>(null);
  const [dontShowAgain, setDontShowAgain] = useState(false);

  const handleClose = () => {
    if (dontShowAgain) {
      // Set cookie to expire in 30 days
      Cookies.set("aboutModalShown", "true", { expires: 30 });
    }
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        className: classes.dialogPaper,
      }}
      TransitionComponent={Fade}
      transitionDuration={800}
    >
      <DialogTitle className={classes.dialogTitle}>
        <Box className={classes.titleContainer}>
          <Box className={classes.titleWrapper}>
            <Typography variant="h4" className={classes.title}>
              Welcome to WriteFor.co
            </Typography>
            <Box className={classes.titleDecoration} />
          </Box>
          <Typography variant="subtitle1" className={classes.subtitle}>
            Where Smart Pitching Meets AI-Guided Media Intelligence
          </Typography>
          <Box className={classes.badgeContainer}>
            <Chip
              icon={<Star />}
              label="Early Access"
              className={classes.badge}
              color="primary"
            />
            <Chip
              icon={<TrendingUp />}
              label="Beta"
              className={classes.badge}
              color="secondary"
            />
          </Box>
        </Box>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          className={classes.closeButton}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <Box className={classes.contentWrapper}>
          <Zoom in={true} style={{ transitionDelay: "100ms" }}>
            <Box
              className={`${classes.section} ${
                hoveredSection === 0 ? classes.sectionHovered : ""
              }`}
              onMouseEnter={() => setHoveredSection(0)}
              onMouseLeave={() => setHoveredSection(null)}
            >
              <Box className={classes.iconContainer}>
                <Box className={classes.iconWrapper}>
                  <BusinessCenter className={classes.sectionIcon} />
                </Box>
              </Box>
              <Typography variant="h5" className={classes.sectionTitle}>
                Our Mission
              </Typography>
              <Divider className={classes.sectionDivider} />
              <Typography variant="body1" className={classes.sectionText}>
                WriteFor.co helps brands, founders, content creators, PR
                professionals, and subject-matter experts pitch smarter-using
                AI—assisted matching and a vetted database of 100+ publications to streamline your
                thought leadership strategy and amplify your voice where it
                matters most.
              </Typography>
            </Box>
          </Zoom>

          <Zoom in={true} style={{ transitionDelay: "200ms" }}>
            <Box
              className={`${classes.section} ${
                hoveredSection === 1 ? classes.sectionHovered : ""
              }`}
              onMouseEnter={() => setHoveredSection(1)}
              onMouseLeave={() => setHoveredSection(null)}
            >
              <Box className={classes.iconContainer}>
                <Box className={classes.iconWrapper}>
                  <Lightbulb className={classes.sectionIcon} />
                </Box>
              </Box>
              <Typography variant="h5" className={classes.sectionTitle}>
                Our Founder
              </Typography>
              <Divider className={classes.sectionDivider} />
              <Typography variant="body1" className={classes.sectionText}>
                Founded by a PR leader with 25+ years of experience, WriteFor.co
                brings together deep media expertise and AI-assisted matching to make
                pitching faster, smarter, and more effective.
              </Typography>
            </Box>
          </Zoom>

          <Zoom in={true} style={{ transitionDelay: "300ms" }}>
            <Box
              className={`${classes.section} ${
                hoveredSection === 2 ? classes.sectionHovered : ""
              }`}
              onMouseEnter={() => setHoveredSection(2)}
              onMouseLeave={() => setHoveredSection(null)}
            >
              <Box className={classes.iconContainer}>
                <Box className={classes.iconWrapper}>
                  <Groups className={classes.sectionIcon} />
                </Box>
              </Box>
              <Typography variant="h5" className={classes.sectionTitle}>
                Join Our Beta
              </Typography>
              <Divider className={classes.sectionDivider} />
              <Typography variant="body1" className={classes.sectionText}>
                Join our early beta and help shape the future of smarter, more
                targeted pitching. Get early access, influence product direction, and
                connect your ideas with the right media—faster.
              </Typography>
            </Box>
          </Zoom>

          <Box className={classes.ctaContainer}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={dontShowAgain}
                  onChange={(e) => setDontShowAgain(e.target.checked)}
                  color="primary"
                />
              }
              label="Don't show this again"
              sx={{
                marginBottom: 2,
                "& .MuiFormControlLabel-label": {
                  fontSize: "0.9rem",
                  color: theme.palette.text.secondary,
                },
              }}
            />
            <Button
              variant="contained"
              color="primary"
              className={classes.ctaButton}
              onClick={handleClose}
            >
              Get Started
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default AboutModal;
