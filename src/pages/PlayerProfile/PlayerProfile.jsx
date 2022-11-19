import React from 'react'
import { useState } from 'react';
import {
    Grid,
    Card,
    CardActionArea,
    Typography,
    CardMedia,
    Input,
    Avatar,
  } from "@mui/material/";
import Navbar from "../../components/layout/Navbar";
import Map from "../../components/map/Map";
import PlayerInfo from '../../components/playerInfo/PlayerInfo';
import {getAllIssues,uploadIssuePic} from '../../services/api/issue.services';
import { getAllTiles } from '../../services/api/map.services';

import profilePic from "../../assets/user1photo.jpg";
import { getUserById } from '../../services/api/user.services';

const PlayerProfile = () => {

    // const BounceInAnimation = keyframes`${BounceIn}`;
    // const BounceInDiv = styled.div`animation: infinite 5s ${BounceInAnimation};`;

    const [userId, setUserId]=useState(1);
    const [user, setUser] = useState({})
    const [issues,setIssues] = useState([]);
    const [tiles,setTiles] = useState([]);
    const [showScoreAnimation,toggleScoreAnimation] = useState(false);
    async function handleGetAllIssues() {
        await getAllIssues().then(async (issues) => {
            setIssues(issues);
        })
    }

    async function handleGetAllTiles() {
        await getAllTiles().then(async(tiles)=> {
            setTiles(tiles);
        }
        )
    }
    async function handleGetUserById(){
        await getUserById().then(async(user)=>{
            setUser(user);
        })
    }

    const handleUploadIssuePic = async (issue, event) => {
        if (event.target.value) {
            const formData = new FormData();
            formData.append("image",event.target.files[0])
            formData.append("user_id",userId);
            formData.append("issue_id",issue.image_id);
          await uploadIssuePic(formData)
            .then((tiles) => {
                console.log(tiles);
                handleGetAllTiles();
            })
            .catch((err) => {
              alert("Photo incorrect. Please retake a photo of the road ahead!");
            });
        }
      };
    
    React.useEffect(()=>{
        handleGetAllIssues();
        handleGetAllTiles();
        handleGetUserById();
    }, []);

    // React.useEffect(()=>{

    // },[user.]);

    

    return (
        <Grid container direction={"column"} spacing={2}>
            
            <Grid item>
                <Map
                userId={userId}
                    searchOptionIndex={0}
                    mapZoom={13}
                    searchClicked={false}
                    issues={issues}
                    tiles={tiles}
                    handleUploadIssuePic={handleUploadIssuePic}
                />
                
            </Grid>
            <Grid item>
                <Navbar toggleScoreUpdate={showScoreAnimation}/>
            </Grid>
        </Grid>
    )
}

export default PlayerProfile