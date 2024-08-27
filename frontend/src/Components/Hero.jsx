import React from "react";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import heroImg from "../assets/images/Home/hero.jpg";
import { useNavigate } from "react-router-dom";

function Hero() {


  const navigateTo = useNavigate();

  return (
    <Box 
      sx={{
        py: 8,
        backgroundColor: "background.default",
        color: "text.primary",
        maxWidth:"100%"
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={4}
          alignItems="center"
          justifyContent="space-between"
        >
          <Box 
            sx={{ 
              width: { xs: "100%", md: "50%" }, 
              textAlign: { xs: "center", md: "left" } 
            }}
          >
            <Typography 
              variant="h3" 
              component="h1" 
              gutterBottom 
              sx={{ fontWeight: "bold" }}
            >
              Learn More Skills,
            </Typography>
            <Typography 
              variant="h4" 
              component="h2" 
              color="primary"
              gutterBottom 
              sx={{ fontWeight: "bold" }}
            >
              Be More Competitive with <span>BongDevs</span>
            </Typography>
            <Typography 
              variant="subtitle1" 
              color="text.secondary" 
              paragraph
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Reiciendis perferendis assumenda incidunt et nostrum aperiam ea
              sed adipisci distinctio dolorum tempora cum officiis a architecto,
              aliquid, non, totam quaerat.
            </Typography>
            <Stack 
              direction="row" 
              spacing={2} 
              sx={{ justifyContent: { xs: "center", md: "flex-start" } }}
            >
              <Button 
                variant="contained" 
                size="large" 
                onClick={() => navigateTo("/courses")}
              >
                Our Courses
              </Button>
              <Button 
                variant="outlined" 
                size="large" 
                onClick={() => navigateTo("/about-us")}
              >
                About Us
              </Button>
            </Stack>
          </Box>
          <Box 
            sx={{ 
              width: { xs: "100%", md: "50%" }, 
              display: "flex", 
              justifyContent: "center" 
            }}
          >
            <img
              src={heroImg}
              alt="hero image"
              style={{ 
                width: "100%", 
                maxWidth: "450px", 
                borderRadius: "15px", 
                objectFit: "cover" 
              }}
            />
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}

export default Hero;
