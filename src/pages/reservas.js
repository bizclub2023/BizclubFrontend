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

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Alert from '@mui/material/Alert';
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
  const customers = useCustomers(page, rowsPerPage);
  const customersIds = useCustomerIds(customers);
  const customersSelection = useSelection(customersIds);

  const [title,setTitle]=useState([])
  var [rowsDate,setRowsDate]=useState([]) 
  const [date, setDate] = useState(null);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handlePageChange = useCallback(
    (event, value) => {
      setPage(value);
    },
    []
  );
  function handleDate(){  
 }
 const [error,setError]=useState('')
let eventos=[]
const notify = () => toast("Elige la fecha de hoy o dias futuros");
const notify2 = () => toast("No tienes Horas de Reserva");

const fetchData=()=>{
  
}
async function handleReserva(event){

  console.log("Falta la reserva"+event.title)

    if(title===""){
      
      setError("Falta la reserva")
      return
    }
       
    let user=await Moralis.User.current()
let active=await user.get("planActive")

let planName=await user.get("planName");
      if(active){
        if(planName=="Explorador"){
          setError("No tienes Horas de Reserva")

            return
        }
        if(planName=="Emprendedor Express"){
          if(user.get("meetingRoomHours")<=0){
            setError("No tienes Horas de Reserva")

            return
          }else{
            let hoursCalculated=await diff_hours(event.start,event.end)
            console.log("hoursCalculated "+hoursCalculated)   
                     console.log("meetingRoomHours "+user.get("meetingRoomHours"))

            user.set("meetingRoomHours",user.get("meetingRoomHours")-hoursCalculated)
          }
          
      }
      if(planName=="Visionario Flexible"){
        if(user.get("meetingRoomHours")<=0){
          console.log("no puede")
          return
        }
    }
    if(planName=="Innovador Dedicado"){
      if(user.get("meetingRoomHours")<=0){
        console.log("no puede")
        return
      }
  }
  if(planName=="Líder Elite"){
    if(user.get("meetingRoomHours")<=0){
      console.log("no puede")
      return
    }
}
if(planName=="Corporativo Vanguardista"){
  if(user.get("meetingRoomHours")<=0){
    console.log("no puede")
    return
  }
}
if(planName=="Titán del Éxito"){
  if(user.get("meetingRoomHours")<=0){
    console.log("no puede")
    return
  }
}
  await user.save()

      }
/* 
const query = new Moralis.Query("Reserves");
await query.equalTo("areaName",values.areaName)
let res=await query.first()
console.log("res "+JSON.stringify(res))
 */
  const Reserves=Moralis.Object.extend("Reserves")

   const reserve=new Reserves() 
   let uniqueID=parseInt((Date.now()+ Math.random()).toString())
   reserve.set("uid",uniqueID)       
   console.log("email "+user.get("email"))

   reserve.set("user",user.get("email"))  
   if(values.areaName!==""){
    reserve.set("areaName",values.areaName)     
   } else{
    reserve.set("areaName",areas[0].label)     
   } 
  reserve.set("title",JSON.stringify(event.title)  )   
 let eventitos=[]
 console.log("myevent "+(JSON.stringify(event)))
 console.log("myevent "+(JSON.stringify(event.start)))


  console.log("myevents "+(eventitos))
  let uniqueID2=parseInt((Date.now()+ Math.random()).toString())

  reserve.set("event",{
  
    event_id: uniqueID2,
    title: event.title,
    start: event.start,
    end: event.end,
  }) 
  await reserve.save()

    setValues({   areaName: '',
    title: '',
    comentary: '',})


setError("")


}
  const handleRowsPerPageChange = useCallback(
    (event) => {
      setRowsPerPage(event.target.value);
    },
    []
  );

  const [values, setValues] = useState({
    areaName: '',
    title: '',
    comentary: '',

  });
  const handleChange = useCallback(
    (event) => {
      setValues((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value
      }));
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
      },
      {
        value: 'commonRoom',
        label: 'Salon Comun'
      }
    ];
    const columnsDate = [
      { field: 'id', headerName: 'id', width: 70 },
      { field: 'date', headerName: 'date', width: 500 },
    
    ];
  
     var [myEvents,setMyEvents] = useState([]);

    function diff_hours(dt2, dt1) 
    {
    var diff =(dt2.getTime() - dt1.getTime()) / 1000;
    diff /= (60 * 60);
    return Math.abs(Math.round(diff));
    }
  
    const calendarRef = useRef(null);
    const handleConfirm = async (event, action) => {

      return new Promise(async (res, rej) => {
        if (action === "edit") {
         console.log("Edited");
        } else if (action === "create") {
          console.log("Created");
        }

        var currentDate=new Date()
            
        let user=await Moralis.User.current()

        if(currentDate<=event.start&&currentDate<=event.end&&user){
        
            
      
        setTimeout(async () => {
          await  setTitle(event.title)
          await setMyEvents([...myEvents,event])
          if(user?.get("meetingRoomHours")<=0){

            notify2()
            rej();
            return
          }

           await handleReserva(event)
           await calendarRef.current.scheduler.triggerDialog(true, event
        )
          await  res({
              ...event,
              event_id: event.event_id || Math.random()
            });
       
        }, 2000);
        
 
      }else{
        notify()
           rej();
      
      
      }
      
      return
      });
    }
    
 async function getEvents(){


  const query = new Moralis.Query("Reserves");
  
  if(values.areaName!==""){

    await query.equalTo("areaName",values.areaName)     
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
        color: "#50b500"
      }]
   
    }
    calendarRef.current.scheduler.handleState([...eventos], "events")
  }
}else{
  await query.equalTo("areaName",areas[0].label)     
  let object= await query.find()
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
      color: "#50b500"
    },]

      

  }
  calendarRef.current.scheduler.handleState([...eventos], "events")
}
}


  }
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
        {values.areaName=="Salon Comun"?
        <Scheduler
      events={eventos}
      ref={calendarRef}

      view="month"
      month={{
        weekDays: [0, 1, 2, 3, 4, 5], 
        weekStartOn: 6, 
        startHour: 7, 
        endHour: 19,
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
    />:

<Scheduler
events={eventos}
ref={calendarRef}

view="week"

week={{ 
weekDays: [0, 1, 2, 3, 4, 5,6], 
weekStartOn: 6, 
startHour: 7, 
endHour: 19,
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
        }
             
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
