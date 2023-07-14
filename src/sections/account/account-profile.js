import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography
} from '@mui/material';
import { useMoralis } from 'react-moralis';
import { useEffect,useState } from 'react';


export const AccountProfile = () =>{
  var currentUser={}
  var {user}=useMoralis()
  const [name,setName]=useState()
  useEffect(()=>{
    console.log(user)
    setName(user.get("username"))
    currentUser= {
      avatar: '/assets/avatars/avatar-anika-visser.png',
      city: 'Los Angeles',
      country: 'USA',
      jobTitle: 'Senior Developer',
      name: user.get("username"),
      timezone: 'GTM-7'
    };

  },[user])
  return  <Card>
    <CardContent>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Avatar
          src={"/assets/avatars/avatar-anika-visser.png"}
          sx={{
            height: 80,
            mb: 2,
            width: 80
          }}
        />
        <Typography
          gutterBottom
          variant="h5"
        >
          {name}
        </Typography>
     
      </Box>
    </CardContent>
    <Divider />
    <CardActions>
      <Button
        fullWidth
        variant="text"
      >
        Upload picture
      </Button>
    </CardActions>
  </Card>
};
