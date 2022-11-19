import React from 'react'
import {
    Grid,
    Card,
    CardActionArea,
    Typography,
    CardMedia,
    Input,
  } from "@mui/material/";

import Navbar from "../../components/layout/Navbar";
import Map from "../../components/map/Map";
import PlayerInfo from '../../components/playerInfo/PlayerInfo';
const PlayerProfile = () => {
  return (
    <Grid container>
        <Grid item xs={12}>
            
        <Map
                searchOptionIndex={0}
                mapZoom={16}
                searchClicked={false}
              />
              <Grid/>
              <Grid item>
            <PlayerInfo/>
            </Grid>
            <Grid item>
            <Navbar></Navbar>
            </Grid>
        </Grid>
    </Grid>
  )
}

export default PlayerProfile