import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AlarmTable from "./components/AlarmTable";
import AlarmDetail from "./components/AlarmDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AlarmTable />} />
        <Route path="/alarm/:id" element={<AlarmDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
