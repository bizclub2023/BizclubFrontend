import Head from 'next/head';
import { Box, Button, Container, Stack, SvgIcon, Typography,Grid,TextField } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { Scheduler } from "@aldabil/react-scheduler";
import {  useMoralis } from 'react-moralis';
import { OverviewPlan } from 'src/sections/overview/overview-plan';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Alert from '@mui/material/Alert';
import { useCallback,useRef, useMemo, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { loadStripe } from "@stripe/stripe-js";

const now = new Date();
const Page = () => {
  const router=useRouter();
  const sessionId=useRouter().query.session_id ;
  
let stripePromise;
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe("pk_test_51NV05cGc5cz7uc72xTzSNZNeg3dsIWX9hZo4Y7nZH5WnFF8nuEJJwhSGviE29JHXzm8zovxToQDDVjLzfND57MWj00NdjCWocu");
  }

  return stripePromise;
};
async function fecthstripe(){
  console.log("sessionId "+sessionId)
  const stripe = await getStripe();
  if(sessionId){
    
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const customer = await stripe.customers.retrieve(session.customer);
    
  console.log("session"+session)
  console.log("customer"+customer)
  
}

}
const {Moralis}=useMoralis()
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
