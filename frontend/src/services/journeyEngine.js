import { doc, setDoc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

// Create a new journey
export async function createJourney(source, destination) {
  const journeyId = "JR_" + Date.now();

  const journey = {
    journeyId,
    source,
    destination,
    currentStateIndex: 0,
    status: "ACTIVE",
    states: [
      {
        type: "LOCAL_TRANSPORT",
        from: source,
        to: "Nearest Railway Station",
        vehicle: null,
        status: "PENDING",
      },
      {
        type: "TRAIN",
        from: "Source Railway Station",
        to: "Destination Railway Station",
        vehicle: "Train",
        status: "PENDING",
      },
      {
        type: "LOCAL_TRANSPORT",
        from: "Destination Railway Station",
        to: destination,
        vehicle: null,
        status: "PENDING",
      },
    ],
  };

  await setDoc(doc(db, "journeys", journeyId), journey);

  return journeyId;
}



function getRandomVehicle() {
  const vehicles = ["Auto", "Bike", "Cab"];
  return vehicles[Math.floor(Math.random() * vehicles.length)];
}

export async function assignVehicle(journeyId) {
  const ref = doc(db, "journeys", journeyId);
  const snap = await getDoc(ref);

  if (!snap.exists()) return;

  const journey = snap.data();
  const index = journey.currentStateIndex;
  const state = journey.states[index];

  state.vehicle = getRandomVehicle();
  state.status = "IN_PROGRESS";

  await updateDoc(ref, {
    states: journey.states,
  });
}




export async function simulateProgress(journeyId) {
  const ref = doc(db, "journeys", journeyId);
  const snap = await getDoc(ref);
  if (!snap.exists()) return;

  const journey = snap.data();
  const index = journey.currentStateIndex;
  const state = journey.states[index];

  // 30% chance of failure
  const failed = Math.random() < 0.3;

  if (failed) {
    state.status = "FAILED";
    state.vehicle = getRandomVehicle(); // reassigned
    state.status = "IN_PROGRESS";
  } else {
    state.status = "COMPLETED";
    journey.currentStateIndex++;

    if (journey.currentStateIndex >= journey.states.length) {
      journey.status = "COMPLETED";
    }
  }

  await updateDoc(ref, {
    states: journey.states,
    currentStateIndex: journey.currentStateIndex,
    status: journey.status,
  });
}
