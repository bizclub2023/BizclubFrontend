import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography,Grid,TextField, CircularProgress } from '@mui/material';
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
import { DialogActions } from "@mui/material";

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
let stripePromise;

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe("pk_test_51NV05cGc5cz7uc72xTzSNZNeg3dsIWX9hZo4Y7nZH5WnFF8nuEJJwhSGviE29JHXzm8zovxToQDDVjLzfND57MWj00NdjCWocu");
  }

  return stripePromise;
};

const CustomEditor = ({ scheduler ,handleReserva}) => {
  const event = scheduler.edited;
  const {Moralis}=useMoralis()

  // Make your own form/state
  const [state, setState] = useState({
    title: event?.title || "",
    description: event?.description || ""
  });
  const [error, setError] = useState("");

  const handleChange = (value, name) => {
    setState((prev) => {
      return {
        ...prev,
        [name]: value
      };
    });
  };
  
  function diff_hours(dt2, dt1) 
  {
  var diff =(dt2.getTime() - dt1.getTime()) / 1000;
  diff /= (60 * 60);
  return Math.abs(Math.round(diff));
  }
  const notify3 = () => toast("Las fechas coinciden con otra reserva");

  const handleSubmit = async (res,rej) => {
    // Your own validation
    if (state.title.length < 3) {
      return setError("Min 3 letters");
    }





    try {

      scheduler.loading(true);

      
        
       await new Promise(async (res, rej) => {

        const user = await Moralis.User.current();
        const sevenPMStart = new Date(scheduler.state.start.value);
        const sevenPMEnd = new Date(scheduler.state.end.value);
        sevenPMEnd.setHours(19, 0, 0, 0);
        sevenPMStart.setHours(7, 0, 0, 0);
     
console.log("asdasd "+JSON.stringify(scheduler.state.start.value))
console.log("asdasd2 "+JSON.stringify(scheduler.state.end.value))
console.log("sevenPMEnd "+JSON.stringify(sevenPMEnd))
console.log("sevenPMStart "+JSON.stringify(sevenPMStart))

        if (user) {
          const hoursCalculated = await diff_hours(sevenPMStart, sevenPMEnd);
         

        console.log("hoursCalculated "+hoursCalculated)
  
          const areaName = await Moralis.Cloud.run("getSalon");
  
          // Consultar eventos que se superponen con la nueva reserva
          const query = new Moralis.Query("Reserves");
          query.equalTo("areaName", areaName);
          query.greaterThanOrEqualTo("event.start", sevenPMStart);
          query.lessThanOrEqualTo("event.end", sevenPMEnd);
          let conflictingEvents = await query.find();
  
          // Verificar si hay eventos que se superponen
          if (conflictingEvents.length > 0) {
            notify3();
            rej();
            return;
          }
       //   await setMyEvents([...myEvents, event]);
       let uniqueID2=parseInt((Date.now()+ Math.random()).toString())

       let event={
         
        event_id: uniqueID2,
        title: state.title,
        start: sevenPMStart,
        end: sevenPMEnd,
      }
  
         await handleReserva(event);
         
          await calendarRef.current.scheduler.triggerDialog(true, event);
          setRebuild(!rebuild);
          scheduler.loading(false);

          await res({
            ...event,
            event_id: event.event_id || Math.random(),
          });
        } else {
          notify();
          rej();
        }
   
      scheduler.onConfirm(added_updated_event, event ? "edit" : "create");
      scheduler.close();
      })
    
    } finally {
      
      scheduler.loading(false);
    }
  };
  return (
    <div>
      <div style={{ padding: "1rem" }}>
        <p>Titulo y descripcion de la reserva</p>
        <TextField
          label="Title"
          value={state.title}
          onChange={(e) => handleChange(e.target.value, "title")}
          error={!!error}
          helperText={error}
          fullWidth
        />
        <TextField
          label="Description"
          value={state.description}
          onChange={(e) => handleChange(e.target.value, "description")}
          fullWidth
        />
      </div>
      <DialogActions>
        <Button onClick={scheduler.close}>Cancel</Button>
        <Button onClick={handleSubmit}>Confirm</Button>
      </DialogActions>
    </div>
  );
}
const Page = () => {

const {Moralis}=useMoralis()
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isLoading,setLoading]=useState(false)
  const [eventosdata,setEventos]=useState([])

  const [title,setTitle]=useState([])
 const [error,setError]=useState('')
let eventos=[]
let eventos2=[]

const notify = () => toast("Elige una hora y fecha valida.");
const notify2 = () => toast("No tienes Horas de reserva");
const notify3 = () => toast("Las fechas coinciden con otra reserva");

    async function handleReserva(event){


      if(title===""){
        setError("Falta la reserva")
        return
      }    

       
      let user=await Moralis.User.current()
      let active=await user.get("planActive")
      let hoursCalculated= await diff_hours(event.start,event.end)

      let planName=await user.get("planName");
      if(true){

        if(planName!==""){

      
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
         let meetingHours=user.get("meetingRoomHours")
         console.log("hoursCalculated3 "+hoursCalculated)
          if(areaName==="office8Room"||areaName==="office4Room"||areaName==="office2Room"||!meetingHours||user.get("meetingRoomHours") < hoursCalculated){
             
            
                   

user.set("reservePendingEvent",{

  event_id: uniqueID2,
  title: event.title,
  start: event.start,
  end: event.end,
})
user.set("reservePendingUid",uniqueID)       

user.set("reservePendingTitle",JSON.stringify(event.title) )
user.set("reservePendingAreaName",  {areaName}  )
user.set("reservePendingHours",hoursCalculated )
await user.save()


const stripe = await getStripe();
console.log("entro aqui1")
let stripePrice=""
if(areaName==="shareRoom"){
  stripePrice="price_1O5ZJ2Gc5cz7uc72aYFMTRcG"
}else if(areaName==="deskRoom"){
  stripePrice="price_1O45ZOGc5cz7uc72yJ389dnU"
}else if(areaName==="office2Room"){
  hoursCalculated=1
  stripePrice="price_1O45hvGc5cz7uc72vcAhtn6N"
}else if(areaName==="office4Room"){
  hoursCalculated=1

  stripePrice="price_1O45jGGc5cz7uc72AirdUmP8"
}else if(areaName==="office8Room"){
  hoursCalculated=1

  stripePrice="price_1O45jdGc5cz7uc72mtqcCsij"
}else if(areaName==="meetingRoom"){
  stripePrice="price_1O5qE9Gc5cz7uc727KAXNumG"
}else if(areaName==="trainingRoom"){
  stripePrice="price_1O5ZP9Gc5cz7uc72n1JBgvzB"
}

const { error,cancel, } = await stripe.redirectToCheckout({
  lineItems:[{ 
  price: stripePrice,
  quantity: hoursCalculated,
  }],
   mode: "payment",
  successUrl: `${window.location.origin}/reservasExpress?session_id={CHECKOUT_SESSION_ID}`,
  cancelUrl: `${window.location.origin}/reservasExpress`,
  customerEmail: user?.get("email"),
  
  });


console.log("entro aqui2")


if (error) {
  await Moralis.Cloud.run("setSalon",{room:"meetingRoom"});
  await getEvents()

setLoading(false);
} else if(cancel){
  await Moralis.Cloud.run("setSalon",{room:"meetingRoom"});

await getEvents()


console.log("entro todo")
setLoading(false);
return
};
          } else {

            user.set("meetingRoomHours",user.get("meetingRoomHours")-hoursCalculated)
            

      //  await reserve.save()


        await user.save()
          }
        
       
  console.log("entro aqui3")

      }
  }
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
     setLoading(true)
     setEventos([])

      setValues((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value
      }));
      await Moralis.Cloud.run("setSalon",{room:event.target.value});
      await getEvents()

     

     setLoading(false)

    },
    []
    );
    
   
    const areas = [
     
      {
        value: 'meetingRoom',
        label: 'Salon de Reuniones'
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
      }, {
        value: 'shareRoom',
        label: 'Espacios Compartidos'
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

    function diff_hours(dt2, dt1) 
    {
    var diff =(dt2.getTime() - dt1.getTime()) / 1000;
    diff /= (60 * 60);
    return Math.abs(Math.round(diff));
    }

  
    const calendarRef2 = useRef(null);

    const calendarRef = useRef(null);
    const [rebuild,setRebuild]=useState(false)
    const handleConfirm = async (event, action) => {
      return await new Promise(async (res, rej) => {
        try {
          console.log("testest2")

          const currentDate = new Date();
          const user = await Moralis.User.current();
          const sevenPMStart = new Date(event.start);
          const sevenPMEnd = new Date(event.end);
          sevenPMEnd.setHours(19, 0, 0, 0);
          sevenPMStart.setHours(18, 0, 0, 0);


          if (currentDate <= event.start && currentDate <= event.end && user && (event.start <= sevenPMStart  || event.end <= sevenPMEnd) ) {
           

          
    
            const areaName = await Moralis.Cloud.run("getSalon");
    
            // Consultar eventos que se superponen con la nueva reserva
            let query = new Moralis.Query("Reserves");
            await query.equalTo("areaName", areaName);
            query.limit(1000)
            let conflictingEvents = await query.find();
            console.log("event.start "+JSON.stringify(new Date(event.start)))
            console.log("event.end "+JSON.stringify(new Date(event.end)))
        
            console.log("areaName "+JSON.stringify(areaName))

            console.log("conflictingEvents "+JSON.stringify(conflictingEvents))
            // Verificar si hay eventos que se superponen
            if (conflictingEvents.length > 0) {
              for (let i = 0; i < conflictingEvents.length; i++) {
                const existingEvent = conflictingEvents[i].attributes.event;
            
                // Verificar si hay coincidencia exacta
                if (existingEvent&&
                  existingEvent.start.getTime() === new Date(event.start).getTime() &&
                  existingEvent.end.getTime() === new Date(event.end).getTime()
                ) {
                  notify3();
                  rej();
                  return;
                }
            
                // Verificar si hay superposición
                if (existingEvent&&
                  existingEvent.start < new Date(event.end) &&
                  existingEvent.end > new Date(event.start)
                ) {
                  notify3();
                  rej();
                  return;
                }
              }}
            await setTitle(event.title);
            await setMyEvents([...myEvents, event]);
    
          
    
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
  await Moralis.Cloud.run("setSalon",{room:"meetingRoom"});
  console.log("reservePendingUid "+user.get("reservePendingUid"))
/* 
if(user.get("reservePendingUid"&&!sessionId)){
  let Reserves=Moralis.Object.extend("Reserves")
  let reserve=new Reserves() 
  console.log("npm run dev ")


  reserve.set("uid",user.get("reservePendingUid"))       
  reserve.set("user",user.get("email")) 
  reserve.set("event", user.get("reservePendingEvent") )     
 
  reserve.set("areaName", user.get("reservePendingAreaName").areaName )     
  reserve.set("title", user.get("reservePendingTitle") )    
 
await reserve.save()
  user.set("reservePendingUid",undefined)
  user.set("reservePendingAreaName",undefined)
  user.set("reservePendingTitle","")
  user.set("reservePendingEvent",undefined)
  
  user.set("reservePendingHours",0)
  await reserve.save()

await user.save()

} */

if(sessionId){

  console.log("session "+user.get("sessionIdExpress"))
  console.log("session "+sessionId)
  console.log("session "+user.get("sessionIdExpress")!==sessionId)

if(!user.get("sessionIdExpress")||user.get("sessionIdExpress").toString()!==sessionId.toString()){
  console.log("session "+"entro")
  let session = await stripe.checkout.sessions.retrieve(sessionId);
  console.log("session "+session.payment_status)

  console.log("session "+parseFloat(session.amount_total/100))

  if(session.payment_status=="paid"){

    //user.set("meetingRoomHours",parseFloat(user.get("meetingRoomHours"))+parseFloat(session.amount_total/100)/1);
    user.set("sessionIdExpress",sessionId)
    let Reserves=Moralis.Object.extend("Reserves")

    let reserve=new Reserves() 
    if(user?.get("reservePendingAreaName")){
      
let areanew=user?.get("reservePendingAreaName")?.areaName??"meetingRoom"

  console.log("entroaqui"+user.get("reservePendingUid"))
  console.log("entroaqui"+user.get("reservePendingUid"))
  console.log("entroaqui "+areanew )
  console.log("entroaqui "+user.get("reservePendingTitle"))
  console.log("entroaqui "+user.get("reservePendingEvent"))
 
   reserve.set("uid",user.get("reservePendingUid"))       
   reserve.set("user",user.get("email"))  
   reserve.set("areaName", areanew)     
   reserve.set("title", user.get("reservePendingTitle") )     

   let uniqueID2=parseInt((Date.now()+ Math.random()).toString())
   //user.set("meetingRoomHours",parseFloat(user.get("meetingRoomHours"))+parseFloat(session.amount_total/100)/1)
   
   
  
   reserve.set("event",user.get("reservePendingEvent")) 
   user.set("reservePendingUid",undefined)
   user.set("reservePendingAreaName",undefined)
   user.set("reservePendingTitle","")
   user.set("reservePendingEvent",undefined)
   user.set("sessionIdExpress",undefined)

   user.set("reservePendingHours",0)
   await reserve.save()
await user.save()
console.log("session termino")

}
  }else{

 

}

}
}
 await getEvents()

}


    useEffect(() => {
    
        // componentwillunmount in functional component.
        // Anything in here is fired on component unmount.
  
      fecthstripe()
    
    }, []);
    
    async function getEvents(){
      
      let user=await Moralis.User.current()
      console.log(user.get("email"))
      let userEmail=user.get("email")
      const dataEventos = await Moralis.Cloud.run("getEvents",{email:userEmail});

    setEventos(dataEventos)

    console.log("eventos "+JSON.stringify(dataEventos))
if(dataEventos){
  await  calendarRef.current.scheduler.handleState([...dataEventos], "events")

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
              {values.areaName!=="office8Room"&&values.areaName!=="office4Room"&&values.areaName!=="office2Room"?
              <Scheduler
              key={"uno"}
              events={eventosdata}
              week={{ 
                weekDays: [0, 1, 2, 3, 4, 5, 6], 
                weekStartOn: 6, 
                startHour: 7, 
                endHour: 20,
                step: 60,
                navigation: true,
                disableGoToDay: false
                }}
                day={null}
                month={null}
              ref={calendarRef}
              en
              navigation={true}
              view={"week"}
              hourFormat='12'
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
              
              onConfirm={handleConfirm}
              
              eventRenderer={(event) => {
               
                
                if (+event.event_id % 2 === 0) {
              
                  return (<div
                    key={event.event_id}

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
              />:null} 
              {values.areaName==="office2Room"||values.areaName==="office4Room"||values.areaName==="office8Room"?
              <Scheduler
              key={"uno2"}

              events={eventosdata}
              week={null}
              customEditor={(scheduler) => <CustomEditor handleReserva={handleReserva} scheduler={scheduler} />}

              navigation={true}

              editable={true}
                day={null}
                month={{ 
                  weekDays: [0, 1, 2, 3, 4, 5, 6], 
                  weekStartOn: 6, 
                  startHour: 7, 
                  endHour: 20,
                  step: 1340,
                  navigation: false,
                  disableGoToDay: false
                  }}
              ref={calendarRef2}
              en
              view={"week"}
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
              
              onConfirm={handleConfirm}
              
              eventRenderer={(event) => {
               
                
                if (+event.event_id % 2 === 0) {
              
                  return (<div
                  key={event.event_id}
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
                     
                    </div>
                  );
                }
                return null;
              }}
              />:null}

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
