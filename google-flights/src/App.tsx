import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FlightSearch from "./components/FlightSearch";
import { Component as Navbar } from "./components/Navbar";

const App = () => {
  return (
  <>
   <Router>
    <Navbar />
    <Routes>
 
      <Route path='/' element={<FlightSearch/>} />

    </Routes>
   </Router>
  </>
  )
}

export default App