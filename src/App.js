import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";

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
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/*" element={<Home />} />
    </Routes>
  );
}

export default App;
