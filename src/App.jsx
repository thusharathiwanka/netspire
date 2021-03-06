import { useEffect, useContext } from "react";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";

import { AuthContext } from "./contexts/AuthContext";
import Home from "./pages/Home";
import Login from "./pages/Login";

import { getUserInfo } from "./utils/fetchLocalStorage";

function App() {
  const { isSigned, setIsSigned } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const user = getUserInfo();

    if (!user) {
      return navigate("/login");
    }

    setIsSigned(true);
  }, []);

  return (
    <Routes>
      <Route path="/login" element={isSigned ? <Navigate to="/" /> : <Login />} />
      <Route path="/*" element={<Home />} />
    </Routes>
  );
}

export default App;
