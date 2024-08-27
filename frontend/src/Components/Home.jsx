import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Hero from "./Hero";
import CourseCard from "./CourseCard";

import axios from "axios";
import { BASE_URL } from "../config";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";




function Home() {

    const [courseArr,setCourseArr] = useState([]);
    const navigateTo = useNavigate();


  async function fetchCourses() {
    try {

      const config = {
        headers:{
          authorization:"Bearer " + localStorage.getItem("token")
        }
      }
      const resp = await axios.get(`${BASE_URL}/users/courses`,config);

      const data = resp.data.courses;

      // get only the first 3 courses
      const firstThree = data.slice(0,3);
      console.log(firstThree);

      setCourseArr(firstThree);
      
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
      fetchCourses();
  }, []);


  return (
    <>
        <Hero />
      <Container maxWidth="lg">
        <Typography
          variant="h5"
          color="text.primary"
          style={{
            fontWeight: "500",
            marginBlock: "1em",
            textAlign: "center",
            textTransform: "uppercase",
          }}
        >
          Explore Popular Courses
        </Typography>

        <Grid container spacing={2} justifyContent={"center"}>
          {courseArr.map((course) => { 
            return (
              <Grid key={course._id} xs={12} sm={6} md={4} lg={3} item >
                <CourseCard course={course}  />
              </Grid>
            );
          })}
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default Home;
