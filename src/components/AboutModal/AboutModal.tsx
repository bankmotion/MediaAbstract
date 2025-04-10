import React, { useEffect, useState } from "react";
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
  Avatar,
  Divider,
  Chip,
} from "@mui/material";
import {
  Close as CloseIcon,
  RocketLaunch,
  AutoAwesome,
  ConnectWithoutContact,
  Star,
  EmojiEvents,
  TrendingUp,
} from "@mui/icons-material";
import useStyles from "./styles";

interface AboutModalProps {
  open: boolean;
  onClose: () => void;
}

const AboutModal: React.FC<AboutModalProps> = ({ open, onClose }) => {
  const { classes } = useStyles();
  const theme = useTheme();
  const [hoveredSection, setHoveredSection] = useState<number | null>(null);

  return (
    <Dialog
      open={open}
      onClose={onClose}
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
            Where Smart Pitching Meets AI Innovation
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
          onClick={onClose}
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
                  <RocketLaunch className={classes.sectionIcon} />
                </Box>
              </Box>
              <Typography variant="h5" className={classes.sectionTitle}>
                Our Mission
              </Typography>
              <Divider className={classes.sectionDivider} />
              <Typography variant="body1" className={classes.sectionText}>
                WriteFor.co helps PR professionals pitch smarter with AI,
                matching your ideas to the right outlets.
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
                  <AutoAwesome className={classes.sectionIcon} />
                </Box>
              </Box>
              <Typography variant="h5" className={classes.sectionTitle}>
                Our Founder
              </Typography>
              <Divider className={classes.sectionDivider} />
              <Typography variant="body1" className={classes.sectionText}>
                Founded by Mike Lizun, a PR veteran with over 25 years of
                experience, WriteFor.co combines industry expertise with
                cutting-edge AI to streamline your pitching process.
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
                  <ConnectWithoutContact className={classes.sectionIcon} />
                </Box>
              </Box>
              <Typography variant="h5" className={classes.sectionTitle}>
                Join Our Beta
              </Typography>
              <Divider className={classes.sectionDivider} />
              <Typography variant="body1" className={classes.sectionText}>
                Join our early beta to help shape the future of smarter pitching
                and better media connections—your feedback matters!
              </Typography>
            </Box>
          </Zoom>

          <Box className={classes.ctaContainer}>
            <Button
              variant="contained"
              color="primary"
              className={classes.ctaButton}
              onClick={onClose}
              startIcon={<RocketLaunch />}
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
