import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateUser from "./components/CreateUser/CreateUser";
import Frame from "./components/Frame/Frame";
import Copy from "./components/Copy/Copy";
import Payment from "./components/Payment/Payment";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/create-user" element={<CreateUser />} />
        <Route path="/select-frame" element={<Frame />} />
        <Route path="/select-copy" element={<Copy />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>
    </Router>
  );
}

export default App;
