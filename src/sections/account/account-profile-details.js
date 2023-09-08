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

export const AccountProfileDetails = (props) => {
  const [isLoading,setLoading]= useState(false)
  var [phone,setPhone]= useState("")
  var [username,setUsername]= useState("")

  var [values, setValues] = useState({
    username: '',
    email: '',
    phone: '',
  });


  var {Moralis,user,isAuthenticated}=useMoralis()
 async function init(){

    if(user){
      let username=await user.get("username")
      
      let phone=await user.get("phone")
    
   setPhone(phone)
   setUsername(username)

   await setValues({   email: user.get("email")})

  }
  }
  
  const handleChange = useCallback(
    async (event) => {
      if(event.target.name=="phone"){
        setPhone(event.target.value)
        return
      }
      if(event.target.name=="username"){
setUsername(event.target.value)
return
      }
      await setValues((prevState) => ({
         ...prevState,
         [event.target.name]: event.target.value
       }));
     },
     []
     );
  useEffect(()=>{
    init()
   },[])
    const handleSubmit = async (event) => {

    setLoading(true)
    console.log(values.phone)
      console.log(values.username)
    user.set("username",username)
    user.set("phone",phone)
await user.save()
setLoading(false)
console.log("termino")

    }

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
                  InputLabelProps={{ shrink: true }} 

                  value={username}
                  SelectProps={{ native: true }}

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
                  SelectProps={{ native: true }}

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
                  SelectProps={{ native: true }}
                  required
                  InputLabelProps={{ shrink: true }} 

                  onChange={handleChange}
                  value={phone}

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
