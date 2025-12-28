import { useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import "leaflet.motion/dist/leaflet.motion.js";
import L from "leaflet";
import planeMarker from '../../resources/plane.svg';

export default function MapResult({ locations }) {
  const [mapContext, setMapContext] = useState(null);

  const reset = () => {
    // TODO add method here
    console.log("Reset");
  }

  const animatePath = () => {
    reset();

    const path = L.motion
      .polyline(
        locations.map((loc) => [loc.latitude, loc.longitude]),
        {
          color: "blue"
        },
        {
          auto: false,
          duration: 50000,
          motionDelay: 50000 // TODO fix delay, this delays for the entire animation instead of each segment
        },
        {
          showMarker: true,
          icon: L.icon({
            iconUrl: planeMarker,
            iconSize: [20, 30]
          })
        }
      );

    const seq = L.motion.seq([path]);
    mapContext && mapContext.addLayer(seq);

    seq.motionStart();
  };

  return (
    <>
      <MapContainer
        center={[locations[0].latitude, locations[0].longitude]}
        zoom={4}
        scrollWheelZoom={true}
        style={{
          height: "100vh",
          width: "1000px"
        }}
        whenReady={(event) => setMapContext(event.target)}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
      <button type="button" onClick={() => animatePath()}>Animate</button>
      <button type="button" onClick={() => reset()}>Reset</button>
    </>
  )
}