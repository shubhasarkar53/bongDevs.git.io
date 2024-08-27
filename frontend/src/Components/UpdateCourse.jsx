import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Switch,
  FormControlLabel,
  Container,
} from "@mui/material";
import CourseCard from "./CourseCard";
import axios from "axios";
import { BASE_URL } from "../config";
import { useNavigate, useParams } from "react-router-dom";

const UpdateCourse = () => {

    const navigateTo = useNavigate();
  const { id } = useParams();

  const [course, setCourse] = useState({
    title: "",
    description: "",
    price: 0,
    imageLink: "",
    published: false,
  });

  useEffect(() => {
    // Fetch the course details when the component mounts
    async function fetchCourseDetails() {
      try {
        const response = await axios.get(`${BASE_URL}/courses/${id}`, {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        setCourse(response.data.course);
      } catch (error) {
        console.error("Failed to fetch course details:", error);
      }
    }

    fetchCourseDetails();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourse((prevCourse) => ({
      ...prevCourse,
      [name]: value,
    }));
  };

  const handleSwitchChange = (e) => {
    setCourse((prevCourse) => ({
      ...prevCourse,
      published: e.target.checked,
    }));
  };

  const handleUpdateCourse = async () => {
    try {
      const response = await axios.put(
        `${BASE_URL}/admin/courses/${id}`,
        course,
        {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      alert("Course updated successfully")
      console.log("Course updated successfully:", response.data);
      navigateTo("/courses");
    } catch (error) {
      console.error("Failed to update course:", error);
    }
  };

  return (
    <>
      <Container maxWidth={"lg"}>
        <Grid container spacing={10} >
          {/* Form Section */}
          <Grid item xs={12} md={6}>
            <Box component="form" noValidate autoComplete="off">
              <Typography variant="h5" gutterBottom>
                Update Course
              </Typography>
              <TextField
                fullWidth
                label="Title"
                name="title"
                value={course.title}
                onChange={handleInputChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={course.description}
                onChange={handleInputChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Price"
                name="price"
                type="number"
                value={course.price}
                onChange={handleInputChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Image Link"
                name="imageLink"
                value={course.imageLink}
                onChange={handleInputChange}
                margin="normal"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={course.published}
                    onChange={handleSwitchChange}
                    name="published"
                    color="primary"
                  />
                }
                label="Published"
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleUpdateCourse}
              >
                Update Course
              </Button>
            </Box>
          </Grid>

          {/* Preview Section */}
          <Grid item xs={12} md={6} >
            <Typography variant="h6" gutterBottom>
              Preview
            </Typography>
            <CourseCard
              course={course}
              role="admin"
              published={course.published}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default UpdateCourse;
