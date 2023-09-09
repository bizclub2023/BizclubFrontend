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
const stripe = require('stripe')("sk_test_51NV05cGc5cz7uc72E4yYvZZ2odhvKM3OT55PB7o0Uor8wWcAqZepAMvY77mwge9lk9fx8hXNo4fgXWJPfN1RAg4y00Z0xpoCXr");


const Page = () => {
  const router=useRouter();

var [companies,setCompanies]=useState([])
  const {Moralis,user}=useMoralis()

  const fetchData=async ()=>{
let empty=[]
let list = [
  {
    id: '2569ce0d517a7f06d3ea1f24',
    createdAt: '27/03/2019',
    description: 'Acceso a espacios de coworking compartidos y servicios básicos por un día. Ideal para profesionales en viajes de negocioso visitantes ocasionales.',
    logo: 'https://bafybeidwnhdez3yjg6w7gpg7esgtzicbj3l5sqehepd5xng3xafegybpfu.ipfs.nftstorage.link/public-service.png',
    title: 'Explorador',
    price: '200.000 COP/MES',
    avaliable: '200.000 COP/MES'

  },
  {
    id: 'ed2b900870ceba72d203ec15',
    createdAt: '31/03/2019',
    description: 'Acceso a espacios de coworking compartidos durante el horario comercial, con serviciosbásicos y conexión a intemet de alta velocidad.',
    logo: 'https://bafybeidwnhdez3yjg6w7gpg7esgtzicbj3l5sqehepd5xng3xafegybpfu.ipfs.nftstorage.link/tecnologia.png',
    title: 'Emprendedor Express',
    price: '250.000 COP/MES'
  },
  {
    id: 'a033e38768c82fca90df3db7',
    createdAt: '03/04/2019',
    description: 'Acceso 12/6 a espacios de coworking compartidos, con servicios básicos y conexión a intenet de alta velocidad. Incluye un número limitado de horas en salas de reuniones y acceso a eventos de networking.',
    logo: 'https://bafybeidwnhdez3yjg6w7gpg7esgtzicbj3l5sqehepd5xng3xafegybpfu.ipfs.nftstorage.link/logistic.png',
    title: 'Visionario Flexible',
    price: '380.000 COP/MES'
  },
  {
    id: '1efecb2bf6a51def9869ab0f',
    createdAt: '04/04/2019',
    description: 'Escritorio dedicado y acceso 12/6 a espacios de coworking, con servicios básicos y conexión a intenet de alta velocidad. Incluye un número mayor de horas en salas de reuniones, acceso a eventos de networking y descuentos en servicios adicionales.',
    logo: 'https://bafybeidwnhdez3yjg6w7gpg7esgtzicbj3l5sqehepd5xng3xafegybpfu.ipfs.nftstorage.link/money-management.png',
    title: 'Innovador Dedicado',
    price: '650.000 COP/MES'
  },
  {
    id: '1ed68149f65fbc6089b5fd07',
    createdAt: '04/04/2019',
    description: 'Oficina privada con acceso 12/6, servicios básicos y conexión a intenet de alta velocidad. Incluye un número ilimitado de horas en salas de reuniones, acceso a eventos de networking, descuentos en servicios adicionales y asesoría en áreas de negocio.',
    logo: 'https://bafybeidwnhdez3yjg6w7gpg7esgtzicbj3l5sqehepd5xng3xafegybpfu.ipfs.nftstorage.link/reunion.png',
    title: 'Líder Elite',
    price: '900.000 COP/MES'
  },
  {
    id: '5dab321376eff6177407e887',
    createdAt: '04/04/2019',
    description: 'Membresía para empresas, incluye oficinas privadas, espacios de coworking, acceso a salas de reuniones y eventos de networking. Servicios adicionales como asesoría en áreas de negocio, mentorías y soporte administrativo están incluidos.',
    logo: 'https://bafybeidwnhdez3yjg6w7gpg7esgtzicbj3l5sqehepd5xng3xafegybpfu.ipfs.nftstorage.link/trabajando.png',
    title: 'Corporativo Vanguardista',
    price: '3.000.000 COP/MES'
  },
  {
    id: '5dab321376eff6177407e887',
    createdAt: '04/04/2019',
    description: 'Acceso a todas las instalaciones y servicios del club, incluyendo áreas de trabajo exclusivas, salas de reuniones premium, eventos de networking, asesoría en áreas de negocio, mentorías y acceso a instalaciones y servicios de lujo.',
    logo: 'https://bafybeidwnhdez3yjg6w7gpg7esgtzicbj3l5sqehepd5xng3xafegybpfu.ipfs.nftstorage.link/megafono.png',
    title: 'Titán del Éxito',
    price: '1.500.000 COP/MES'
  }
];

    for(let i=0;i<list.length;i++){

      const query = new Moralis.Query("_User");

      await query.equalTo("planName",list[i].title)     
     await query.equalTo("planActive",true)     
     let object= await query.find()
let numberSusbcription=object.length

empty=[...empty,{
        
  id: i,
  createdAt: list[i].createdAt,
  description: list[i].description,
  logo: list[i].logo,
  title: list[i].title,
  price: list[i].price,
  avaliable:numberSusbcription,
    }]
    }

    setCompanies(empty)

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
