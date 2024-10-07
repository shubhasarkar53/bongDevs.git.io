import React, { useEffect, useState } from "react";

import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../config";

function Login({handleLoginProp,setIsAuthenticated,role}) {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigateTo = useNavigate();

  // Check for token when the component mounts
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // If token exists, redirect to home page
      navigateTo("/");
    }
  }, [navigateTo]);



  async function handleLogin() {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          username: email,
          password: password,
        }
      };
  
      const response = await axios.post(`${BASE_URL}/${role==="admin"?"admin":"users"}/login`, {}, config);
  
      const data = response.data;
  

  
      handleLoginProp(data.token);
      // setIsAuthenticated(true);
  
    } catch (error) {
      alert('Login failed');
      setIsAuthenticated(false);
    }
  }
  

  return (
    <>
      <Container maxWidth="sm">
        <div className="form" style={{ margin: "0 auto" }}>
          <Card
            variant="outlined"
            style={{ padding: "2em", marginBlock: "4em" }}
          >
            <div className="headings" style={{ textAlign: "center" }}>
              <Typography className="form-heading" variant="h4" gutterBottom>
                Welcome Back to BongDevs!
              </Typography>
              <Typography
                variant="subtitle1"
                gutterBottom
                style={{ marginBottom: "1em" }}
              >
                Login using Email and Password
              </Typography>
            </div>
            <Stack spacing={2} direction="column">
              <TextField
                id="outlined-basic"
                label="Username"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <OutlinedInput
                placeholder="Password"
                id="outlined-adornment-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </Stack>

            <Button
              variant="outlined"
              color="success"
              fullWidth
              style={{ marginBlock: "1em" }}
              onClick={handleLogin}
            >
              Login
            </Button>
          </Card>
        </div>
      </Container>
    </>
  );
}

export default Login;
