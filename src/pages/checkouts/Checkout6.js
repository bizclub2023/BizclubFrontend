import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";


import {
  Typography,
} from '@mui/material';
import { useMoralis } from "react-moralis";

let stripePromise;

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe("pk_live_51NV05cGc5cz7uc72FsRnXnRLG6lH4JRQu1nbngguiQRqotxj3nYOHj7iScTHm1DQGfh38AHrfzzpFvQMzAOWkHp700evWRcuXU");
  }

  return stripePromise;
};

const Checkout6 = (props) => {
  const [stripeError, setStripeError] = useState(null);
  const {Moralis}=useMoralis()
  const [isLoading, setLoading] = useState(false);
  const item = [{
    price: "price_1NihhoGc5cz7uc729QUzLrQM",
    quantity: 1
  }
]

  const checkoutOptions = {
    lineItems:item ,
    mode: "subscription",
    successUrl: `${window.location.origin}/success`,
    cancelUrl: `${window.location.origin}/cancel`
  };

  const redirectToCheckout = async () => {
    setLoading(true);

    console.log("redirectToCheckout "+props.title);

    /* if(props.title){
      const user = await Moralis.User.current();
      
      user.set("planName",props.title);
      
  
      const query = new Moralis.Query("_User");

      query.equalTo("planName",props.title)     
      query.equalTo("planActive",true)     
     let object= await query.find()
let numberSusbcription=object.length
      if(props.title=="Explorador"){

        if(numberSusbcription>=5){
          console.log("Maximas Subscripciones")
          return 
        }
        user.set("meetingRoomHours",0);
        user.set("planActive",true);
      } 
      if(props.title=="Emprendedor Express"){

        if(numberSusbcription>=5){
          console.log("Maximas Subscripciones")
          return 
        }

        user.set("meetingRoomHours",3);
        user.set("planActive",true);
      }

      if(props.title=="Visionario Flexible"){
        
        if(numberSusbcription>=5){
          console.log("Maximas Subscripciones")
          return 
        }
        
        user.set("meetingRoomHours",5);
        user.set("planActive",true);
      } 
      if(props.title=="Innovador Dedicado"){
        if(numberSusbcription>=6){
          console.log("Maximas Subscripciones")
          return 
        }
        user.set("meetingRoomHours",8);
        user.set("planActive",true);
      }
      if(props.title=="Líder Elite"){
        if(numberSusbcription>=2){
          console.log("Maximas Subscripciones")
          return 
        }
        user.set("meetingRoomHours",8);
        user.set("planActive",true);
      }
      if(props.title=="Corporativo Vanguardista"){
        if(numberSusbcription>=1){
          console.log("Maximas Subscripciones")
          return 
        }
        user.set("meetingRoomHours",10);
        user.set("planActive",true);
      }
      
      if(props.title=="Titán del Éxito"){
        if(numberSusbcription>=3){
          console.log("Maximas Subscripciones")
          return 
        }
        user.set("meetingRoomHours",10);
        user.set("planActive",true);
      }
      
      await user.save() 
    } */

    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout(checkoutOptions);





    
    if (error) setStripeError(error.message);
       setLoading(false);
     };

   if (stripeError) alert(stripeError);

    return (
      <div className="checkout">
        
        <button
          className="checkout-button"
          onClick={redirectToCheckout}
          disabled={isLoading}
        >
          <div className="grey-circle">
            <div className="purple-circle">
              <img className="icon" src={"https://bafkreibrxdw7vkfljus6emn45nbks2e4n3ge2h3dxki4dvhchhaap5eymi.ipfs.nftstorage.link/"} alt="credit-card-icon" />
            </div>
          </div>
          <div className="text-container">
          <Typography variant="h6">
          {isLoading ? "Cargando..." : "Comprar"}
                </Typography>
          </div>
        </button>
      </div>
    );
};

export default Checkout6;
