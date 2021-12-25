import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";

import Login from "./pages/Login";
import Home from "./pages/Home";

import { getUserInfo } from "./utils/fetchLocalStorage";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = getUserInfo();

    if (!user) {
      navigate("/login");
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
