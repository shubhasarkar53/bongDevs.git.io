import { Box, Container, Grid, Paper, styled, Typography } from "@mui/material";
import CourseCard from "./CourseCard";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../config";

function Courses({ role }) {
  const [courseArr, setCourseArr] = useState([]);

  const navigateTo = useNavigate();

  async function fetchCourses() {
    try {
      const config = {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      };

      if (role === "admin") {
        const resp = await axios.get(`${BASE_URL}/admin/courses`, config);

        const data = resp.data.allCourses;

        console.log(data);
        setCourseArr(data);
      } else {
        const resp = await axios.get(`${BASE_URL}/users/courses`, config);
        const data = resp.data.courses;
        console.log("data is" + data);
        setCourseArr(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchCourses();
  }, []);

  function handleDelete(courseId) {
    setCourseArr(courseArr.filter((course) => course._id !== courseId));
  }

  return (
    <>
      {!courseArr ? (
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
          <Container>
            <Box sx={{ flexGrow: 1 }}>
              <Typography textAlign={"center"} variant="h4">
                Our Courses
              </Typography>
            </Box>
          </Container>

          <Container>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2} padding={"2em"}>
                {courseArr.map((course) => {
                  return (
                    <Grid key={course._id} xs={12} sm={6} md={4} lg={3} item>
                      <CourseCard
                        course={course}
                        role={role}
                        published={course.published}
                        onDelete={handleDelete}
                      />
                    </Grid>
                  );
                })}
              </Grid>
            </Box>
          </Container>

          <Footer></Footer>
        </>
      )}
    </>
  );
}

export default Courses;
