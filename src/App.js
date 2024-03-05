import "./App.css";

// react bootstrap configuration
import "bootstrap/dist/css/bootstrap.min.css";

import Navigation from "./components/NavigationBar/Navigation";
import Ledge from "./components/Ledge/Ledge";
import CheckIn from "./components/CheckIn/CheckIn";
import AllGuests from "./components/AllGuests/AllGuests";
import Review from "./components/Review/Review";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div style={{ backgroundColor: "whitesmoke" }}>
      <BrowserRouter basename="/stay-sync">
        <Navigation />
        <div className="inter-font container">
          <Routes>
            <Route path="/" element={<CheckIn />} />
            <Route path="/checkin" element={<CheckIn />} />
            <Route path="/ledge" element={<Ledge />} />
            <Route path="/allguests" element={<AllGuests />} />
            <Route path="/review" element={<Review />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
