import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Nabvar";
// import { fetchResults } from "../../services/api";

import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

import useStyles from "./styles";

// interface Outlet {
//   name: string;
//   url: string;
//   contactEmail: string;
//   matchConfidence: number;
//   aiPartnered: boolean;
// }

// const dummyOutlets: Outlet[] = [
//   {
//     name: "TIME",
//     url: "https://time.com/section/opinion/",
//     contactEmail: "opinion@time.com",
//     matchConfidence: 85,
//     aiPartnered: true,
//   },
//   {
//     name: "The Wall Street Journal",
//     url: "https://www.wsj.com/articles/oped-guidelines-for-the-wall-street-journal-1384383173",
//     contactEmail: "wsjcontact@wsj.com",
//     matchConfidence: 82,
//     aiPartnered: true,
//   },
//   {
//     name: "Harvard Business Review",
//     url: "https://hbr.org/guidelines-for-authors-hbr&gt",
//     contactEmail: "submit@hbr.org",
//     matchConfidence: 79,
//     aiPartnered: false,
//   },
//   {
//     name: "Inc42",
//     url: "https://inc42.com/startup-submission/",
//     contactEmail: "editorial@inc42.com",
//     matchConfidence: 73,
//     aiPartnered: false,
//   },
//   {
//     name: "Wired",
//     url: "https://www.wired.com/about/how-to-pitch-stories-to-wired/",
//     contactEmail: "pitch@wired.com",
//     matchConfidence: 80,
//     aiPartnered: true,
//   },
// ];

const Results = () => {
  const { classes } = useStyles();
  const location = useLocation();

  const results = useSelector((state: RootState) => state.pitch.results);
  console.log("Results:", results);
  const status = useSelector((state: RootState) => state.pitch.status);

  // const [matches, setMatches] = useState<Outlet[]>([]);
  const navigate = useNavigate();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [role, setRole] = useState("");

  // useEffect(() => {
  //   setMatches(dummyOutlets); // Simulate match fetch
  // }, []);

  // useEffect(() => {
  //   fetchResults().then(setMatches);
  // }, []);

  const handleExportCSV = () => {
    const headers = [
      "Outlet",
      "Contact Email",
      "Pitch Link",
      "Match Confidence",
    ];
    const rows = results.map((outlet) => [
      outlet.name,
      outlet.contact_email,
      outlet.url,
      `${outlet.match_confidence}%`,
    ]);

    const footer = [
      [],
      [
        `Generated by WriteFor.co—Submit your next pitch idea at https://media-abstract.vercel.app/ to get fresh matches!`,
      ],
    ];

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows, ...footer].map((e) => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "matched_outlets.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleGoToDashboard = () => {
    if (role === "writers") {
      navigate("/writers/dashboard");
    } else if (role === "agencies") {
      navigate("/agencies/dashboard");
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    if (location.state?.role) {
      setRole(location.state.role);
    }
  }, [location.state]);

  return (
    <>
      <Navbar />
      <Box className={classes.body}>
        <Typography variant="h5" className={classes.title}>
          Top Matching Outlets
        </Typography>

        {isMobile ? (
          // Mobile: Show stacked cards
          <Box className={classes.mobileList}>
            {results.map((outlet, index) => (
              <Paper key={index} className={classes.mobileCard}>
                <Typography className={classes.name}>{outlet.name}</Typography>
                {outlet.ai_partnered === "Yes" && (
                  <Tooltip title="Cited by AI tools for extra reach." arrow>
                    <span className={classes.tooltip}>✓ AI Partnered</span>
                  </Tooltip>
                )}
                <Typography className={classes.guide}>
                  Contact: {outlet.contact_email}
                </Typography>
                <Typography className={classes.score}>
                  {outlet.match_confidence}% Match
                </Typography>
                <a
                  href={outlet.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 underline"
                >
                  View Pitch Link
                </a>
              </Paper>
            ))}
          </Box>
        ) : (
          // Desktop: Show table
          <TableContainer component={Paper} className={classes.tableContainer}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className={classes.tableCell}>
                    <strong>Outlet</strong>
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    <strong>Contact Email (C)</strong>
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    <strong>Pitch Link (B)</strong>
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    <strong>Match Confidence</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {results.map((outlet, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Box display="flex" flexDirection="column">
                        <Typography>{outlet.name}</Typography>
                        {outlet.ai_partnered === "Yes" && (
                          <Tooltip
                            title="Cited by AI tools for extra reach."
                            arrow
                            componentsProps={{
                              tooltip: { className: classes.customTooltip },
                            }}
                          >
                            <span className={classes.tooltip}>
                              {" "}
                              ✓ AI Partnered
                            </span>
                          </Tooltip>
                        )}
                      </Box>
                    </TableCell>
                    <TableCell>{outlet.contact_email}</TableCell>
                    <TableCell>
                      <a
                        href={outlet.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 underline"
                      >
                        View Pitch Link
                      </a>
                    </TableCell>
                    <TableCell>{outlet.match_confidence}% Match</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        <Box className={classes.actionButtons}>
          <Button
            variant="outlined"
            color="primary"
            className={classes.exportcsvButton}
            onClick={handleExportCSV}
          >
            Export as CSV
          </Button>
        </Box>

        <Box className={classes.actionButtons}>
          <Button
            variant="contained"
            color="primary"
            className={classes.exportcsvButton}
            onClick={() => navigate("/onboarding")}
          >
            Pitch Again
          </Button>

          <Button
            variant="text"
            color="secondary"
            className={classes.backHomeButton}
            onClick={handleGoToDashboard}
          >
            Go to Dashboard
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Results;
