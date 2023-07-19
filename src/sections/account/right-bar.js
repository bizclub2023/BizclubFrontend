import { useCallback, useState,useMemo } from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Stack,
  Unstable_Grid2 as Grid
} from '@mui/material';

import { Reservations } from 'src/sections/customer/reservations';
import { useSelection } from 'src/hooks/use-selection';
import { applyPagination } from 'src/utils/apply-pagination';
import { subDays, subHours } from 'date-fns';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
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
    avatar: 'https://bafybeie4rl6impamxhmsmt46lztkpfcqmonjl25uffqsrrtnzj4rbgqiou.ipfs.nftstorage.link/alerta.png',
    createdAt: subDays(subHours(now, 7), 1).getTime(),
    email: 'carson.darrin@devias.io',
    name: '20/03/2023 Salon Principal ',
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
    avatar: 'https://bafybeie4rl6impamxhmsmt46lztkpfcqmonjl25uffqsrrtnzj4rbgqiou.ipfs.nftstorage.link/alerta.png',
    createdAt: subDays(subHours(now, 1), 2).getTime(),
    email: 'fran.perez@devias.io',
    name: '20/03/2023 Salon Informatica',
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
    avatar: 'https://bafybeich6o5bnenfzwhikujw62embrwsuijxhymlwc67pzr46i33ktvq6e.ipfs.nftstorage.link/crisis.png',
    createdAt: subDays(subHours(now, 4), 2).getTime(),
    email: 'jie.yan.song@devias.io',
    name: '20/03/2023 Salon Privado',
    phone: '770-635-2682'
  },
  {
    id: '5e86809283e28b96d2d38537',
    address: {
      city: 'Madrid',
      country: 'Spain',
      name: 'Anika Visser',
      street: '4158  Hedge Street'
    },
    avatar: 'https://bafybeich6o5bnenfzwhikujw62embrwsuijxhymlwc67pzr46i33ktvq6e.ipfs.nftstorage.link/crisis.png',
    createdAt: subDays(subHours(now, 11), 2).getTime(),
    email: 'anika.visser@devias.io',
    name: '20/03/2023 Area de Balcon',
    phone: '908-691-3242'
  },
];

const states = [
  {
    value: 'alabama',
    label: 'Alabama'
  },
  {
    value: 'new-york',
    label: 'New York'
  },
  {
    value: 'san-francisco',
    label: 'San Francisco'
  },
  {
    value: 'los-angeles',
    label: 'Los Angeles'
  }
];

import { useMoralis } from 'react-moralis';
import { useEffect } from 'react';

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

export const RightBar = () => {
  var currentUser={}
  var {user}=useMoralis()
  const [name,setName]=useState()
  const [email,setEmail]=useState()
  const [phone,setPhone]=useState()
  useEffect(()=>{
    console.log(user)
    setName(user.get("username"))  
      setEmail(user.get("email"))
      setPhone(user.get("phone"))

    currentUser= {
      avatar: '/assets/avatars/avatar-anika-visser.png',
      city: 'Los Angeles',
      country: 'USA',
      jobTitle: 'Senior Developer',
      name: user.get("username"),
      timezone: 'GTM-7'
    };

  },[user])
  const [values, setValues] = useState({
    firstName: 'Anika',
    lastName: 'Visser',
    email: 'demo@devias.io',
    phone: '',
    state: 'los-angeles',
    country: 'USA'
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

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
    },
    []
  );

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const customers = useCustomers(page, rowsPerPage);
  const customersIds = useCustomerIds(customers);
  const customersSelection = useSelection(customersIds);

  const handlePageChange = useCallback(
    (event, value) => {
      setPage(value);
    },
    []
  );

  const handleRowsPerPageChange = useCallback(
    (event) => {
      setRowsPerPage(event.target.value);
    },
    []
  );

  return (
    <form
    style={{marginLeft:10,marginRight:10,width:"60%"}}
      autoComplete="off"
      noValidate
      onSubmit={handleSubmit}
    >
      <Card >
      <CardHeader
          style={{marginTop:-15,marginBottom:-15}}
          subheader="18/08/2023"
          title="Proxima Factura"
        />
        <Stack style={{justifyContent:"flex-start",alignItems:"center",flexDirection:'row'}}>
       
        <CardHeader
          subheader="The information can be edited"
          title="Tu Plan Explorador"
          style={{marginRight:"5%"}}
        />
        
        <CardActions sx={{ marginTop:2,justifyContent: 'flex-start' }}>
          <Button startIcon={<EditIcon />} variant="contained">
            CAMBIAR 
          </Button>
        </CardActions>
          </Stack>

          
              
        <Stack style={{justifyContent:"flex-start",alignItems:"center",flexDirection:'row'}}>

      
        <CardHeader
          title="Tus Reservas"
          subheader="Ultimas Reservaciones"

        />        
        <CardActions sx={{ marginTop:2,alignItems:"center",justifyContent: 'center' }}>

        <Button startIcon={<AddIcon />}  variant="contained">
           RESERVAR
          </Button>
          
        </CardActions>
          </Stack>
              <Reservations
            count={data.length}
            items={customers}
          />
             
      </Card>
    </form>
  );
};
