// src/pages/Auth/LoginPage.tsx
import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/controllers/authController";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const data = await loginUser(email, password);
      localStorage.setItem("authToken", data.token);
      navigate("/");
    } catch (err: any) {
      setError(err.message || "Login failed. Please try again.");
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      p={2}
    >
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <Box component="form" onSubmit={handleSubmit} width="300px">
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
          fullWidth
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
          fullWidth
        />
        {error && (
          <Typography color="error" variant="body2" mt={1}>
            {error}
          </Typography>
        )}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default LoginPage;
