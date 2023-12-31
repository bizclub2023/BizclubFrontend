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
const stripe = require('stripe')("pk_live_51NV05cGc5cz7uc72FsRnXnRLG6lH4JRQu1nbngguiQRqotxj3nYOHj7iScTHm1DQGfh38AHrfzzpFvQMzAOWkHp700evWRcuXU");

import { useCallback,useRef, useMemo, useState, useEffect } from 'react';
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
            let hoursCalculated=await diff_hours(event.start,event.end)

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
   if(areaName!==""){
  
    reserve.set("areaName", areaName )     
   } else{
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


setError("")


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

      if(event.target.name==='areaName'){
        Moralis.Cloud.run("setSalon",{room:event.target.value});

     }
    },
    []
    );
    useEffect(() => {
        getEvents()

    }, [values.areaName]);

    const areas = [
      {
        value: 'meetingRoom',
        label: 'Salon de Reuniones'
      },/* 
      {
        value: 'commonRoom',
        label: 'Sala de uso compartido'
      }  */
    ];
    const columnsDate = [
      { field: 'id', headerName: 'id', width: 70 },
      { field: 'date', headerName: 'date', width: 500 },
    
    ];
    var [sessionIdCancel,setSessionId] = useState("");

     var [myEvents,setMyEvents] = useState([]);
     
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
          if (currentDate <= event.start && currentDate <= event.end && user && (event.start <= sevenPMStart  || event.end <= sevenPMEnd)) {
            const hoursCalculated = await diff_hours(event.start, event.end);
    
            if (user.get("meetingRoomHours") < hoursCalculated) {
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
 console.log(" fecthstripe")
 await Moralis.Cloud.run("setSalon",{room:"meetingRoom"});

 console.log("salon ppl "+await Moralis.Cloud.run("getSalon"))

  if(sessionId||user.get("sessionId")){
    var session="";
    var session2="";

if(sessionId){
   session = await stripe.checkout.sessions.retrieve(sessionId);

}else if(user.get("sessionId")) {
   session2 = await stripe.checkout.sessions.retrieve(user.get("sessionId"));
   if(session2.payment_status=="paid"){
    const query = new Moralis.Query("_User");


      query.equalTo("sessionId",sessionId)
      let total=await query.find()
      if(total.length>0){
        console.log("total "+JSON.stringify(total))
        console.log("total "+JSON.stringify(total[0].attributes.sessionId))

    setSessionId(total[0].attributes.sessionId)
    
   }
   return
}
 }

  if(session.payment_status=="paid"){
setSessionId(sessionId)
    

      const fechaEnUnMes = obtenerFechaMas30Dias();
    const hoy = new Date();
console.log("entro2")
   
        console.log("Exito");
        user.set("planActive",true)
        user.set("stripeEmail",session.customer_email)
        console.log("stripeId "+JSON.stringify(session))
console.log("stripeId "+session.stripe_id)
console.log("stripeId "+session.stripeId)

        user.set("planEnd",fechaEnUnMes)
        user.set("payment_status",session.payment_status)
        user.set("sessionId",sessionId)

        if(parseFloat(session.amount_total/100)==20){
 
            user.set("planName","Explorador")
            user.set("meetingRoomHours",0);
            user.set("planActive",true);
            user.set("planUsers",1);

        }
        if(parseFloat(session.amount_total/100)==30){

          user.set("planName","Emprendedor Express")
          user.set("meetingRoomHours",3);
          user.set("planActive",true);
          user.set("planUsers",1);

      }
      if(parseFloat(session.amount_total/100)==40){

        user.set("planName","Visionario Flexible")
        user.set("meetingRoomHours",5);
        user.set("planActive",true);
        user.set("planUsers",1);

    }
    if(parseFloat(session.amount_total/100)==60){

      user.set("planName","Innovador Dedicado")
      user.set("meetingRoomHours",8);
      user.set("planActive",true);
      user.set("planUsers",1);

  }
  if(parseFloat(session.amount_total/100)==70){

    user.set("planName","Líder Elite")
    user.set("meetingRoomHours",8);
    user.set("planActive",true);
    user.set("planUsers",2);


}

if(parseFloat(session.amount_total/100)==80){

  user.set("planName","Corporativo Vanguardista")
  user.set("meetingRoomHours",10);
  user.set("planActive",true);
  user.set("planUsers",8);

}

if(parseFloat(session.amount_total/100)==90){

  user.set("planName","Titán del Éxito")
  user.set("meetingRoomHours",10);
  user.set("planActive",true);
  user.set("planUsers",4);

}
       await user.save()
      
}else{

  if(user.get("planActive")){
  }else{

  router.push('/services');
  }

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
  console.log("getEvents salon "+salon)
  await setValues({areaName:salon})
  if(salon==="meetingRoom"){
    await query.equalTo("areaName","meetingRoom")
 
  }else if(salon==="commonRoom"){
    await query.equalTo("areaName","commonRoom")

  }else{
   await query.equalTo("areaName","meetingRoom")

  }
  await query.limit(1000)
    let object= await query.find()
    eventos=[]

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
      <Container   maxWidth="lg">
        
      <div >
            <Typography alignSelf={"center"} variant="h4">
              RESERVACIONES
            </Typography>
          </div>
        <Stack spacing={0}>
        <OverviewPlan rebuild={rebuild} difference={16}/>
 
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
weekDays: [0, 1, 2, 3, 4, 5,6], 
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

    return (
      <div
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
