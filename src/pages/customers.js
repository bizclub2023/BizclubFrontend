import Head from 'next/head';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import {
  Box,
  Button,
  Container,
  Pagination,
  Stack,
  SvgIcon,
  Typography,
  Unstable_Grid2 as Grid
} from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { CompanyCard } from 'src/sections/companies/company-card2';
import { CompaniesSearch } from 'src/sections/companies/companies-search';
import StripeCheckout from 'react-stripe-checkout';
import { useEffect,useState } from 'react';
import { useMoralis } from "react-moralis";
import { useRouter } from 'next/router';
const stripe = require('stripe')("pk_live_51NV05cGc5cz7uc72FsRnXnRLG6lH4JRQu1nbngguiQRqotxj3nYOHj7iScTHm1DQGfh38AHrfzzpFvQMzAOWkHp700evWRcuXU");


const Page = () => {
  const router=useRouter();

var [companies,setCompanies]=useState([])
  const {Moralis,user}=useMoralis()

  const fetchData=async ()=>{
    let coworkings=await Moralis.Cloud.run("fetchCoworking")
console.log("coworkings "+JSON.stringify(coworkings))
    setCompanies(coworkings)

  }  
   const [isPayed,setUser]=useState(false)


  async function fetchUser(){

let user=await Moralis.User.current()

    if(user){
 

      if(user.get("sessionId")){
        const session = await stripe.checkout.sessions.retrieve(user.get("sessionId"));
        console.log("session"+JSON.stringify(session))

        if(session.payment_status==="paid"){

          await router.push('/services');
          setUser(true)
        }else{

          setUser(false)

        }
    
    }}
  }
  useEffect(() => {
    

 
    const interval = setInterval(() => {
      fetchUser()
    }, 300);
    return () => clearInterval(interval);
}, []);


  useEffect(()=>{
 fetchData()
  },[])
  return   <>
    <Head>
      <title>
      Coworking | Bizclub
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth="xl">
        <Stack spacing={3}>
          <Stack
            direction="row"
            justifyContent="space-between"
            spacing={4}
          >
            <Stack spacing={1}>
              <Typography variant="h4">
               Coworking
              </Typography>
           
            </Stack>
           
          </Stack>
          <Grid
            container
            spacing={3}
          >
            {companies.map((company) => (
              <Grid
                xs={12}
                md={6}
                lg={4}
                key={company.id}
              >
                <CompanyCard company={company} />
              </Grid>
            ))}
          </Grid>
        
        </Stack>
      </Container>
    </Box>
  </>
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
