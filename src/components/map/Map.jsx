import React from "react";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, SVGOverlay, Rectangle, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./styles.css";
import pinIcon from "../../assets/pin.png";
import castleIcon from "../../assets/castle.png";
import towerIcon from "../../assets/tower.png";
import villageIcon from "../../assets/village.png";
import conqueredIcon from "../../assets/conquered.png";
import swords from "../../assets/swords.png";
import { Icon } from "leaflet";
import Legend from "./Legend";
import ChangeView from "./ChangeView";
import { Avatar, IconButton, Input } from "@mui/material";
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import L from "leaflet";
export default function Map({
  searchOptionIndex,
  longitude,
  latitude,
  userId,
  issues,
  tiles,
  mapZoom,
  searchClicked,
  handleUploadIssuePic
}) {
  function LocationMarker() {
    const [position, setPosition] = useState(null);
    const [bbox, setBbox] = useState([]);

    const map = useMap();
    const icon = L.icon({
      iconSize: [25, 41],
      iconAnchor: [10, 41],
      popupAnchor: [2, -40],
      iconUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png",
      shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png"
    });

    useEffect(() => {
      map.locate().on("locationfound", function (e) {
        setPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
        const radius = e.accuracy;
        const circle = L.circle(e.latlng, radius);
        circle.addTo(map);
        setBbox(e.bounds.toBBoxString().split(","));
      });
    }, [map]);

    return position === null ? null : (
        <Marker position={position} icon={icon}>
          <Popup>
            You are here. <br />
            Map bbox: <br />
            <b>Southwest lng</b>: {bbox[0]} <br />
            <b>Southwest lat</b>: {bbox[1]} <br />
            <b>Northeast lng</b>: {bbox[2]} <br />
            <b>Northeast lat</b>: {bbox[3]}
          </Popup>
        </Marker>
    );
  }
  const [map, setMap] = React.useState(null);
  const [optionIndexChanged, setOptionIndexChanged] = React.useState(false);
  const [center] = React.useState([48.136642566675825, 11.575330343104591]);
  const colors = ['blue','purple','orange','red'];
  const icons  = {'tower':towerIcon, 'castle':castleIcon, 'village':villageIcon}
  return (
    <div id="map">
      {/* map */}
          <MapContainer center={center} zoom={mapZoom} scrollWheelZoom={false}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {
              issues.map((issue, index)=>
                {return issue.submissions.find((submission)=>parseInt(submission.user_id) === userId) === undefined ? 
                <Marker 
                key = {index} 
                
                position={[issue.latitude,issue.longitude]}
                icon={new Icon({iconUrl: icons[issue.icon], iconSize:[50,50]})}>
                  <Popup className="request-popup">
                    <div>
                      <img  height={50} width={50} src={icons[issue.icon]}></img>
                    </div>
                    <h3>Want to conquer this {issue.icon}? Take a picture of the road here!</h3>
                    <IconButton>
                    <label htmlFor="contained-button-file1">
                    
                            <Input
                              accept="image/*"
                              id="contained-button-file1"
                              type="file"
                              style={{ display: "none" }}
                              onChange={(event) => {
                                handleUploadIssuePic(issue,event);
                              }}
                            />
                          
                      <CameraAltIcon/>
                      
                    
                    </label>
                    </IconButton>
                  </Popup>
                </Marker>:
                <Marker 
                key = {index} 
                position={[issue.latitude,issue.longitude]} 
                icon={new Icon({iconUrl: conqueredIcon, iconSize:[50,50]})}>
                </Marker>} 
  
              )
            }
            {tiles.map((tile,index) =>

              <Rectangle weight={0.5} key={index} bounds={tile.bounds} pathOptions={
                parseInt(tile.user_id) === 1 ? { color: 'blue', opacity: tile.opacity, fillOpacity: tile.opacity}:
                parseInt(tile.user_id) === 2 ? { color: 'orange', opacity: tile.opacity, fillOpacity: tile.opacity}:
                parseInt(tile.user_id) === 3 ? { color: 'red', opacity: tile.opacity, fillOpacity: tile.opacity}:
                { color: 'purple', opacity: tile.opacity, fillOpacity: tile.opacity}
              } ></Rectangle>
            )}
            <LocationMarker />
          </MapContainer> 
          </div>
  );
}
