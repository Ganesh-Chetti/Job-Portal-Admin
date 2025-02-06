import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Check if user is logged in by looking for the token in localStorage
  const isLoggedIn = !!localStorage.getItem("token");

  // Links for public users (before login)
  const publicLinks = [
    { label: "Home", path: "/" },
    { label: "Register", path: "/admin/register" },
    { label: "Login", path: "/admin/login" },
  ];

  // Links for logged-in admins (after login)
  const adminLinks = [
    { label: "Home", path: "/" },
    { label: "All Users", path: "/admin/users" },
    { label: "All Companies", path: "/admin/companies" },
    { label: "All Jobs", path: "/admin/jobs" },
  ];

  // Handle menu open and close
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    handleMenuClose();
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#1976d2" }}>
        <Toolbar>
          {/* Mobile Menu Icon */}
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ display: { xs: "block", md: "none" } }}
            onClick={toggleMobileMenu}
          >
            <MenuIcon />
          </IconButton>

          {/* Brand Name */}
          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
              fontWeight: "bold",
              cursor: "pointer",
            }}
            onClick={() => navigate("/")}
          >
            HireHub
          </Typography>

          {/* Desktop Navigation Links */}
          <Box sx={{ display: { xs: "none", md: "block" } }}>
            {isLoggedIn
              ? adminLinks.map((link) => (
                  <Button
                    key={link.path}
                    color="inherit"
                    onClick={() => navigate(link.path)}
                    sx={{ mx: 1 }}
                  >
                    {link.label}
                  </Button>
                ))
              : publicLinks.map((link) => (
                  <Button
                    key={link.path}
                    color="inherit"
                    onClick={() => navigate(link.path)}
                    sx={{ mx: 1 }}
                  >
                    {link.label}
                  </Button>
                ))}
          </Box>

          {/* Profile & Logout Dropdown for Logged-in Users */}
          {isLoggedIn && (
            <>
              <IconButton
                color="inherit"
                onClick={handleMenuOpen}
                sx={{ marginLeft: 2 }}
              >
                <AccountCircleIcon fontSize="large" />
              </IconButton>
              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                <MenuItem onClick={() => { navigate("/admin/profile"); handleMenuClose(); }}>
                  View Profile
                </MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer Menu */}
      <Drawer anchor="left" open={mobileOpen} onClose={toggleMobileMenu}>
        <List sx={{ width: 250 }}>
          {(isLoggedIn ? adminLinks : publicLinks).map((link) => (
            <ListItem button key={link.path} onClick={() => { navigate(link.path); toggleMobileMenu(); }}>
              <ListItemText primary={link.label} />
            </ListItem>
          ))}
          {isLoggedIn && (
            <>
              <ListItem button onClick={() => { navigate("/admin/profile"); toggleMobileMenu(); }}>
                <ListItemText primary="View Profile" />
              </ListItem>
              <ListItem button onClick={handleLogout}>
                <ListItemText primary="Logout" />
              </ListItem>
            </>
          )}
        </List>
      </Drawer>
    </>
  );
};

export default Navbar;
