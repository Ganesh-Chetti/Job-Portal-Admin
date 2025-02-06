import React, { useState } from 'react';
import {
    TextField,
    Button,
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    Box
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminRegister = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://job-portal-backend-black.vercel.app/admin/register', formData);
            alert('Admin registered successfully!');
            console.log(response.data);
            navigate('/admin/login');
        } catch (error) {
            console.error(error);
            alert('Error registering admin');
        }
    };

    return (
        <Container maxWidth="sm">
            <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
                <Grid item xs={12} sm={10}>
                    <Card elevation={6} sx={{ borderRadius: 3 }}>
                        <CardContent>
                            <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                                Admin Register
                            </Typography>

                            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                                <TextField
                                    label="Full Name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                    required
                                />
                                <TextField
                                    label="Email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                    type="email"
                                    required
                                />
                                <TextField
                                    label="Password"
                                    name="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                    required
                                />

                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    sx={{
                                        mt: 3,
                                        py: 1.5,
                                        fontSize: '16px',
                                        fontWeight: 'bold',
                                        textTransform: 'none',
                                    }}
                                >
                                    Register
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};

export default AdminRegister;
