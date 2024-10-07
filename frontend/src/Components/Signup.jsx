import React, { useEffect, useState } from "react";

import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Container, Typography } from "@mui/material";
import axios from "axios";
import { BASE_URL } from "../config";

function Signup({handleSignupProp,setIsAuthenticated,role}) {
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

async function handleSignup() {
  try {

    const config = { headers: { "Content-type": "application/json" } };
    const response = await axios.post(`${BASE_URL}/${role==="admin"?"admin":"users"}/signup`, {
      username: email,
      password: password,
    }, config);

    const data = response.data;



    handleSignupProp(data.token);
    // setIsAuthenticated(true);

  } catch (error) {
    alert('Signup failed');
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
                Sign up for BongDevs
              </Typography>
              <Typography
                variant="subtitle1"
                gutterBottom
                style={{ marginBottom: "1em" }}
              >
                Create a free account or login
              </Typography>
            </div>
            <Stack spacing={2} direction="column">
              <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                id="outlined-basic"
                label="Password"
                variant="outlined"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Stack>

            <Button
              variant="contained"
              color="success"
              fullWidth
              style={{ marginBlock: "1em" }}
              onClick={handleSignup}
            >
              Signup
            </Button>
          </Card>
        </div>
      </Container>
    </>
  );
}

export default Signup;
