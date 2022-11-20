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
import user1Pic from '../../assets/user1photo.jpg';
import user2Pic from '../../assets/user2photo.jpg';
import user3Pic from '../../assets/user3photo.jpg';
import user4Pic from '../../assets/user4photo.jpg';
import logo from "../../assets/logo.png";
import profilePic from "../../assets/user1photo.jpg";
import React, { useState, useContext } from "react";
import {bounce} from "react-animations";
import styled, { keyframes } from "styled-components";
import star from "../../assets/star.png";
import kingdom from "../../assets/tumtopia.jpg"

const Navbar = ({toggleScoreUpdate}) => {
  const BounceInAnimation = keyframes`${bounce}`;
    const BounceInDiv = styled.div`animation: infinite 5s ${BounceInAnimation};`;
    const [scoreImg,setScoreImg] = useState(<div><img src={star} style={{height:"30px"}} /></div>)
    React.useEffect(() => {
      if(toggleScoreUpdate === true)
      {
        setScoreImg(<BounceInDiv>
          <img src={star} style={{height:"30px"}} />
      </BounceInDiv>)
        setTimeout(() => {
          setScoreImg(<div><img src={star} style={{height:"30px"}} /></div>)
        }, 1000);
      }
      return () => {
        setScoreImg(<div><img src={star} style={{height:"30px"}} /></div>)
      }
    }, [toggleScoreUpdate])
    
  return (
    <BottomNavigation
  showLabels
  value={"Johannes"}
  // onChange={(event, newValue) => {
  //   setValue(newValue);
  // }}
>
  <BottomNavigationAction label="Johannes" icon={<Avatar src={user2Pic}/>} />
  <BottomNavigationAction label="Score" icon={scoreImg}>
  
            </BottomNavigationAction>
  <BottomNavigationAction label={<><b>Kingdom:</b> TumTopia</>} icon={<Avatar src={kingdom} />} />
</BottomNavigation>
  )
}

export default Navbar