import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import PrivateRoute from "./components/routes/Private";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<PrivateRoute />}>
          <Route path="" element={<HomePage />} />
        </Route>
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
