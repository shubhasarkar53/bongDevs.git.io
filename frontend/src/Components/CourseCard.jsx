import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import { Chip } from "@mui/material";
import axios from "axios";
import { BASE_URL } from "../config";
const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 345,
  borderRadius: "15px",
  boxShadow: theme.shadows[5],
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: theme.shadows[10],
  },
}));

const StyledCardMedia = styled(CardMedia)({
  height: 160,
  borderRadius: "15px 15px 0 0",
});

const StyledButton = styled(Button)({
  fontWeight: 600,
});

export default function CourseCard({ course, role, published, onDelete }) {
  const navigateTo = useNavigate();
  // const [editingCourse, setEditingCourse] = useState({})
  async function handleDelete() {
    try {
      const config = {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      };

      const resp = await axios.delete(
        `${BASE_URL}/admin/courses/${course._id}`,
        config
      );
      const data = resp.data;
      console.log(data);
      onDelete(course._id);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <StyledCard>
        <Link style={{ textDecoration: "none" }} to={`/course/${course._id}`}>
          <StyledCardMedia image={course.imageLink} title={course.title} />
        </Link>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div"  sx={{
              marginBottom: "1em",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}>
            {course.title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              marginBottom: "1em",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {course.description}
          </Typography>
          <Typography
            variant="h5"
            color="text.primary"
            sx={{ fontWeight: 600 }}
          >
            Rs.{course.price}
          </Typography>
          {role == "admin" && (
            <Chip
              label={published ? "Published" : "Unpublished"}
              color={published ? "success" : "default"}
              sx={{ marginTop: "1em" }}
            />
          )}
        </CardContent>
        <CardActions
          sx={{ justifyContent: "space-between", padding: "0 1em 1em" }}
        >
          {role === "admin" ? (
            <>
              <StyledButton
                variant="contained"
                size="small"
                color="primary"
                onClick={() => navigateTo(`/update-course/${course._id}`)}
              >
                Update
              </StyledButton>
              <StyledButton
                variant="outlined"
                size="small"
                color="secondary"
                onClick={handleDelete}
              >
                Delete
              </StyledButton>
            </>
          ) : (
            <>
              <StyledButton variant="contained" size="small" color="primary"  onClick={() => navigateTo(`/course-checkout/${course._id}`)}>
                Buy Now
              </StyledButton>
              <StyledButton variant="outlined" size="small" color="secondary">
                Learn More
              </StyledButton>
            </>
          )}
        </CardActions>
      </StyledCard>
    </>
  );
}
