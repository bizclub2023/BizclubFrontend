import Head from 'next/head';
import { Box, Button, Container, Stack, SvgIcon, Typography,Grid,TextField } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { Scheduler } from "@aldabil/react-scheduler";
import { OverviewPlan } from 'src/sections/overview/overview-plan';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Alert from '@mui/material/Alert';
import { useCallback,useRef, useMemo, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { loadStripe } from "@stripe/stripe-js";
const stripe = require('stripe')("pk_live_51NV05cGc5cz7uc72FsRnXnRLG6lH4JRQu1nbngguiQRqotxj3nYOHj7iScTHm1DQGfh38AHrfzzpFvQMzAOWkHp700evWRcuXU");
import {  useMoralis } from 'react-moralis';

const now = new Date();
const Page = () => {
  const {Moralis}=useMoralis()
  const router=useRouter();
  const sessionId=useRouter().query.session_id ;
  function obtenerFechaMas30Dias() {
    var fechaHoy = new Date();
    var fechaMas30Dias = new Date(fechaHoy.getTime() + (30 * 24 * 60 * 60 * 1000));
    var formatoISO = fechaMas30Dias.toISOString();
    
    return formatoISO;
  }
  
async function fecthstripe(){
  console.log("sessionId "+sessionId)
  if(sessionId){
    
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const customer = await stripe.customers.retrieve(session.customer);
    
  console.log("session"+JSON.stringify(session))

  
  console.log("customer"+JSON.stringify(customer))
  console.log("customer_email "+JSON.stringify(session.customer_email))
  let user=await Moralis.User.current()

  if(session.payment_status=="paid"){
    console.log("payment_status "+JSON.stringify(session.payment_status))
      const fechaEnUnMes = obtenerFechaMas30Dias();
    const hoy = new Date();
    console.log("name "+JSON.stringify(customer.name))

    if(!user.get("planActive")){

      // Get the month and year of the current date
  
      
      console.log("currentMonth "+JSON.stringify(fechaEnUnMes))
  
      user.set("planEnd",fechaEnUnMes)
      user.set("planActive",true)
      user.set("stripeEmail",session.customer_email)

      user.set("payment_status",session.payment_status)
      user.set("sessionId",sessionId)

      if(parseFloat(session.amount_total/100)==20){


      const query = new Moralis.Query("_User");

      query.equalTo("planName","Explorador")     
      query.equalTo("planActive",true)     
     let object= await query.find()
let numberSusbcription=object.length

          if(numberSusbcription>=5){
            console.log("Maximas Subscripciones")
            return 
          }
          user.set("planName","Explorador")
          user.set("meetingRoomHours",0);
          user.set("planActive",true);
          console.log("pago el plan");

      }
      await user.save()

    }else{
      console.log(JSON.stringify("no ha terminado el mes de plan"))
  let time=new Date(user.get("planEnd")).getTime()
    if (hoy.getTime() >time) {
      if(sessionId!==user.get("sessionId")){
        console.log("Exito");
        user.set("planActive",true)
        user.set("stripeEmail",session.customer_email)

        user.set("planEnd",fechaEnUnMes)
        user.set("payment_status",session.payment_status)
        user.set("sessionId",sessionId)
        
        if(parseFloat(session.amount_total/100)==20){


        const query = new Moralis.Query("_User");
  
        query.equalTo("planName","Explorador")     
       let object= await query.find()
  let numberSusbcription=object.length
  
            if(numberSusbcription>=5){
              console.log("Maximas Subscripciones")
              return 
            }
            user.set("planName","Explorador")
            user.set("meetingRoomHours",0);
            user.set("planActive",true);
            console.log("pago el plan");

        }
       await user.save()
      }else{
        console.log("Estas agregando el mismo plan anterior");

      }

      console.log("El día de hoy es mayor que la fecha en un mes");
    }  else {
      console.log("El día de hoy es igual a la fecha en un mes");
    }

  }
}else{
  console.log(JSON.stringify("Stripe Error"))

}

}

}
    useEffect(() => {
      fecthstripe()

    }, []);

  return (
    <>
      <Head>
        <title>
          Exito | Bizclub
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
      <Container   maxWidth="lg">
        
      <div >
            <Typography alignSelf={"center"} variant="h4">
              Pago Exitoso
            </Typography>
          </div>
        <Stack spacing={0}>
       
        </Stack>
      </Container>
     
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
