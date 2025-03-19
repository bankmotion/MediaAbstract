import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Tooltip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import Navbar from "../../components/Navbar/Nabvar";
import useStyles from "./styles";

interface Outlet {
  name: string;
  url: string;
  guidelines: string;
  score: number;
  aiPartnered: boolean;
}

const dummyOutlets: Outlet[] = [
  {
    name: "Forbes",
    url: "https://www.forbes.com/contributor/how-to-become-one",
    guidelines:
      "800-1200 words, pitch letters@forbes.com or councils@forbescouncils.com",
    score: 4.7,
    aiPartnered: true,
  },
  {
    name: "The Wall Street Journal",
    url: "https://www.wsj.com/",
    guidelines:
      "400-1000 words, exclusive, strong argument. Contact wsjcontact@wsj.com for contributor info",
    score: 4.5,
    aiPartnered: true,
  },
  {
    name: "Harvard Business Review",
    url: "hbr.org/submitters",
    guidelines: "800-1200 words, research-backed, pitch first",
    score: 4.3,
    aiPartnered: false,
  },
  {
    name: "Inc42",
    url: "https://www.inc.com",
    guidelines: "800-1200 words, startup insights, pitch first",
    score: 4.0,
    aiPartnered: false,
  },
  {
    name: "Wired",
    url: "https://www.wired.com/about/how-to-pitch-stories-to-wired/",
    guidelines: "600-1000 words, tech/culture, pitch first",
    score: 4.4,
    aiPartnered: true,
  },
];

const Results = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const [matches, setMatches] = useState<Outlet[]>([]);

  useEffect(() => {
    setMatches(dummyOutlets); // Simulate match fetch
  }, []);

  const handleExportCSV = () => {
    // Export to CSV logic placeholder
    alert("Export CSV functionality goes here.");
  };

  return (
    <>
      <Navbar />
      <Box className={classes.body}>
        <Typography variant="h5" className={classes.title}>
          Top Matching Outlets
        </Typography>

        {matches.map((outlet, index) => (
          <Card key={index} className={classes.cardbody}>
            <CardContent className={classes.cardcontent}>
              <Typography variant="h6" className={classes.name}>
                {outlet.name}
              </Typography>
              <a
                href={outlet.url}
                className="text-blue-600"
                target="_blank"
                rel="noreferrer"
              >
                Visit Website
              </a>
              <Typography className={classes.guide}>
                {outlet.guidelines}
              </Typography>
              <Typography className={classes.score}>
                Fit Score:
                <span style={{ color: "#fbbf24", fontSize: "1.1rem" }}>
                  {"★".repeat(Math.round(outlet.score))}
                </span>
              </Typography>
              {outlet.aiPartnered && (
                <Tooltip
                  title={
                    <Typography sx={{ fontSize: "1rem", padding: 1 }}>
                      {/* <strong>AI Partnered:</strong> */}
                      Cited by AI tools for extra reach.
                    </Typography>
                  }
                  arrow
                  componentsProps={{
                    tooltip: {
                      className: classes.customTooltip,
                    },
                  }}
                >
                  <Typography className={classes.tooltip}>
                    ✓ AI Partnered
                  </Typography>
                </Tooltip>
              )}
            </CardContent>
          </Card>
        ))}

        <Box className={classes.actionButtons}>
          <Button
            variant="outlined"
            color="primary"
            className={classes.exportcsvButton}
            onClick={handleExportCSV}
          >
            Export as CSV
          </Button>

          <Button
            variant="text"
            color="secondary"
            onClick={() => navigate("/")}
            className={classes.backHomeButton}
          >
            ← Back to Home
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Results;
