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

      
      try {      
          
        await auth.recoverPassword(user.get("email"));
      
        setTextSuccess("Revisa tu correo y haz click en el enlace enviado.")
        console.log("Revisa tu correo")

       
      } catch (err) {
        console.log(err.message)
      }
      
    },
    []
  );

  return (
      <Card>
        <CardHeader
          subheader="Actualizar Contraseña"
          title="Contraseña"
        />
        <Divider />
        
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          
          <Button 
          onClick={handleSubmit}
                 variant="contained">
          Cambiar Contraseña
          </Button>
          
        </CardActions>
        
        <Typography style={{textAlign:"center",alignSelf:"center",marginTop:10,marginBottom:10}} variant="h6">
                {textSuccess}
              </Typography>
      </Card>
  );
};
