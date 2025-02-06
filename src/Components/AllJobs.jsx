import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  CircularProgress,
  Grid,
  Paper,
  Box,
  useTheme,
  useMediaQuery
} from "@mui/material";
import axios from "axios";

const Jobs = () => {
  const [jobs, setJobs] = useState([]); // State for jobs data
  const [loading, setLoading] = useState(false); // State for loading indicator
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Detect if it's a mobile screen

  // Fetch jobs from the API
  const fetchJobs = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "https://job-portal-backend-black.vercel.app/admin/jobs",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setJobs(response.data || []); // Set jobs data
    } catch (error) {
      console.error("Error fetching jobs:", error.response?.data || error.message);
      alert("Failed to fetch jobs. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch jobs data when the component mounts
  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <Container maxWidth="lg">
      <Box sx={{ marginBottom: 4 }}>
        <Typography variant="h4" gutterBottom align="center" color="primary">
          Job Listings
        </Typography>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center">
          <CircularProgress />
        </Box>
      ) : jobs.length === 0 ? (
        <Typography variant="h6" align="center">
          No jobs found.
        </Typography>
      ) : (
        <Paper elevation={3} sx={{ padding: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box sx={{ overflowX: "auto" }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align={isMobile ? "left" : "center"}>ID</TableCell>
                      <TableCell align={isMobile ? "left" : "center"}>Job Title</TableCell>
                      <TableCell align={isMobile ? "left" : "center"}>Location</TableCell>
                      <TableCell align={isMobile ? "left" : "center"}>Company Name</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {jobs.map((job) => (
                      <TableRow key={job._id}>
                        <TableCell align={isMobile ? "left" : "center"}>{job._id}</TableCell>
                        <TableCell align={isMobile ? "left" : "center"}>{job.title}</TableCell>
                        <TableCell align={isMobile ? "left" : "center"}>{job.location}</TableCell>
                        <TableCell align={isMobile ? "left" : "center"}>
                          {job?.company?.companyName}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      )}
    </Container>
  );
};

export default Jobs;
