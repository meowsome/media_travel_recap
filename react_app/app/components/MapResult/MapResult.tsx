import { MapContainer, Marker, TileLayer, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';


const MapResult = ({ locations }) => (
  <MapContainer center={[locations[0].latitude, locations[0].longitude]} zoom={3} className="map">
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />

    {locations.map((location) => (
      <Marker position={[location.latitude, location.longitude]}>
          <Popup>
            {location.date_string}<br />
            {location.city}<br />
            {location.state}
          </Popup>
      </Marker>
    ))}

  </MapContainer>
);

export default MapResult;