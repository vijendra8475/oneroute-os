import { useLocation, useNavigate } from "react-router-dom";

export default function LiveJourney() {
  const location = useLocation();
  const navigate = useNavigate();

  const { source, destination } = location.state || {};

  if (!source || !destination) {
    return <h2>No journey found</h2>;
  }

  return (
    <div style={{ padding: "40px" }}>
      <h2>Live Journey</h2>
      <p><b>From:</b> {source}</p>
      <p><b>To:</b> {destination}</p>

      <p>Current State: Assigning transport...</p>

      <button onClick={() => navigate("/summary")}>
        End Journey (Demo)
      </button>
    </div>
  );
}
