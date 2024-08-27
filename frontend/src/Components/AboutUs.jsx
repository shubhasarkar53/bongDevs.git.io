import React from "react";
import { Container, Grid, Typography, Box, Button } from "@mui/material";

const AboutUs = () => {
  return (
    <Container maxWidth="lg" sx={{ marginTop: 4 }}>
      <Grid container spacing={4} alignItems="center">
       
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            src="https://res.cloudinary.com/dd3sjaumq/image/upload/v1724527606/DALL_E_2024-08-25_00.54.29_-_A_modern_and_clean_logo_design_for_BongDevs_a_company_specializing_in_web_development_technologies._The_logo_should_incorporate_a_tech-savvy_and_in_z4vjed.webp" 
            alt="BongDevs Logo"
            sx={{
              width: "100%",
              borderRadius: "8px",
              boxShadow: 3,
            }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h3" gutterBottom>
            About BongDevs
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            BongDevs is a premier online platform specializing in web development technologies. 
            Our mission is to empower aspiring developers and professionals by providing 
            top-notch courses designed to enhance their skills and knowledge in the ever-evolving 
            world of web development.
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            With a focus on the latest technologies and industry trends, our courses are curated 
            by experts in the field, ensuring that you receive the best learning experience. 
            Whether you’re a beginner or an experienced developer, BongDevs has something to offer 
            for everyone.
          </Typography>
          <Button variant="contained" color="primary" size="large">
            Learn More
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AboutUs;
