import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { useState } from "react";
import { User } from "./types";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

const App = () => {
  //signin at the app level
  //user info is stored here and passed down
  //on logout is

  const [user, setUser] = useState<User | null>(null);

  return (
    <>
      <Router>
        <Header user={user} setUser={setUser} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/reset-password/:resetToken"
            element={<ResetPassword />}
          />
          <Route path="/login" element={<Login setUser={setUser} />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
