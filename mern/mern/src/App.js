import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import TrainingManagement from "./components/TrainingManagement"; // Adjust the path

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TrainingManagement />} />
      </Routes>
    </Router>
  );
}


