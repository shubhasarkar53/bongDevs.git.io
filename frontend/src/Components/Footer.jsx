import React from "react";
import { Box, Container, Grid, Typography, Link } from "@mui/material";

function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: "#f8f8f8",
        padding: "20px 0",
        borderTop: "1px solid #ddd",
        marginTop: "20px",
      }}
    >
      <Container maxWidth="lg" >
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h5" gutterBottom>
              BongDevs
            </Typography>
            <Typography variant="body2" color="text.secondary">
              The best place to enhance your skills and knowledge with our wide range of online courses.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom color="text.secondary" >
              Quick Links
            </Typography>
            <Link href="/" color="inherit" underline="none" display="block" sx={{ marginBottom: 1 }}>
              Home
            </Link>
            <Link href={"/courses"} color="inherit" underline="none" display="block" sx={{ marginBottom: 1 }}>
              Courses
            </Link>
            <Link href="/about" color="inherit" underline="none" display="block" sx={{ marginBottom: 1 }}>
              About Us
            </Link>
            <Link href="/contact" color="inherit" underline="none" display="block">
              Contact
            </Link>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom color="text.secondary">
              Follow Us
            </Typography>
            <Link href="https://www.facebook.com" target="_blank" color="inherit" underline="none" display="block" sx={{ marginBottom: 1 }}>
              Facebook
            </Link>
            <Link href="https://www.twitter.com" target="_blank" color="inherit" underline="none" display="block" sx={{ marginBottom: 1 }}>
              Twitter
            </Link>
            <Link href="https://www.linkedin.com" target="_blank" color="inherit" underline="none" display="block" sx={{ marginBottom: 1 }}>
              LinkedIn
            </Link>
            <Link href="https://www.instagram.com" target="_blank" color="inherit" underline="none" display="block">
              Instagram
            </Link>
          </Grid>
        </Grid>
        <Box mt={4} textAlign="center">
          <Typography variant="body2" color="text.secondary">
            &copy; {new Date().getFullYear()} BongDevs. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
