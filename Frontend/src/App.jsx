import NavBar from "./components/navbar/BlogNavbar";
import Footer from "./components/footer/Footer";
import Home from "./views/home/Home";
import Profile from "./components/profile/Profile"
import NewBlogPost from "./views/new/New";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { BlogPostProvider } from "./contexts/BlogPostContext";
import AuthProvider from "./contexts/AuthContext";
import BlogPostDetail from "./views/blog/BlogPostDetail";
import Login from "./components/login/Login";
import SignUp from "./components/signUp/SignUp"
function App() {
  return (
    <AuthProvider>
      <BlogPostProvider>
        <Router>
          <NavBar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp/>} />
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/blogPosts/:id" element={<BlogPostDetail />} />
            <Route path="/new" element={<NewBlogPost />} />
          </Routes>
          <Footer />
        </Router>
      </BlogPostProvider>
    </AuthProvider>
  );
}

export default App;
