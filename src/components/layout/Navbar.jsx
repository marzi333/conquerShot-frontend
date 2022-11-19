import {
  AppBar,
  Button,
  Grid,
  IconButton,
  Toolbar,
  Typography,
  Badge,
  Avatar,
  MenuItem,
  ListItemIcon,
  Box,
  Menu,
  DialogTitle,
  Dialog,
  DialogContent,
  DialogActions,
  Skeleton,
  NotificationsIcon,
  BottomNavigation,
  BottomNavigationAction,
  RestoreIcon,
} from "@mui/material";

import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from '@mui/icons-material/LocationOn';

import logo from "../../assets/logo.png";
import profilePic from "../../assets/user1photo.jpg";
import React, { useState, useContext } from "react";

const Navbar = () => {
  return (
    <BottomNavigation
  showLabels
  value={"Johannes"}
  // onChange={(event, newValue) => {
  //   setValue(newValue);
  // }}
>
  <BottomNavigationAction label="Johannes" icon={<Avatar src={profilePic}/>} />
  <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
  <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
</BottomNavigation>
  )
}

export default Navbar