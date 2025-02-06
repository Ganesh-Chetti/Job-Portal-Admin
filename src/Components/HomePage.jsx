import React from "react";
import { Box, Typography, Grid, Card, CardContent } from "@mui/material";

const AdminHome = () => {
  // Check if the token exists in localStorage
  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f4f6f8",
        px: 2,
      }}
    >
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={10} md={8} lg={6}>
          <Card elevation={6} sx={{ borderRadius: 3, p: 4, textAlign: "center" }}>
            <CardContent>
              {isLoggedIn ? (
                <>
                  <Typography variant="h3" sx={{ fontWeight: "bold", color: "#1976d2" }}>
                    Welcome, Admin!
                  </Typography>
                  <Typography variant="h6" sx={{ mt: 2, color: "#555" }}>
                    You are now logged in to the admin panel.
                  </Typography>
                </>
              ) : (
                <>
                  <Typography variant="h4" sx={{ fontWeight: "bold", color: "#d32f2f" }}>
                    Welcome to the Admin Portal
                  </Typography>
                  <Typography variant="h6" sx={{ mt: 2, color: "#555" }}>
                    Please register or log in to access the admin panel.
                  </Typography>
                </>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminHome;
