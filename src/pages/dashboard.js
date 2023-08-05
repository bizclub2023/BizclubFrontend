import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography,Grid,TextField } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { RightBar } from 'src/sections/account/right-bar';
import { CustomersSearch } from 'src/sections/customer/customers-search';
import { applyPagination } from 'src/utils/apply-pagination';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DataGrid } from '@mui/x-data-grid';
import { TimeField } from '@mui/x-date-pickers/TimeField';
import dayjs from 'dayjs';

import Modal from '@mui/material/Modal';
import { useCallback, useMemo, useState } from 'react';
import { Notifications } from 'src/sections/customer/notifications';
const now = new Date();

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
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const customers = useCustomers(page, rowsPerPage);
  const customersIds = useCustomerIds(customers);
  const customersSelection = useSelection(customersIds);

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
  const handleRowsPerPageChange = useCallback(
    (event) => {
      setRowsPerPage(event.target.value);
    },
    []
  );

  const [values, setValues] = useState({
    courseName: '',
    
  });
  

  const lenguages = [
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
  return (
    <>
      <Head>
        <title>
          Dasboard | Bizclub
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
              PANEL DE CONTROL
            </Typography>
          </div>
        <Stack spacing={0}>
          <div>
            <Grid
              container
              spacing={3}
              style={{marginLeft:10,marginBottom:20,marginRight:10}}
            >
              <Grid
                xs={12}
                md={5}
                lg={8}
              > 
               
 <Notifications
              count={data.length}
              items={customers}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
            />   
                     </Grid>
        
            </Grid>
          </div>
        </Stack>
      </Container>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <Typography style={{textAlign:"center"}} id="keep-mounted-modal-title" variant="h6" component="h2">
            Reservaciones
          </Typography>
          
                
                <Grid container  style={{direction:"row",width:"100%",marginTop:10,marginBottom:10}}>
               
                <Grid container  style={{direction:"row",width:"100%",marginTop:0,marginBottom:10}}>
           
          <Typography style={{marginBottom:10}} variant="h6">
                Add Dates
        
              </Typography>


                     <LocalizationProvider style={{width:150}} dateAdapter={AdapterDayjs}>

                     <DatePicker
                        label="Time Picker"
                        value={date}
                        style={{width:150}} 
                        onChange={(newValue) => setDate(newValue)}
                      />   
                <Grid container  style={{direction:"row",width:"100%",marginTop:10,marginBottom:10}}>

<TimeField label="Empieza" style={{marginRight:5,width:'40%'}} defaultValue={dayjs('2023-04-17T15:30')} />
                    <TimeField  label="Termina" style={{width:'40%'}} defaultValue={dayjs('2023-04-17T15:30')} />
     
                    </Grid>
                    </LocalizationProvider>
   
               
</Grid>
<div style={{ height: 200, }}>
              
           
            </div>
                  
</Grid>
        </Box>
      </Modal>
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
