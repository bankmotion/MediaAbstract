import React, { useRef, useState } from "react";
import { Box, Typography, Link, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router-dom";
import useStyles from "./styles";

const termsSections = [
  {
    id: "platform-use",
    title: "Platform Use",
    content:
      "WriteFor.co is a platform that helps users match their written content (e.g., bylines, op-eds, articles) with relevant media outlets. You agree to use the platform only for lawful, professional purposes related to content pitching and media outreach.",
  },
  {
    id: "account-responsibility",
    title: "Account Responsibility",
    content:
      "You are responsible for maintaining the confidentiality of your account information and for all activity under your account.",
  },
  {
    id: "content-ownership",
    title: "Content Ownership",
    content:
      "All content you upload or submit (e.g., pitches, article drafts) remains your intellectual property. By submitting it through our platform, you grant WriteFor.co the right to store, analyze, and match your content for the purpose of providing our service.",
  },
  {
    id: "copyright",
    title: "Copyright and Intellectual Property",
    content:
      "All content and code on WriteFor.co — including design, database structure, features, and branding — is the property of WriteFor.co and protected by copyright and other intellectual property laws. You may not copy, reverse-engineer, or use our materials without written permission.",
  },
  {
    id: "termination",
    title: "Termination",
    content:
      "We reserve the right to suspend or terminate accounts that violate these terms or abuse the platform.",
  },
  {
    id: "disclaimer",
    title: "Disclaimer",
    content:
      "WriteFor.co makes no guarantees of publication or media placement. Matches are based on editorial fit and historical guidelines, which may change.",
  },
];

const Terms = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const sectionRefs = useRef(
    termsSections.map(() => React.createRef<HTMLDivElement>())
  );
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const handleNavClick = (idx: number) => {
    sectionRefs.current[idx].current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSectionClick = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  return (
    <Box className={classes.root}>
      {/* Desktop Sidebar */}
      <nav className={classes.sidebar}>
        <Link
          component="button"
          onClick={() => navigate("/")}
          className={classes.backButton}
        >
          <ArrowBackIcon className={classes.backIcon} />
          <Typography variant="body1">Back</Typography>
        </Link>
        <Typography variant="h1" className={classes.title}>
          Terms of Use
        </Typography>
        {termsSections.map((section, idx) => (
          <a
            key={section.id}
            className={classes.navItem}
            onClick={() => handleNavClick(idx)}
          >
            {section.title}
          </a>
        ))}
      </nav>

      {/* Mobile Header */}
      <Box className={classes.mobileHeader}>
        <Link
          component="button"
          onClick={() => navigate("/")}
          className={classes.mobileBackButton}
        >
          <ArrowBackIcon className={classes.backIcon} />
          <Typography variant="body2">Back</Typography>
        </Link>
        <Typography variant="h1" className={classes.mobileTitle}>
          Terms of Use
        </Typography>
        <Typography variant="body2" className={classes.mobileSubtitle}>
          Please read our terms and conditions carefully
        </Typography>
      </Box>

      {/* Main Content */}
      <Box className={classes.content}>
        {/* Desktop Content */}
        <Box sx={{ display: { xs: "none", md: "block" } }}>
          {termsSections.map((section, idx) => (
            <Box
              key={section.id}
              className={classes.section}
              ref={sectionRefs.current[idx]}
              id={section.id}
            >
              <Typography variant="h2" className={classes.sectionTitle}>
                {section.title}
              </Typography>
              <Typography variant="body1" className={classes.sectionContent}>
                {section.content.split("WriteFor.co").map((part, i, arr) =>
                  i < arr.length - 1 ? (
                    <React.Fragment key={i}>
                      {part}
                      <span className={classes.platformName}>WriteFor.co</span>
                    </React.Fragment>
                  ) : (
                    part
                  )
                )}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Mobile Content */}
        <Box className={classes.mobileContent}>
          {termsSections.map((section) => (
            <Box key={section.id} className={classes.mobileSection}>
              <Box
                className={classes.mobileSectionHeader}
                onClick={() => handleSectionClick(section.id)}
              >
                <Typography className={classes.mobileSectionTitle}>
                  {section.title}
                </Typography>
                <IconButton
                  size="small"
                  sx={{
                    transform:
                      expandedSection === section.id
                        ? "rotate(180deg)"
                        : "none",
                    transition: "transform 0.2s",
                  }}
                >
                  <ExpandMoreIcon />
                </IconButton>
              </Box>
              {expandedSection === section.id && (
                <Box className={classes.mobileSectionContent}>
                  {section.content.split("WriteFor.co").map((part, i, arr) =>
                    i < arr.length - 1 ? (
                      <React.Fragment key={i}>
                        {part}
                        <span className={classes.platformName}>
                          WriteFor.co
                        </span>
                      </React.Fragment>
                    ) : (
                      part
                    )
                  )}
                </Box>
              )}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Terms;
