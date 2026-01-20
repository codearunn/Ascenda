import {Routes, Route} from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./components/protectedRoute";

function App() {
  return (
    <div >
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<Signup/>} />

       {/* Protected wrapper */}
      <Route element={<ProtectedRoute/>}>
        {/* All routes here require isLoggedIn === true */}
        <Route path="/dashboard" element={<Dashboard/>} />
      </Route>
    </Routes>
    </div>
  )
}

export default App
