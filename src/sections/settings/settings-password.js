import { useCallback, useState } from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
  Divider,
} from '@mui/material';
import { useAuth } from 'src/hooks/use-auth';


import { useMoralis } from 'react-moralis';
import { useEffect } from 'react';

export const SettingsPassword = () => {
  const [values, setValues] = useState({
    password: '',
    confirm: ''
  });

  const auth = useAuth();
  var {user}=useMoralis()
  const [name,setName]=useState()
  const [email,setEmail]=useState()
  const [phone,setPhone]=useState()
  useEffect(()=>{
    console.log(user)
    setName(user.get("username"))  
      setEmail(user.get("email"))
      setPhone(user.get("phone"))

  },[user])
  const handleChange = useCallback(
    (event) => {
      setValues((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value
      }));
    },
    []
  );
  const [textSuccess,setTextSuccess]=useState("")

  const handleSubmit = useCallback(
  async  (event) => {
    console.log("entro"+user.get("email"))

      
      try {      
          
        await auth.recoverPassword(user.get("email"));
      
        setTextSuccess("Revisa tu correo y haz click en el enlace enviado para cambiar la contraseña.")

       
      } catch (err) {
      }
      
      event.preventDefault();
    },
    []
  );

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader
          subheader="Update password"
          title="Password"
        />
        <Divider />
        
        <Typography style={{marginTop:20}} variant="h6">
                {textSuccess}
              </Typography>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          
          <Button 
                type="submit" variant="contained">
          Cambiar Contraseña
          </Button>
          
        </CardActions>
      </Card>
    </form>
  );
};
