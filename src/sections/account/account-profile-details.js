import { useCallback, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Unstable_Grid2 as Grid
} from '@mui/material';
import {  useMoralis } from 'react-moralis';
import LoadingButton from '@mui/lab/LoadingButton';
import Save from '@mui/icons-material/Save';
const states = [
  {
    value: 'alabama',
    label: 'Alabama'
  },
  {
    value: 'new-york',
    label: 'New York'
  },
  {
    value: 'san-francisco',
    label: 'San Francisco'
  },
  {
    value: 'los-angeles',
    label: 'Los Angeles'
  }
];

import { useEffect } from 'react';

export const AccountProfileDetails = () => {
  const [isLoading,setLoading]= useState(false)

  const [values, setValues] = useState({
    username: '',
    email: '',
    phone: '',
  });

  var {Moralis,isAuthenticated}=useMoralis()
 async  function init(){
    let user=await Moralis.User.current()
    console.log()
    
    setValues({   username: user?.get("username"),
    email: user?.get("email"),
    phone: user?.get("phone"),})

  }
  useEffect(()=>{
    init()

     

  },[isAuthenticated])
  const handleChange = useCallback(
   async (event) => {
     await setValues((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value
      }));
    },
    []
    );
  const handleSubmit = useCallback(
   async (event) => {
    setLoading(true)
      console.log(values.username)
    let user=await Moralis.User.current()
    user.set("username",values.username)
    user.set("phone",values.phone)
await user.save()
setLoading(false)

    },
    []
  );

  return (
      <Card>
        <CardHeader
          subheader="The information can be edited"
          title="Profile"
        />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid
              container
              spacing={3}
            >
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  name="username"
                  label="Nombre de Usuario"
                  required
                  
                  value={values.username}

                  onChange={handleChange}
                />
              </Grid>
             
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  InputLabelProps={{ shrink: true }} 
                  label="Correo Electronico"
                  name="email"

                  value={values.email}
                  required
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Phone Number"
                  type="number"
                  name="phone"
                  onChange={handleChange}
                  value={values.phone}

                />
              </Grid>
             
            
            </Grid>
          </Box>
        </CardContent>
        <Divider />
          <Grid justifyContent={"center"} style={{flex:1}} alignItems={"center"}>
        <LoadingButton
variant="contained"
                         size="large"
                         sx={{ mt: 3,alignSelf:"center" }}
                         
        loadingPosition="start"
        onClick={handleSubmit}
        startIcon={<Save />}
                         style={{color:"white",alignSelf:"center",borderColor:"black"}}
                         loading={isLoading} >
                      Guardar Cambios
      </LoadingButton>
                
          </Grid>
          
      </Card>
  );
};
