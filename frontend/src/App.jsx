import { useEffect, useState } from "react";
import "./App.css";
import Courses from "./Components/Courses";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Navbar from "./Components/Navbar";
import Profile from "./Components/Profile";
import Signup from "./Components/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "./config";
import { useNavigate } from "react-router-dom";
import CreateCourse from "./Components/CreateCourse";
import UpdateCourse from "./Components/UpdateCourse";
import CourseDetails from "./Components/CourseDetails";
import CourseCheckout from "./Components/CourseCheckout";
import PurchasedCourses from "./Components/PurchasedCourses";
import Footer from "./Components/Footer";
import AboutUs from "./Components/AboutUs";

function App() {
  const navigateTo = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState("user");
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchUserDetails(token);
    }
  }, []);

  const fetchUserDetails = async (token) => {
    try {
      const response = await axios.get(`${BASE_URL}/${role==="admin"?"admin":"users"}/profile`, {
        headers: {
          authorization: "Bearer " + token,
        },
      });
      setIsAuthenticated(true);

      if (response.data.admin) {
        setRole("admin");
        if (response.data.admin.username) {
          setUserEmail(response.data.admin.username);
        }
      } else {
        setRole("user");
        if(response.data.user.username){
          console.log(  'inside else' + response.data.user.username);
          setUserEmail( response.data.user.username);
        }
      }
      

      navigateTo("/");
    } catch (error) {
      console.log("Error fetching user details", error);
      setIsAuthenticated(false);
      handleLogout();
      navigateTo("/login");
    }
  };

  function handleLogin(token) {
    localStorage.setItem("token", token);
    fetchUserDetails(token);
    navigateTo("/");
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setUserEmail("");
    navigateTo("/login");
  };

  return (
    <>
      <Navbar
        userEmail={userEmail}
        isAuthenticated={isAuthenticated}
        onLogout={handleLogout}
        role={role}
        setRole={setRole}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/signup"
          element={
            <Signup
              role={role}
              handleSignupProp={handleLogin}
              setIsAuthenticated={setIsAuthenticated}
            />
          }
        />
        <Route
          path="/login"
          element={
            <Login
              role={role}
              handleLoginProp={handleLogin}
              setIsAuthenticated={setIsAuthenticated}
            />
          }
        />
        <Route path="/courses" element={<Courses role={role} />} />
        <Route
          path="/admin/profile"
          element={<Profile userEmail={userEmail} />}
        />
        <Route
          path="/new-course"
          element={<CreateCourse />}
        />
        <Route
          path="/update-course/:id"
          element={<UpdateCourse />}
        />
        <Route
          path="/course/:id"
          element={<CourseDetails />}
        />
        <Route
          path="/course-checkout/:id"
          element={<CourseCheckout />}
        />
        <Route
          path="/purchased-courses"
          element={<PurchasedCourses />}
        />
        <Route
            path="/about-us"
          element={<AboutUs/>}
        />
        
      </Routes>
    </>
  );
}

export default App;
