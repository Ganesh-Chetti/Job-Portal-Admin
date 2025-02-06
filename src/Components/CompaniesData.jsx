import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  CircularProgress,
  TableContainer,
  Paper,
  Box,
} from "@mui/material";
import axios from "axios";

const Companies = () => {
  const [companies, setCompanies] = useState([]); // State for companies data
  const [loading, setLoading] = useState(false); // State for loading indicator

  // Fetch companies from the API
  const fetchCompanies = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "https://job-portal-backend-black.vercel.app/admin/companies",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCompanies(response.data || []); // Set companies data
    } catch (error) {
      console.error("Error fetching companies:", error.response?.data || error.message);
      alert("Failed to fetch companies. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Delete a company
  const handleDeleteCompany = async (id) => {
    if (!window.confirm("Are you sure you want to delete this company?")) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`https://job-portal-backend-black.vercel.app/admin/companies/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCompanies(); // Refresh the list after deletion
      alert("Company deleted successfully.");
    } catch (error) {
      console.error("Error deleting company:", error.response?.data || error.message);
      alert("Failed to delete company. Please try again.");
    }
  };

  // Fetch companies data when the component mounts
  useEffect(() => {
    fetchCompanies();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom align="center" color="primary">
        Companies
      </Typography>
      
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
          <CircularProgress />
        </Box>
      ) : companies.length === 0 ? (
        <Typography align="center">No companies found.</Typography>
      ) : (
        <TableContainer component={Paper} sx={{ maxHeight: 400, overflow: "auto" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Company Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {companies.map((company) => (
                <TableRow key={company.id}>
                  <TableCell>{company._id}</TableCell>
                  <TableCell>{company.companyName}</TableCell>
                  <TableCell>{company.companyEmail}</TableCell>
                  <TableCell>{company.location}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => handleDeleteCompany(company._id)}
                      color="error"
                      variant="outlined"
                      size="small"
                      sx={{
                        ":hover": { backgroundColor: "#f44336", color: "#fff" },
                      }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default Companies;
