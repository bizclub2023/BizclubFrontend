import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography,Grid,TextField,Card,Avatar ,CardContent, CircularProgress} from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { applyPagination } from 'src/utils/apply-pagination';
import { Scheduler } from "@aldabil/react-scheduler";
import {  useMoralis } from 'react-moralis';
import NextLink from 'next/link';
import { DataGrid } from '@mui/x-data-grid';
import CurrencyDollarIcon from '@heroicons/react/24/solid/CurrencyDollarIcon';
import BootstrapTable from 'react-bootstrap-table-next';
import MaterialTable from 'material-table';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Alert from '@mui/material/Alert';
import { useCallback,useRef, useMemo, useState, useEffect } from 'react';
import { OverviewSales } from 'src/sections/overview/overview-sales';
import { OverviewTotalProfit } from 'src/sections/overview/overview-total-profit';
import { OverviewTotalCustomers } from 'src/sections/overview/overview-total-customers';
import { OverviewBudget } from 'src/sections/overview/overview-budget';
import { ThemeProvider } from '@mui/styles'
import { createTheme } from '@mui/material';
import { forwardRef } from 'react';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
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
  
          const areaName = await Moralis.Cloud.run("getRoom");
  
          // Consultar eventos que se superponen con la nueva reserva
          let query = new Moralis.Query("Reserves");
          await query.equalTo("areaName", areaName);
          query.limit(1000)
          let conflictingEvents = await query.find();
          console.log("event.start "+JSON.stringify(new Date(scheduler.state.start.value)))
          console.log("event.end "+JSON.stringify(new Date(scheduler.state.end.value)))
      
          console.log("areaName "+JSON.stringify(areaName))

          console.log("conflictingEvents "+JSON.stringify(conflictingEvents))
          // Verificar si hay eventos que se superponen
          if (conflictingEvents.length > 0) {
            for (let i = 0; i < conflictingEvents.length; i++) {
              const existingEvent = conflictingEvents[i].attributes.event;
          
              // Verificar si hay coincidencia exacta
              if (
                existingEvent.start.getTime() === new Date(scheduler.state.start.value).getTime() &&
                existingEvent.end.getTime() === new Date(scheduler.state.end.value).getTime()
              ) {
                notify3();
                rej();
                return;
              }
          
              // Verificar si hay superposición
              if (
                existingEvent.start < new Date(event.end) &&
                existingEvent.end > new Date(event.start)
              ) {
                notify3();
                rej();
                return;
              }
            }}
       //   await setMyEvents([...myEvents, event]);
       let uniqueID2=parseInt((Date.now()+ Math.random()).toString())

       let event={
         
        event_id: uniqueID2,
        title: state.title,
        start: sevenPMStart,
        end: sevenPMEnd,
      }
  
     //    await handleReserva(event);
         
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
  const [selectedRow, setSelectedRow] = useState();
  const [data, setData] = useState([]);

const {Moralis}=useMoralis()
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [planUsers,setPlanUsers]=useState(0)

  const [planName,setPlanName]=useState("")
  const [userEmail,setUserEmail]=useState("")
  const [planHours,setPlanHours]=useState("")
  const [selectionModel, setSelectionModel] = useState([]);
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
const notify2 = () => toast("Debes seleccionar el usuario primero");
const notify3 = () => toast("Verifica las horas y fechas");

const notify = () => toast("Elige la fecha de hoy o dias futuros");
const fetchData=async ()=>{
  const query = new Moralis.Query("Reserves");
  query.limit(1000)
  let res=await query.find()
  console.log("res "+res.length)
  setTotalReserves(res.length)

  const query2 = new Moralis.Query("User");
  let res2=await query2.find()
  setTotalUsers(res2.length)
  let datas=[]
 
  setData([...datas]);
 
  console.log("res1 "+res2.length)

}
const onSelectionChange = (selectedRows) => {
  console.log(selectedRows);
};
let userCorreo=""


const [values, setValues] = useState({
  areaName: '',
  title: '',
  userEmail: '',
  comentary: '',
  planUsers: '',

});
const fetchUser=async (e)=>{
  await Moralis.Cloud.run("setSalon",{room:"meetingRoom"});
}
  useEffect(() => {
    fetchData()
    fetchUsuarios()

    fetchUser()
  }, []);

  const onRowClick = async (e, clickedRow) => {

    setSelectedRow(clickedRow);
    setPlanName(clickedRow.planName);
    setPlanHours(clickedRow.meetingRoomHours);
  setUserEmail(clickedRow.email)
  console.log("clickedRow "+clickedRow.email)
  
  setValues({   userEmail:clickedRow.email,planUsers:clickedRow.planUsers})
await Moralis.Cloud.run("setUserEmail",{email:clickedRow.email})

  await getEvents()
console.log(clickedRow.email)

  };

  var [myEvents,setMyEvents] = useState([]);

    const calendarRef = useRef(null);
    function diff_hours(dt2, dt1) 
 {

  var diff =(dt2.getTime() - dt1.getTime()) / 1000;
  diff /= (60 * 60);
  return Math.abs(Math.round(diff));
  
 } 
 const [eventosdata,setEventos]=useState([])

 var [rowsCourseReserves,setRowsCourseReserves]=useState([])

   var [rowsCourse,setRowsCourse]=useState([])
   
  const columnsReserve = [
    { field: 'id', title: 'id' },
    { field: 'user', title: 'correo'},
    { field: 'username', title: 'Nombre' },

    { field: 'start', title: 'Empieza' },
    { field: 'end', title: 'Termina' },
    { field: 'room', title: 'Sala' },

  ];
  const columns = [
    { field: 'id', title: 'id' },
    { field: 'email', title: 'correo'},
    { field: 'username', title: 'Nombre' },

    { field: 'planName', title: 'nombrePlan' },
    { field: 'meetingRoomHoursUsed', title: 'horasReservadas' },

    { field: 'meetingRoomHours', title: 'horasDisponibles' },
    { field: 'planActive', title: 'planActive' },
    { field: 'planUsers', title: 'UsuariosPermitidos' },

  ];
  
const useCustomers = (page, rowsPerPage) => {
  return useMemo(
    () => {
      return applyPagination(data, page, rowsPerPage);
    },
    [page, rowsPerPage]
  );
};

  const customers = useCustomers(page, rowsPerPage);

const useCustomerIds = (customers) => {
  return useMemo(
    () => {
      return customers.map((customer) => customer.id);
    },
    [customers]
  );
};
const customersIds = useCustomerIds(customers);


  const fetchUsuarios = async () => {
  

    const object =  await Moralis.Cloud.run("getAllUsers");
     let courses=[]
     console.log(JSON.stringify(object))
    for(let i=0;i<object.length;i++){
      console.log(JSON.stringify(object[i].attributes.email))
      let horasUsadas=0
      if(object[i].attributes.planName=="Explorador"){
        horasUsadas=0
      }else if(object[i].attributes.planName=="Emprendedor Express"){
        horasUsadas=3-object[i].attributes.meetingRoomHours
      }else if(object[i].attributes.planName=="Visionario Flexible"){
        horasUsadas=5-object[i].attributes.meetingRoomHours
      }else if(object[i].attributes.planName=="Innovador Dedicado"){
        horasUsadas=8-object[i].attributes.meetingRoomHours
      }else if(object[i].attributes.planName=="Líder Elite"){
        horasUsadas=8-object[i].attributes.meetingRoomHours
      }else if(object[i].attributes.planName=="Corporativo Vanguardista"){
        horasUsadas=10-object[i].attributes.meetingRoomHours
      }else if(object[i].attributes.planName=="Titán del Éxito"){
        horasUsadas=10-object[i].attributes.meetingRoomHours
      }
  
      courses=[...courses,{
        id:i,
        planName:object[i].attributes.planName?object[i].attributes.planName:"No plan", 
        email:object[i].attributes.email,
        username:object[i].attributes.username,
        meetingRoomHoursUsed:horasUsadas??0,

        meetingRoomHours:object[i].attributes.meetingRoomHours??0,
        planActive:object[i].attributes.planActive??false,
        planUsers:object[i].attributes.planUsers??0,

       }]
  
        
    }
    setRowsCourse([...courses])

}
 function getUser(){
  return userCorreo
}
const customersSelection = useSelection(customersIds);
const calendarRef2 = useRef(null);

async function getEvents(){
console.log("entro!")
  let salon=await Moralis.Cloud.run("getRoom")

  console.log("salon! "+salon)

 let res= await Moralis.Cloud.run("getEventsAdmin");

    await setRowsCourseReserves([...res.eventosUser])
    await setEventos([...res.eventos])

    console.log("eventoseventosUser "+JSON.stringify(res.eventosUser))
   await calendarRef.current.scheduler.handleState([...res.eventos], "events")
  }


   const [rebuild,setRebuild]=useState(false)


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
  const handleConfirm =  (event, action) => {
    
    return new Promise(async (res, rej) => {


      var currentDate=new Date()
      const sevenPMStart = new Date(event.start);
          const sevenPMEnd = new Date(event.end);
          sevenPMEnd.setHours(19, 0, 0, 0);
          sevenPMStart.setHours(18, 0, 0, 0);

      if(currentDate<=event.start&&currentDate<=event.end && (event.start <= sevenPMStart  || event.end <= sevenPMEnd)){
      

      setTimeout(async () => {

        await  setTitle(event.title)
        await setMyEvents([...myEvents,event])
      console.log(JSON.stringify(event))
        // Consultar eventos que se superponen con la nueva reserva
        let query = new Moralis.Query("Reserves");
        console.log("values.areaName "+JSON.stringify(values.areaName))

        await query.equalTo("areaName", values.areaName);
        query.limit(1000)
        let conflictingEvents = await query.find();
        console.log("event.start "+JSON.stringify(new Date(event.start)))
        console.log("event.end "+JSON.stringify(new Date(event.end)))
    

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
            if (
              existingEvent.start < new Date(event.end) &&
              existingEvent.end > new Date(event.start)
            ) {
              notify3();
              rej();
              return;
            }
          }}
        let res2= await Moralis.Cloud.run("getUserEmail",{event:event});
      console.log("res2 "+JSON.stringify(res2))
        if(!res2.success) {
          rej()
          notify3()
  
          return 
        } else {
          await calendarRef.current.scheduler.triggerDialog(true, event)
          setRebuild(!rebuild)
          await  res({
              ...event,
              event_id: event.event_id || Math.random()
            });

      await getEvents()
       
        }
        

     
      }, 2000);
      

    }else{
      notify()
         rej();
    
    
    }
    
    return
  })
  }
  const [isLoading,setLoading]=useState(false)

  const handleChange = useCallback(
    async (event) => {
     setLoading(true)
      setValues((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value
      }));
      
      if(event.target.name==='areaName'){
        await Moralis.Cloud.run("setRoom",{salon:event.target.value});
        await getEvents()
        setLoading(false)

     }
    },
    []
    );
const selectRow = {
  mode: 'radio',
  clickToSelect: true
};
const mytheme =  createTheme({
});
  return (
    <>
      <Head>
        <title>
          Dashboard | Bizclub
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
        
      <div >
            <Typography alignSelf={"center"} variant="h4">
              Panel de Control
            </Typography>
          </div>
<div >
            <Typography marginTop={10} alignSelf={"center"} variant="h4">
              Todos los usuarios
            </Typography>
          </div>
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
    <Box style={{marginTop:30,marginBottom:40,maxHeight:650}}>
      
    <ThemeProvider theme={mytheme}>

    <MaterialTable
        title="Bizclub Data"
        data={rowsCourse}
        columns={columns}
        icons={tableIcons}
        style={{height:500}}

        onRowClick={onRowClick}
        options={{  
          columnResizable:false,
          emptyRowsWhenPaging: false , 
               sorting: true,
          rowStyle: (row) =>
            row?.id === selectedRow?.id ? { background: "#e7e7e7" } : {},
        }}
        
      />      
        </ThemeProvider>

      </Box>
      
<Card  style={{marginTop:80,justifyContent:"center",alignItems:"center",idth:"100%",height:"250px"}}>
      <CardContent>
        <Stack
          alignItems="flex-start"
          direction="row"
          justifyContent="space-between"
          spacing={3}
        >
          <Stack spacing={1}>
            <Typography
              color="text.secondary"
              variant="overline"
            >
              Plan Actual: {planName}
            </Typography>
            
             
            <Typography variant="h4">
            Horas restantes en sala de reuniones: {planHours}
            </Typography>
            <Typography
              color="text.secondary"
              variant="overline"
            >
              Usuarios Permitidos: {values.planUsers}
            </Typography>
            <Typography
              color="text.secondary"
              variant="overline"
            >
              Usuario: {values.userEmail}
            </Typography>
           
          </Stack>
          <Avatar
            sx={{
              backgroundColor: 'primary.main',
              height: 56,
              width: 56
            }}
          >
            <SvgIcon>
              <CurrencyDollarIcon />
            </SvgIcon>
          </Avatar>
        </Stack>
      </CardContent>
    </Card>
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
                      key={option.value+" text"}
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  ))}
                </TextField>
{!isLoading?<div>

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
                         key={event.event_id+"123"}
                        style={{ height: 20, background: "#ffffffb5", color: "black" }}
                      >
                        {event.start.toLocaleTimeString("en-US", {
                          timeStyle: "short"
                        })}
                      </div>
                      <div key={event.event_id+"1223"}
>{event.title}</div>
                      <div key={event.event_id+"1243"}
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
              customEditor={(scheduler) => <CustomEditor handleReserva={null} scheduler={scheduler} />}

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
                                          key={event.event_id+"123"}

                        style={{ height: 20, background: "#ffffffb5", color: "black" }}
                      >
                        {event.start.toLocaleTimeString("en-US", {
                          timeStyle: "short"
                        })}
                      </div>
                      <div                     key={event.event_id+"1223"}
>{event.title}</div>
                     
                    </div>
                  );
                }
                return null;
              }}
              />:null}
</div>:<CircularProgress/>}
                
        <Stack spacing={0}>
      
          <Box style={{marginTop:30,marginBottom:50,maxHeight:700}}>
    <ThemeProvider theme={mytheme}>

    <MaterialTable
        title="Reservas del Usuario"
        data={rowsCourseReserves}
        columns={columnsReserve}
        icons={tableIcons}
        style={{height:700}}

        options={{   
               sorting: true,
          rowStyle: (row) =>
            row?.id === selectedRow?.id ? { background: "#e7e7e7" } : {},
        }}
        
      />      
        </ThemeProvider>

      
    
        <ToastContainer />
                {error!==""?  <Alert variant="outlined" severity="error">{error}</Alert>:null}

                </Box>
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