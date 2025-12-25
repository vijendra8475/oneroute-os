import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  createJourney,
  assignVehicle,
  simulateProgress,
} from "../services/journeyEngine";

export default function LiveJourney() {
  const location = useLocation();
  const { source, destination } = location.state || {};
  const [journeyId, setJourneyId] = useState(null);

  useEffect(() => {
    async function start() {
      const id = await createJourney(source, destination);
      setJourneyId(id);
      await assignVehicle(id);
    }
    start();
  }, []);

  const nextStep = async () => {
    await simulateProgress(journeyId);
    alert("State updated. Check Firestore!");
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Live Journey</h2>
      <p>Journey ID: {journeyId}</p>

      <button onClick={nextStep}>
        Simulate Progress / Failure
      </button>

      <p>
        (This button simulates travel & reassignment logic)
      </p>
    </div>
  );
}
