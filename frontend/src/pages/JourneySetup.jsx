import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function JourneySetup() {
  const navigate = useNavigate();
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");

  const startJourney = () => {
    if (!source || !destination) {
      alert("Please enter source and destination");
      return;
    }
    navigate("/journey", {
      state: { source, destination },
    });
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>OneRoute OS</h1>
      <p>Enter your journey details</p>

      <input
        placeholder="Source Location"
        value={source}
        onChange={(e) => setSource(e.target.value)}
      />
      <br /><br />

      <input
        placeholder="Destination Location"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
      />
      <br /><br />

      <button onClick={startJourney}>Start Journey</button>
    </div>
  );
}
