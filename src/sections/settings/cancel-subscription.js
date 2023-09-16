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

const stripe = require('stripe')("sk_test_51NV05cGc5cz7uc72E4yYvZZ2odhvKM3OT55PB7o0Uor8wWcAqZepAMvY77mwge9lk9fx8hXNo4fgXWJPfN1RAg4y00Z0xpoCXr");

export const CancelSubscription = () => {
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
    if(user){

      setName(user?.get("username"))  
      setEmail(user?.get("email"))
      setPhone(user?.get("phone"))
    
    }

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
        const session = await stripe.checkout.sessions.retrieve(user.get("sessionId"));
        const customer = await stripe.customers.retrieve(session.customer);
        console.log("customer "+JSON.stringify(customer))
        console.log("customer "+JSON.stringify(customer.id))
        const subscriptions = await stripe.subscriptions.list({
          limit: 3,
        });
        console.log("customer "+JSON.stringify(subscriptions.data[0].id))
        console.log("customer "+JSON.stringify(subscriptions.data))
for(let i=0;i<subscriptions.data.length;i++){
  var deleted = await stripe.subscriptions.cancel(subscriptions.data[i].id);
  console.log(deleted)

}
setTextSuccess("Subscripcion Cancelada ya no se te cobrara el proximo mes")
      } catch (err) {
        console.log(err.message)
      }
      
    },
    []
  );

  return (
      <Card>
        <CardHeader
          subheader="Plan"
          title="Subscripcion"
        />
        <Divider />
        
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          
          <Button 
          onClick={handleSubmit}
                 variant="contained">
          Cancelar Subscripcion
          </Button>
          
        </CardActions>
        
        <Typography style={{textAlign:"center",alignSelf:"center",marginTop:10,marginBottom:10}} variant="h6">
                {textSuccess}
              </Typography>
      </Card>
  );
};
