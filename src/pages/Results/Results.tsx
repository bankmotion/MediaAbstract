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
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import useStyles from "./styles";
import Navbar from "../../components/Navbar/Nabvar";

interface Outlet {
  name: string;
  url: string;
  contactEmail: string;
  matchConfidence: number;
  aiPartnered: boolean;
}

const dummyOutlets: Outlet[] = [
  {
    name: "Forbes",
    url: "https://www.forbes.com",
    contactEmail: "letters@forbes.com",
    matchConfidence: 85,
    aiPartnered: true,
  },
  {
    name: "The Wall Street Journal",
    url: "https://www.wsj.com/articles/oped-guidelines-for-the-wall-street-journal-1384383173",
    contactEmail: "wsjcontact@wsj.com",
    matchConfidence: 82,
    aiPartnered: true,
  },
  {
    name: "Harvard Business Review",
    url: "https://hbr.org/submitters",
    contactEmail: "submit@hbr.org",
    matchConfidence: 79,
    aiPartnered: false,
  },
  {
    name: "Inc42",
    url: "https://inc42.com/startup-submission/",
    contactEmail: "editorial@inc42.com",
    matchConfidence: 73,
    aiPartnered: false,
  },
  {
    name: "Wired",
    url: "https://www.wired.com/about/how-to-pitch-stories-to-wired/",
    contactEmail: "pitch@wired.com",
    matchConfidence: 80,
    aiPartnered: true,
  },
];

const Results = () => {
  const { classes } = useStyles();
  const [matches, setMatches] = useState<Outlet[]>([]);

  useEffect(() => {
    setMatches(dummyOutlets); // Simulate match fetch
  }, []);

  const handleExportCSV = () => {
    const headers = [
      "Outlet",
      "Contact Email",
      "Pitch Link",
      "Match Confidence",
    ];
    const rows = matches.map((outlet) => [
      outlet.name,
      outlet.contactEmail,
      outlet.url,
      `${outlet.matchConfidence}%`,
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

  return (
    <>
      <Navbar />
      <Box className={classes.body}>
        <Typography variant="h5" className={classes.title}>
          Top Matching Outlets
        </Typography>

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
              {matches.map((outlet, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Box display="flex" flexDirection="column">
                      <Typography>{outlet.name}</Typography>
                      {outlet.aiPartnered && (
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
                  <TableCell>{outlet.contactEmail}</TableCell>
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
                  <TableCell>{outlet.matchConfidence}% Match</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

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
      </Box>
    </>
  );
};

export default Results;
