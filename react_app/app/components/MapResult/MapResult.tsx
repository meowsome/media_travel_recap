import { useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import "leaflet.motion/dist/leaflet.motion.js";
import L from "leaflet";
import planeMarker from '../../resources/plane.svg';

export default function MapResult({ locations }) {
  const [mapContext, setMapContext] = useState(null);
  const [seq, setSeq] = useState(null);

  const reset = () => {
    if (seq) seq.clearLayers();
  }

  const animatePath = () => {
    reset();

const polylineArray = [];

    for (let i = 1; i < locations.length; i++) {

      const path = L.motion.polyline(
        [[locations[i - 1].latitude, locations[i - 1].longitude], [locations[i].latitude, locations[i].longitude]],
        {
          color: "blue"
        },
        {
          auto: false,
          duration: 2500
        },
        {
          removeOnEnd: false,
          showMarker: false,
          icon: L.icon({
            iconUrl: planeMarker,
            iconSize: [20, 30]
          })
        }
      );

      polylineArray.push(path);
    }

    const tempSeq = L.motion.seq(polylineArray);
    mapContext && mapContext.addLayer(tempSeq);
    tempSeq.motionStart();

    setSeq(tempSeq);
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