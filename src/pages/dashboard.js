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
import { DataGrid } from '@mui/x-data-grid';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Alert from '@mui/material/Alert';
import { useCallback,useRef, useMemo, useState, useEffect } from 'react';
import { OverviewSales } from 'src/sections/overview/overview-sales';
import { OverviewTotalProfit } from 'src/sections/overview/overview-total-profit';
import { OverviewTotalCustomers } from 'src/sections/overview/overview-total-customers';
import { OverviewBudget } from 'src/sections/overview/overview-budget';
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
 const [reserves,setTotalReserves]=useState('')
 const [users,setTotalUsers]=useState('')
 const [profits,setTotalProfits]=useState(0)

 const [error,setError]=useState('')
let eventos=[]
const notify = () => toast("Elige la fecha de hoy o dias futuros");
const fetchData=async ()=>{
  const query = new Moralis.Query("Reserves");

  let res=await query.find()
  console.log("res "+res.length)
  setTotalReserves(res.length)

  const query2 = new Moralis.Query("User");
  let res2=await query2.find()
  setTotalUsers(res2.length)

  console.log("res1 "+res2.length)

}
async function handleReserva(event){

  console.log("Falta la reserva"+event.title)

    if(title===""){
      
      setError("Falta la reserva")
      return
    }
    

/* 
const query = new Moralis.Query("Reserves");
await query.equalTo("areaName",values.areaName)
let res=await query.first()
console.log("res "+JSON.stringify(res))
 */
  const Reserves=Moralis.Object.extend("Reserves")
  let user=await Moralis.User.current()

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
    fetchData()
    fetchUsuarios()
  }, [values.areaName]);

  const areas = [
    {
      value: 'Salon1',
      label: 'Salon1'
    },
    {
      value: 'Salon2',
      label: 'Salon2'
    },
    {
      value: 'Salon3',
      label: 'Salon3'
    },
    {
      value: 'Salon4',
      label: 'Salon4'
    }
  ];
  const columnsDate = [
    { field: 'id', headerName: 'id', width: 70 },
    { field: 'date', headerName: 'date', width: 500 },
   
  ];
  
  var [myEvents,setMyEvents] = useState([]);

    const calendarRef = useRef(null);
    function diff_hours(dt2, dt1) 
 {

  var diff =(dt2.getTime() - dt1.getTime()) / 1000;
  diff /= (60 * 60);
  return Math.abs(Math.round(diff));
  
 } 
   var [rowsCourse,setRowsCourse]=useState([])

  const columnsCourse = [
    { field: 'id', headerName: 'id', width: 70 },
    { field: 'email', headerName: 'correo', width: 200 },

    { field: 'planName', headerName: 'nombrePlan', width: 200 },

    { field: 'meetingRoomHours', headerName: 'horasReuniones', width: 200 },
    { field: 'planActive', headerName: 'planActive', width: 200 },

  ];
  
  const fetchUsuarios = async () => {
 
    const query = new Moralis.Query("User");

    const object = await query.find();
     let courses=[]
     console.log(JSON.stringify(object))
    for(let i=0;i<object.length;i++){
      console.log(JSON.stringify(object[i].attributes.planActive))

      courses=[...courses,{
        id:i,
        planName:object[i].attributes.planName?object[i].attributes.planName:"No plan", 
        email:object[i].attributes.username,
  
        meetingRoomHours:object[i].attributes.meetingRoomHours??0,
        planActive:object[i].attributes.planActive??false,

       }]
  
        
    }
    setRowsCourse([...courses])

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
              Panel de Control
            </Typography>
          </div>
          
        <Stack spacing={0}>
        <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <OverviewTotalCustomers  positive={false}
          sx={{ height: '100%' }}
          value={users}/>
          </Grid>
        <Grid
            xs={12}
            sm={6}
            lg={3}
          > 
           <OverviewTotalProfit difference={16}
          positive={false}
          sx={{ height: '100%' }}
          value={profits}/>
           <OverviewBudget difference={16}
          positive={false}
          sx={{ height: '100%' }}
          value={reserves}/>
          </Grid>
         {/*   <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
               Area de Interes
           </Typography>
           
          <TextField
                  fullWidth
                  
                  name="areaName"
                  onChange={handleChange}
                  required
                  hiddenLabel
                  defaultValue={areas[0]}
                  select
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
                </TextField> */}
                  <Box         style={{marginTop:30,height:300}}
>
      <DataGrid
        rows={rowsCourse}
        columns={columnsCourse}

      />
      </Box>{/* 
        <Scheduler
      events={eventos}
      ref={calendarRef}

      view="week"
      day={null}
      month={null}

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
              */}
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
