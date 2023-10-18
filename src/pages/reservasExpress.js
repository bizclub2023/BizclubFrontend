import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography,Grid,TextField } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { applyPagination } from 'src/utils/apply-pagination';
import { Scheduler } from "@aldabil/react-scheduler";
import {  useMoralis } from 'react-moralis';
import NextLink from 'next/link';
import { OverviewPlan } from 'src/sections/overview/overview-plan';
import { loadStripe } from "@stripe/stripe-js";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Alert from '@mui/material/Alert';
import { useRouter } from 'next/router';
const stripe = require('stripe')("sk_test_51NV05cGc5cz7uc72E4yYvZZ2odhvKM3OT55PB7o0Uor8wWcAqZepAMvY77mwge9lk9fx8hXNo4fgXWJPfN1RAg4y00Z0xpoCXr");

import { useCallback,useRef, useMemo, useState, useEffect } from 'react';
import { OverviewPlanExpress } from 'src/sections/overview/overview-plan-express';
const now = new Date();
const EVENTS = [
  {
    event_id: 1,
    title: "Event 1",
    start: new Date(new Date(new Date().setHours(9)).setMinutes(0)),
    end: new Date(new Date(new Date().setHours(10)).setMinutes(0)),
    disabled: true,
    admin_id: [1, 2, 3, 4]
  },
  {
    event_id: 2,
    title: "Event 2",
    start: new Date(new Date(new Date().setHours(10)).setMinutes(0)),
    end: new Date(new Date(new Date().setHours(12)).setMinutes(0)),
    admin_id: 2,
    color: "#50b500"
  },
  {
    event_id: 3,
    title: "Event 3",
    start: new Date(new Date(new Date().setHours(11)).setMinutes(0)),
    end: new Date(new Date(new Date().setHours(12)).setMinutes(0)),
    admin_id: 1,
    editable: false,
    deletable: false
  },
  {
    event_id: 4,
    title: "Event 4",
    start: new Date(
      new Date(new Date(new Date().setHours(9)).setMinutes(30)).setDate(
        new Date().getDate() - 2
      )
    ),
    end: new Date(
      new Date(new Date(new Date().setHours(11)).setMinutes(0)).setDate(
        new Date().getDate() - 2
      )
    ),
    admin_id: 2,
    color: "#900000"
  },
  {
    event_id: 5,
    title: "Event 5",
    start: new Date(
      new Date(new Date(new Date().setHours(10)).setMinutes(30)).setDate(
        new Date().getDate() - 2
      )
    ),
    end: new Date(
      new Date(new Date(new Date().setHours(14)).setMinutes(0)).setDate(
        new Date().getDate() - 2
      )
    ),
    admin_id: 2,
    editable: true
  },
  {
    event_id: 6,
    title: "Event 6",
    start: new Date(
      new Date(new Date(new Date().setHours(10)).setMinutes(30)).setDate(
        new Date().getDate() - 4
      )
    ),
    end: new Date(new Date(new Date().setHours(14)).setMinutes(0)),
    admin_id: 2
  }
];

const data = [
  {
    id: '5e887ac47eed253091be10cb',
    address: {
      city: 'Cleveland',
      country: 'USA',
      state: 'Ohio',
      street: '2849 Fulton Street'
    },
    avatar: 'https://bafybeich6o5bnenfzwhikujw62embrwsuijxhymlwc67pzr46i33ktvq6e.ipfs.nftstorage.link/crisis.png',
    createdAt: subDays(subHours(now, 7), 1).getTime(),
    email: 'carson.darrin@devias.io',
    name: 'Te quedan 10 dias de plan ',
    phone: '304-428-3097'
  },
  {
    id: '5e887b209c28ac3dd97f6db5',
    address: {
      city: 'Atlanta',
      country: 'USA',
      state: 'Georgia',
      street: '1865  Pleasant Hill Road'
    },
    avatar: 'https://bafybeich6o5bnenfzwhikujw62embrwsuijxhymlwc67pzr46i33ktvq6e.ipfs.nftstorage.link/crisis.png',
    createdAt: subDays(subHours(now, 1), 2).getTime(),
    email: 'fran.perez@devias.io',
    name: 'Te quedan 30 dias de plan',
    phone: '712-351-5711'
  },
  {
    id: '5e887b7602bdbc4dbb234b27',
    address: {
      city: 'North Canton',
      country: 'USA',
      state: 'Ohio',
      street: '4894  Lakeland Park Drive'
    },
    avatar: 'https://bafybeie4rl6impamxhmsmt46lztkpfcqmonjl25uffqsrrtnzj4rbgqiou.ipfs.nftstorage.link/alerta.png',
    createdAt: subDays(subHours(now, 4), 2).getTime(),
    email: 'jie.yan.song@devias.io',
    name: 'Plan Cancelado.',
    phone: '770-635-2682'
  },
];
const style = {
  position: 'absolute' ,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const useCustomers = (page, rowsPerPage) => {
  return useMemo(
    () => {
      return applyPagination(data, page, rowsPerPage);
    },
    [page, rowsPerPage]
  );
};

const useCustomerIds = (customers) => {
  return useMemo(
    () => {
      return customers.map((customer) => customer.id);
    },
    [customers]
  );
};

const Page = () => {

const {Moralis}=useMoralis()
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [title,setTitle]=useState([])
 const [error,setError]=useState('')
let eventos=[]
const notify = () => toast("Elige la fecha de hoy o dias futuros");
const notify2 = () => toast("No tienes Horas de reserva");
const notify3 = () => toast("Las fechas coinciden con otra reserva");

    async function handleReserva(event){


      if(title===""){
        setError("Falta la reserva")
        return
      }    

       
      let user=await Moralis.User.current()
      let active=await user.get("planActive")

      let planName=await user.get("planName");
      if(active){

        if(planName!==""){
          if(user.get("meetingRoomHours")<=0){
            setError("No tienes Horas de Reserva")
            return
          } else {
            let hoursCalculated= await diff_hours(event.start,event.end)

            user.set("meetingRoomHours",user.get("meetingRoomHours")-hoursCalculated)
          }
        }
       



  await user.save()

      }
      
  const Reserves=Moralis.Object.extend("Reserves")

   const reserve=new Reserves() 
   let uniqueID=parseInt((Date.now()+ Math.random()).toString())
   reserve.set("uid",uniqueID)       

   reserve.set("user",user.get("email"))  
   let areaName=await Moralis.Cloud.run("getSalon")
   console.log("areaName "+values.areaName)
   if(areaName!=="") {  
    reserve.set("areaName", areaName )     
   } else {
    reserve.set("areaName",areas[0].value)     
   } 
  reserve.set("title",JSON.stringify(event.title)  )   
 let eventitos=[]


  let uniqueID2=parseInt((Date.now()+ Math.random()).toString())

  reserve.set("event",{
  
    event_id: uniqueID2,
    title: event.title,
    start: event.start,
    end: event.end,
  }) 
  await reserve.save()
return true




}
  const handleRowsPerPageChange = useCallback(
    (event) => {
      setRowsPerPage(event.target.value);
    },
    []
  );
var areaFinal=""
  const [values, setValues] = useState({
    areaName:  "",
    title: '',
    comentary: '',

  });
  const handleChange = useCallback(
    async (event) => {
     
      setValues((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value
      }));
      console.log("event.target.value "+event.target.value)
      if(event.target.name==='areaName'){
       await Moralis.Cloud.run("setSalon",{room:event.target.value});
       getEvents()

     }
     console.log("getSalon"+JSON.stringify(Moralis.Cloud.run("getSalon")))

    },
    []
    );
    useEffect(() => {
        getEvents()

    }, [values]);
   
    const areas = [
      {
        value: 'shareRoom',
        label: 'Espacios Compartidos'
      },
      {
        value: 'deskRoom',
        label: 'Escritorios Dedicados'
      },
      {
        value: 'office2Room',
        label: 'Oficina Privada para 2 personas'
      }  ,
      {
        value: 'office4Room',
        label: 'Oficina Privada para 4 personas'
      },{
        value: 'office8Room',
        label: 'Oficina Privada para 8 personas'
      },
      {
        value: 'meetingRoom',
        label: 'Salon de Reuniones'
      },
      {
        value: 'trainingRoom',
        label: 'Salon de Entrenamiento'
      }  
    ];
    const columnsDate = [
      { field: 'id', headerName: 'id', width: 70 },
      { field: 'date', headerName: 'date', width: 500 },
    ];
    var [sessionIdCancel,setSessionId] = useState("");

     var [myEvents,setMyEvents] = useState([]);
     var [hoursQuantity,setHoursQuantity] = useState([]);

    function diff_hours(dt2, dt1) 
    {
    var diff =(dt2.getTime() - dt1.getTime()) / 1000;
    diff /= (60 * 60);
    return Math.abs(Math.round(diff));
    }

  
    const calendarRef = useRef(null);
    const [rebuild,setRebuild]=useState(false)
    const handleConfirm = async (event, action) => {
      return await new Promise(async (res, rej) => {
        try {
          
          const currentDate = new Date();
          const user = await Moralis.User.current();
          const sevenPMStart = new Date(event.start);
          const sevenPMEnd = new Date(event.end);
          sevenPMEnd.setHours(19, 0, 0, 0);
          sevenPMStart.setHours(18, 0, 0, 0);

          console.log("sevenPMEnd "+JSON.stringify(event.start <= sevenPMStart  ))

          console.log("sevenPMEnd "+JSON.stringify(event.end <= sevenPMEnd ))

          if (currentDate <= event.start && currentDate <= event.end && user && (event.start <= sevenPMStart  || event.end <= sevenPMEnd) ) {
            const hoursCalculated = await diff_hours(event.start, event.end);
    
            if (user.get("meetingRoomHours") < hoursCalculated) {
              
    const stripe = await getStripe();
    const { error,  } = await stripe.redirectToCheckout({
      lineItems:[{
        price: "price_1NmmfHGc5cz7uc72XfkNheqy",
        quantity: hoursQuantity,
      }],
      mode: "payment",
      successUrl: `${window.location.origin}/reservasExpress`,
      cancelUrl: `${window.location.origin}/reservasExpress`,
      customerEmail: user?.get("email"),

    });





    
    if (error) {
       setLoading(false);
     } else{
      console.log("entro todo")
      setLoading(false);

     };
              notify2();
              rej();
              return;
            }
    
            const areaName = await Moralis.Cloud.run("getSalon");
    
            // Consultar eventos que se superponen con la nueva reserva
            const query = new Moralis.Query("Reserves");
            query.equalTo("areaName", areaName);
            query.greaterThanOrEqualTo("event.start", event.start);
            query.lessThanOrEqualTo("event.end", event.end);
            let conflictingEvents = await query.find();
    
            // Verificar si hay eventos que se superponen
            if (conflictingEvents.length > 0) {
              notify3();
              rej();
              return;
            }
            if(user.get("meetingRoomHours") <= 0){

            }
            await setTitle(event.title);
            await setMyEvents([...myEvents, event]);
    
            if (user.get("meetingRoomHours") <= 0) {
              notify2();
              rej();
              return;
            }
    
           await handleReserva(event);
           
            await calendarRef.current.scheduler.triggerDialog(true, event);
            setRebuild(!rebuild);
    
            await res({
              ...event,
              event_id: event.event_id || Math.random(),
            });
          } else {
            notify();
            rej();
          }
        } catch (error) {
          console.error("Error al confirmar el evento:", error);
          rej();
        }
      });
    };
    
  const router=useRouter();
  const sessionId=useRouter().query.session_id ;
  function obtenerFechaMas30Dias() {
    var fechaHoy = new Date();
    var fechaMas30Dias = new Date(fechaHoy.getTime() + (30 * 24 * 60 * 60 * 1000));
    var formatoISO = fechaMas30Dias.toISOString();
    
    return formatoISO;
  }
async function fecthstripe(){
  let user=await Moralis.User.current()
 

 console.log("salon ppl "+await Moralis.Cloud.run("getSalon"))

 if(user.get("sessionId")) {
   let session2 = await stripe.checkout.sessions.retrieve(user.get("sessionId"));
   if(session2.payment_status=="paid"){
      return
   }
 }

  if(session.payment_status=="paid"){

  }else{

  if(user.get("planActive")){
  }else{

  router.push('/services');
  }

}

}


    useEffect(() => {
    
        // componentwillunmount in functional component.
        // Anything in here is fired on component unmount.
  
      fecthstripe()
    
    }, []);
    
    async function getEvents(){
      let user=await Moralis.User.current()
let salon=await Moralis.Cloud.run("getSalon")
  const query =await new Moralis.Query("Reserves");
  
  if(salon==="meetingRoom"){
    await query.equalTo("areaName","meetingRoom")

  } else if(salon==="trainingRoom"){
    await query.equalTo("areaName","trainingRoom")

  } else if(salon==="office8Room"){
    await query.equalTo("areaName","office8Room")

  } else if(salon==="office4Room"){
    await query.equalTo("areaName","office4Room")

  } else if(salon==="office2Room"){
    await query.equalTo("areaName","office2Room")

  } else if(salon==="deskRoom"){
    await query.equalTo("areaName","deskRoom")

  } else if(salon==="shareRoom"){
    await query.equalTo("areaName","shareRoom")

  }  else{
   await query.equalTo("areaName","shareRoom")

  }
  await query.limit(1000)
    let object= await query.find()
    eventos=[]
console.log("object "+JSON.stringify(object))
  if(object){
    
    for(let i=0;i<object.length;i++){ 
      
      eventos=[...eventos,{
        event_id: null,
        title: object[i].attributes.title,
        start: object[i].attributes.event.start,
        end: object[i].attributes.event.end,
        admin_id: 1,
        editable: false,
        deletable: false,
        color: user.get("email")===object[i].attributes.user?"red":"#50b500"
      }]
   
    }
    console.log("eventos "+JSON.stringify(salon))

    console.log("eventos "+JSON.stringify(eventos))
    await  calendarRef.current.scheduler.handleState([...eventos], "events")
  }


  }   
  const cancelSubscription = async (subscriptionId) => {
    try {
      const canceledSubscription = await stripe.subscriptions.del(subscriptionId);
      // Handle success (e.g., update your database to reflect the canceled subscription)
      console.log('Subscription canceled:', canceledSubscription);
    } catch (error) {
      // Handle error (e.g., show an error message to the user)
      console.error('Error canceling subscription:', error);
    }
  };
  return (
    <>
      <Head>
        <title>
          Reservaciones | Bizclub
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
      <Container maxWidth="lg">
        
          <div>
            <Typography alignSelf={"center"} variant="h4">
              RESERVACIONES EXPRESS
            </Typography>
          </div>
        <Stack spacing={0}>
          
        <OverviewPlanExpress rebuild={rebuild} difference={16}/>
 
          <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
            Area de Interes
          </Typography>
          
          <TextField
                  fullWidth
                  name="areaName"
                  onChange={handleChange}
                  required
                  select
                  hiddenLabel
                  SelectProps={{ native: true }}
                  value={values.areaName}
                >
                  {areas.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  ))}
                </TextField>
     

<Scheduler
events={eventos}
ref={calendarRef}

view="week"
translations={{
  navigation: {
  month: "Mes",
  week: "Semana",
  day: "Dia",
  today: "Hoy"
  },
  form: {
  addTitle: "Haz una reservacion",
  editTitle: "Edit Event",
  confirm: "Confirm",
  delete: "Delete",
  cancel: "Cancel"
  },
  event: {
  title: "Title",
  start: "Start",
  end: "End",
  allDay: "All Day"
 },
  validation: {
  required: "Required",
  invalidEmail: "Invalid Email",
  onlyNumbers: "Only Numbers Allowed",
  min: "Minimum {{min}} letters",
  max: "Maximum {{max}} letters"
  },
  moreEvents: "More...",
  loading: "Loading..."
 }}
week={{ 
weekDays: [0, 1, 2, 3, 4, 5, 6], 
weekStartOn: 6, 
startHour: 7, 
endHour: 20,
step: 60,
navigation: true,
disableGoToDay: false
}}
onConfirm={handleConfirm}

eventRenderer={(event) => {
 
  
  if (+event.event_id % 2 === 0) {

    return (<div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
          background: "#757575"
        }}
      >
        <div
          style={{ height: 20, background: "#ffffffb5", color: "black" }}
        >
          {event.start.toLocaleTimeString("en-US", {
            timeStyle: "short"
          })}
        </div>
        <div>{event.title}</div>
        <div
          style={{ height: 20, background: "#ffffffb5", color: "black" }}
        >
          {event.end.toLocaleTimeString("en-US", { timeStyle: "short" })}
        </div>
      </div>
    );
  }
  return null;
}}
/>
         
        <ToastContainer />
                {error!==""?  <Alert variant="outlined" severity="error">{error}</Alert>:null}

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
