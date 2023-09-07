import PropTypes from 'prop-types';
import CurrencyDollarIcon from '@heroicons/react/24/solid/CurrencyDollarIcon';
import { Avatar, Card, CardContent, Stack, SvgIcon, Typography } from '@mui/material';
import { useEffect,useState } from 'react';
import { useMoralis } from 'react-moralis';

export const OverviewPlan = (props) => {
  const { value, sx } = props;
  const [planName,setPlanName]=useState("")
  const [planHours,setPlanHours]=useState("")
  const [planUsers,setplanUsers]=useState("")

  const init=async ()=>{

    let user=await Moralis.User.current()
    let active=await user.get("planActive")
    
    let planName=await user.get("planName");    
    let planHours=await user.get("meetingRoomHours");
    let planUsers=await user.get("planUsers");
    setplanUsers(planUsers)

    setPlanName(planName)
    setPlanHours(planHours)

  }
  const {Moralis}=useMoralis()
useEffect(()=>{
  
 
  const interval = setInterval(() => {
    init()
  }, 300);
  return () => clearInterval(interval);

},[])
  return (
    <Card sx={sx}>
      <CardContent>
        <Stack
          alignItems="flex-start"
          direction="row"
          justifyContent="space-between"
          spacing={3}
        >
          <Stack spacing={1}>
            <Typography
              color="text.secondary"
              variant="overline"
            >
              Plan Actual: {planName}
            </Typography>
            <Typography
              color="text.secondary"
              variant="overline"
            >
              Usuarios Permitidos: {planUsers}
            </Typography>
            <Typography variant="h4">
              Horas restantes: {planHours}
            </Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: 'primary.main',
              height: 56,
              width: 56
            }}
          >
            <SvgIcon>
              <CurrencyDollarIcon />
            </SvgIcon>
          </Avatar>
        </Stack>
      </CardContent>
    </Card>
  );
};

OverviewPlan.propTypes = {
  value: PropTypes.string,
  sx: PropTypes.object
};
