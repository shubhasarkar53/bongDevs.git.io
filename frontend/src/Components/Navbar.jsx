import React, { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { Avatar, Container, MenuItem, Select } from "@mui/material";

function Navbar({ userEmail, onLogout, isAuthenticated, role ,setRole}) {
  const navigateTo = useNavigate();
  // Default to user

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };


  return (
    <>
      <Container sx={{ padding: "0", marginBottom: "2em" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingBlock: "0.5em",
          }}
        >
          <h1
            className="logo"
            variant="heading"
            onClick={() => navigateTo("/")}
          >
            BongDevs
          </h1>

          <Stack spacing={2} direction="row">
            {isAuthenticated ? (
              <>
                {role === "admin" && (
                  <>
                    <Button onClick={() => navigateTo("/new-course")}>
                      Add Course
                    </Button>

                    <Button onClick={() => navigateTo("/courses")}>
                      Your Courses
                    </Button>
                  </>
                )}
                {role === "user" && (
                  <>
                    <Button onClick={() => navigateTo("/purchased-courses")}>
                      Purchased Courses
                    </Button>
                  </>
                )}

                <Button variant="outlined" onClick={onLogout}>
                  LogOut
                </Button>
                <Avatar
                  sx={{ bgcolor: "primary.main" }}
                  alt={userEmail}
                  onClick={() => navigateTo("/admin/profile")}
                >
                  {userEmail && userEmail.charAt(0).toUpperCase()}
                </Avatar>
              </>
            ) : (
              <>
                <Select
                  value={role}
                  onChange={handleRoleChange}
                  sx={{ minWidth: 90 , maxHeight:40}}
                >
                  <MenuItem value="user">User</MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
                </Select>
                <Button
                  variant="contained"
                  onClick={() => navigateTo("/signup")}
                >
                  Signup
                </Button>
                <Button variant="outlined" onClick={() => navigateTo("/login")}>
                  Login
                </Button>
              </>
            )}
          </Stack>
        </div>
      </Container>
    </>
  );
}

export default Navbar;
