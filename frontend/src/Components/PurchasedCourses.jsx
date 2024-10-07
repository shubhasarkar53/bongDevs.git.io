import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { BASE_URL } from "../config";

const PurchasedCourses = () => {
  const [purchasedCourses, setPurchasedCourses] = useState([]);

  async function fetchPurchasedCourses() {
    try {
      const config = {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      };

      const resp = await axios.get(
        `${BASE_URL}/users/courses/purchased`,
        config
      );
      const data = resp.data.courses;

      setPurchasedCourses(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchPurchasedCourses();
  }, []);

  return (
    <>
      {
        
        <Container maxWidth="lg">
        <Typography variant="h4" gutterBottom textAlign="center">
          Purchased Courses
        </Typography>
        <Grid container spacing={4}>
          {purchasedCourses ? (
            purchasedCourses.map((course) => (
              <Grid item xs={12} sm={6} md={4} key={course._id}>
                <Card sx={{ borderRadius: "15px" }}>
                  <CardMedia
                    component="img"
                    height="160"
                    sx={{ borderRadius: "15px 15px 0 0" }}
                    image={course.imageLink}
                    alt={course.title}
                  />
                  <CardContent>
                    <Typography variant="h5" component="div">
                      {course.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {course.description}
                    </Typography>
                    <Typography
                      variant="h6"
                      color="primary"
                      sx={{ fontWeight: "bold", marginTop: "0.5em" }}
                    >
                      Rs. {course.price}
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ marginTop: "1em" }}
                    >
                      Start Course
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Container>
              <Typography
                variant="body1"
                color="text.secondary"
                textAlign="center"
                style={{ width: "100%", marginBlock: "3rem" }}
              >
                You haven't purchased any courses yet.
              </Typography>
            </Container>
          )}
        </Grid>
      </Container>
      }
    </>
  );
};

export default PurchasedCourses;
