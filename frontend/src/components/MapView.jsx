import { GoogleMap, LoadScript, Polyline } from "@react-google-maps/api";
import { useEffect, useState } from "react";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const path = [
  { lat: 21.2514, lng: 81.6296 },
  { lat: 21.245, lng: 81.632 },
  { lat: 21.238, lng: 81.638 },
];

const LIBRARIES = ["marker"];

export default function MapView() {
  const [map, setMap] = useState(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!map || !window.google) return;

    const marker = new window.google.maps.marker.AdvancedMarkerElement({
      map,
      position: path[index],
      content: document.createTextNode("🚖"),
    });

    return () => (marker.map = null);
  }, [map, index]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % path.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <LoadScript
      googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_KEY}
      libraries={LIBRARIES}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={path[0]}
        zoom={14}
        onLoad={(map) => setMap(map)}
      >
        <Polyline
          path={path}
          options={{
            strokeColor: "#1a73e8",
            strokeOpacity: 0.8,
            strokeWeight: 5,
          }}
        />
      </GoogleMap>
    </LoadScript>
  );
}
