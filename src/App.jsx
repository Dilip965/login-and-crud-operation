import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Careers  from "./pages/career";
import Login from "./login/login";
import Signup from "./signup";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/careers" element={<Careers />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

      </Routes>
    </Router>
  );
}

export default App;
