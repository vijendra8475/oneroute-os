import {
  GoogleMap,
  Marker,
  Polyline,
  LoadScript,
} from "@react-google-maps/api";
import { useEffect, useState } from "react";

const containerStyle = {
  width: "100%",
  height: "400px",
};

export default function MapView({ source, destination }) {
  const center = { lat: 21.2514, lng: 81.6296 }; // Bhilai (safe default)

  const path = [
    { lat: 21.2514, lng: 81.6296 },
    { lat: 21.24, lng: 81.63 },
    { lat: 21.23, lng: 81.64 },
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % path.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_KEY}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={13}>
        <Marker position={path[0]} label="A" />
        <Marker position={path[path.length - 1]} label="B" />
        <Marker position={path[index]} label="🚖" />


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
