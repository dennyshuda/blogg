import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import CreatePost from "./pages/CreatePost";
import Nav from "./components/Nav";
import Layout from "./components/Layout";
import { signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "./config/firebase";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  function storeLogin() {
    const stored = localStorage.getItem("login");
    if (!stored) {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
  }

  useEffect(() => {
    storeLogin();
  }, []);

  function signOutWithGoogle() {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsLogin(false);
      navigate("/login");
    });
  }

  return (
    <Layout>
      <Nav isLogin={isLogin} signOutWithGoogle={signOutWithGoogle} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setIsLogin={setIsLogin} />} />
        <Route path="/createpost" element={<CreatePost isLogin={isLogin} />} />
      </Routes>
    </Layout>
  );
}

export default App;
