import { BrowserRouter, Routes, Route } from "react-router-dom";
import JourneySetup from "./pages/JourneySetup";
import LiveJourney from "./pages/LiveJourney";
import Summary from "./pages/Summary";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<JourneySetup />} />
        <Route path="/journey" element={<LiveJourney />} />
        <Route path="/summary" element={<Summary />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
