import React, { useEffect, useState } from "react";
import { Box, Container, Grid, Typography, Button, CircularProgress } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../config";
import Footer from "./Footer";

const CourseDetails = () => {

  const navigateTo = useNavigate()

  const [course, setCourse] = useState(null);

  const { id } = useParams();

  async function getCourse(id) {
    try {
      const config = {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      };

      const resp = await axios.get(`${BASE_URL}/courses/${id}`, config);

      const data = resp.data.course;

      console.log(data);
      setCourse(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getCourse(id);
  }, [id]);

  return (
    <>
      {!course ? (
         <Box
         display="flex"
         justifyContent="center"
         alignItems="center"
         height="100vh"
       >
         <CircularProgress />
       </Box>
      ) : (
        <>
        
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            {/* Left Side: Course Image */}
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src={course.imageLink}
                alt={course.title}
                sx={{
                  width: "100%",
                  borderRadius: "8px",
                  boxShadow: 3,
                }}
              />
            </Grid>

            {/* Right Side: Course Details */}
            <Grid item xs={12} md={6}>
              <Typography variant="h4" gutterBottom>
                {course.title}
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                {course.description}
              </Typography>
              <Typography
                variant="h5"
                color="primary"
                sx={{ fontWeight: "bold" }}
              >
                Rs. {course.price}
              </Typography>
              <Box mt={4}>
                <Button variant="contained" color="primary" size="large" onClick={() => navigateTo(`/course-checkout/${course._id}`)} >
                  Enroll Now
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>

        <Footer/>
        </>
      )}
    </>
  );
};

export default CourseDetails;
