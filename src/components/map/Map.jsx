import React from "react";
import { MapContainer, TileLayer, Marker, Popup, SVGOverlay, Rectangle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./styles.css";
import markerIconGreen from "../../assets/marker-icon-green.png";
import conqueredIcon from "../../assets/conquered.png";
import { Icon } from "leaflet";
import Legend from "./Legend";
import ChangeView from "./ChangeView";
import { IconButton, Input } from "@mui/material";
import CameraAltIcon from '@mui/icons-material/CameraAlt';
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
  const [map, setMap] = React.useState(null);
  const [optionIndexChanged, setOptionIndexChanged] = React.useState(false);
  const [center] = React.useState([48.136642566675825, 11.575330343104591]);

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
                icon={new Icon({iconUrl: markerIconGreen})}>
                  <Popup>
                    Fix Issue?
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
              <Rectangle key={index} bounds={tile.bounds} pathOptions={
                parseInt(tile.user_id) === 1 ? { color: 'blue', opacity: 0.5 }:
                parseInt(tile.user_id) === 2 ? { color: 'orange', opacity: 0.5 }:
                parseInt(tile.user_id) === 3 ? { color: 'red', opacity: 0.5 }:
                { color: 'purple', opacity: 0.5 }
              } />
            )}
          </MapContainer> 
          </div>
  );
}
