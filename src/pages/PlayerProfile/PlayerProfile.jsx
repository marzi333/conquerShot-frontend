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
import { getLeaderBoard, getUserById } from '../../services/api/user.services';
import Leaderboard from '../../components/Leaderboard/Leaderboard';

const PlayerProfile = () => {

    // const BounceInAnimation = keyframes`${BounceIn}`;
    // const BounceInDiv = styled.div`animation: infinite 5s ${BounceInAnimation};`;

    const [userId, setUserId]=useState(2);
    const [user, setUser] = useState({})
    const [issues,setIssues] = useState([]);
    const [tiles,setTiles] = useState([]);
    const [leaderboard,setLeaderboard] = useState([])
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
        await getUserById(userId).then(async(user)=>{
            setUser(user);
        })
    }

    async function handleGetLeaderBoard(){
        await getLeaderBoard().then(async(leaderboard)=>{
            setLeaderboard(leaderboard);
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
        handleGetLeaderBoard();
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
                <Leaderboard leaderboard={leaderboard}/>
            </Grid>
            <Grid item>
                <Navbar toggleScoreUpdate={showScoreAnimation}/>
            </Grid>
        </Grid>
    )
}

export default PlayerProfile