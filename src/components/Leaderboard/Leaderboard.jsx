import { Avatar, Divider, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material'
import React from 'react'

import firstPrize from '../../assets/gold-cup.png';
import secondPrize from '../../assets/silver-cup.png';
import thirdPrize from '../../assets/bronze-cup.png';

import user1Pic from '../../assets/user1photo.jpg';
import user2Pic from '../../assets/user2photo.jpg';
import user3Pic from '../../assets/user3photo.jpg';
import user4Pic from '../../assets/user4photo.jpg';


const Leaderboard = ({leaderboard}) => {
    
    const userAvatars = [user1Pic,user2Pic,user3Pic,user4Pic];
    const sortLeaderboard = (leaderboard) => {
        leaderboard.sort(function(a, b) {
            return b.score - a.score;
        });
    }
    React.useEffect(() => {
      sortLeaderboard(leaderboard);
    }, [])
    
  return (
    <List>
        
        {console.log(leaderboard)}
        {leaderboard.map((user, index)=>
        <>
        <Divider/>
        <ListItem
        key={index}
        >
            {console.log(index)}
        {index===0?<ListItemAvatar>
          <Avatar alt="first-prize" src={firstPrize} />
        </ListItemAvatar>:
        index===1?<ListItemAvatar>
        <Avatar alt="second-prize" src={secondPrize} />
        </ListItemAvatar>:
        index===2?<ListItemAvatar>
        <Avatar alt="third-prize" src={thirdPrize} />
        </ListItemAvatar>:null
        }
        <ListItemText>
        <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {user.user_name}
              </Typography>
              
        <Avatar alt="profile-pic" src={userAvatars[user.user_id]} />
        </ListItemText>
        </ListItem>
        
        </>
        )}
    </List>
  )
}

export default Leaderboard