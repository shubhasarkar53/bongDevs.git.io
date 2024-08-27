import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Grid,
  Typography,
  Switch,
  FormControlLabel,
  Paper,
} from "@mui/material";
import axios from "axios";
import { BASE_URL } from "../config";
import { useNavigate } from "react-router-dom";

function CreateCourse() {
  const navigateTo = useNavigate();
  const [formValues, setFormValues] = useState({
    title: "",
    description: "",
    price: "",
    imageLink: "",
    published: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormValues({
      ...formValues,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      };
      await axios.post(`${BASE_URL}/admin/courses`, formValues, config);
      alert("Course created successfully!");
    } catch (error) {
      console.error("Error creating course:", error);
      alert("Failed to create course. Please try again.");
      navigateTo("/new-course");
    }
  };

  return (
    <>
      <Container maxWidth="sm">
        <Paper elevation={3} style={{ padding: "2em", marginTop: "2em" }}>
          <Typography variant="h4" align="center" gutterBottom>
            Create New Course
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Title"
                  variant="outlined"
                  fullWidth
                  name="title"
                  value={formValues.title}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Description"
                  variant="outlined"
                  fullWidth
                  name="description"
                  value={formValues.description}
                  onChange={handleChange}
                  required
                  multiline
                  rows={4}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Price"
                  variant="outlined"
                  fullWidth
                  name="price"
                  type="number"
                  value={formValues.price}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Image Link"
                  variant="outlined"
                  fullWidth
                  name="imageLink"
                  value={formValues.imageLink}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formValues.published}
                      onChange={handleChange}
                      name="published"
                      color="primary"
                    />
                  }
                  label="Published"
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Create Course
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </>
  );
}

export default CreateCourse;
