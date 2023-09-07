import "./App.css";
import Users from "./components/Users";
import { Routes, Route } from "react-router-dom";
import Landing from "./components/Landing";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import IsAuthenticated from "./components/IsAuthenticated";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <IsAuthenticated>
              <Users />
            </IsAuthenticated>
          }
        />
        <Route path="/landing" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
