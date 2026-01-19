import {Routes, Route} from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <div >
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/Signup" element={<Signup/>} />
      <Route path="/Dashboard" element={<Dashboard/>} />
    </Routes>
    </div>
  )
}

export default App
