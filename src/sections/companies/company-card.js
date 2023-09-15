import PropTypes from 'prop-types';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ClockIcon from '@heroicons/react/24/solid/ClockIcon';
import { Avatar, Box, Card, CardContent, Divider,  Stack, SvgIcon, Typography } from '@mui/material';
import { useCallback, useState } from 'react';

import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
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
};import { useRouter } from 'next/router';

export const CompanyCard = (props) => {
  const { company } = props;

  const router=useRouter();
  const [open, setOpen] = useState(false);
  const handleOpen = async () => {
    if(company.title==="Contabilidad y Finanzas."){

      await router.push('/serviceFinances');
    }
    if(company.title==="Marketing y Publicidad."){

      await router.push('/marketing');
    }
    if(company.title==="Tecnologia y Desarrollo Web."){

      await router.push('/tecnologia');
    }
    
    if(company.title==="Recursos Humanos."){

      await router.push('/recursoshumanos');
    }
    if(company.title==="Servicios Legales."){

      await router.push('/legalservices');
    }
    if(company.title==="Logística y Cadena de Suministro."){

      await router.push('/logistica');
    } 
    if(company.title==="Oficina y Coworking"){

      await router.push('/serviceCoworking');
    }
    if(company.title==="Investigaciòn y Analisis."){

      await router.push('/investigacion');
    }
    if(company.title==="Capacitación y Coaching."){

      await router.push('/capacitacion');
    }
    if(company.title==="Servicios Profesionales."){

      await router.push('/serviciosProfesionales');
    }
    setOpen(true) };
  const handleClose = () => setOpen(false);

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pb: 3,
          }}
        >
          <Avatar
          style={{
            width:50,height:50}}
            src={company.logo}
            variant="square"
          />
        </Box>
        <Typography
          align="center"
          gutterBottom
          variant="h5"
        >
          {company.title}
        </Typography>
        <Typography
          align="center"
          variant="body1"
        >
          {company.description}
        </Typography>
      </CardContent>
      <Box sx={{ flexGrow: 1 }} />
      <Divider />
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="center"
        spacing={2}
        sx={{ p: 2 }}
      >
     
<Button onClick={handleOpen}>LEER MÁS</Button>

      
      </Stack>
    </Card>
  );
};

CompanyCard.propTypes = {
  company: PropTypes.object.isRequired
};
