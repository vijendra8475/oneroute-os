import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import MapView from "../components/MapView";

import {
  createJourney,
  assignVehicle,
  simulateProgress,
} from "../services/journeyEngine";

export default function LiveJourney() {
  const location = useLocation();
  const { source, destination } = location.state || {};

  const [journeyId, setJourneyId] = useState(null);
  const [journey, setJourney] = useState(null);

  // 🔹 Start journey & listen to Firestore
  useEffect(() => {
    async function startJourney() {
      if (!source || !destination) return;

      const id = await createJourney(source, destination);
      setJourneyId(id);

      await assignVehicle(id);

      const ref = doc(db, "journeys", id);
      onSnapshot(ref, (snap) => {
        setJourney(snap.data());
      });
    }

    startJourney();
  }, [source, destination]);

  // 🔹 Simulate progress / failure
  const nextStep = async () => {
    if (!journeyId) return;
    await simulateProgress(journeyId);
  };

  const currentState =
    journey && journey.states[journey.currentStateIndex];

  return (
    <div style={{ padding: "40px" }}>
      <h2>Live Journey</h2>

      {/* 🔹 Journey ID */}
      <p>
        <b>Journey ID:</b> {journeyId || "Creating..."}
      </p>

      {/* 🔹 Current State Card */}
      {journey && currentState && (
        <div
          style={{
            border: "1px solid #ccc",
            padding: "16px",
            marginBottom: "16px",
            borderRadius: "6px",
          }}
        >
          <h3>Current Journey State</h3>

          <p>
            <b>Step:</b> {journey.currentStateIndex + 1} /{" "}
            {journey.states.length}
          </p>

          <p>
            <b>From:</b> {currentState.from}
          </p>

          <p>
            <b>To:</b> {currentState.to}
          </p>

          <p>
            <b>Transport:</b>{" "}
            {currentState.vehicle || "Assigning..."}
          </p>

          <p>
            <b>Status:</b> {currentState.status}
          </p>
        </div>
      )}

      {/* 🔹 Failure / Reassignment Alerts */}
      {journey && currentState?.status === "IN_PROGRESS" && (
        <div
          style={{
            background: "#e8f0fe",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "4px",
          }}
        >
          🚖 Transport running smoothly...
        </div>
      )}

      {journey && currentState?.status === "FAILED" && (
        <div
          style={{
            background: "#fdecea",
            color: "#b00020",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "4px",
          }}
        >
          ⚠️ Vehicle issue detected. Reassigning automatically...
        </div>
      )}

      {/* 🔹 Action Button */}
      <button
        onClick={nextStep}
        style={{
          padding: "10px 16px",
          marginBottom: "20px",
          cursor: "pointer",
        }}
      >
        Simulate Next Segment
      </button>

      {/* 🔹 Map View */}
      <MapView source={source} destination={destination} />

      {/* 🔹 Journey Timeline */}
      {journey && (
        <div style={{ marginTop: "24px" }}>
          <h4>Journey Timeline</h4>
          <ul>
            {journey.states.map((state, index) => (
              <li key={index}>
                {state.type} →{" "}
                {state.vehicle || "Not Assigned"} (
                {state.status})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
