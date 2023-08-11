import PropTypes from 'prop-types';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ClockIcon from '@heroicons/react/24/solid/ClockIcon';
import { Avatar, Box, Button, Card, CardContent, Divider, Stack, SvgIcon, Typography } from '@mui/material';
import Checkout from 'src/pages/Checkout';

export const CompanyCard = (props) => {
  const { company } = props;

  const onToken = (token) => {
    fetch('/save-stripe-token', {
      method: 'POST',
      body: JSON.stringify(token),
    }).then(response => {
      response.json().then(data => {
        alert(`We are in business, ${data.email}`);
      });
    });
  }
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
        
        <Typography
          align="center"
          gutterBottom
          variant="h6"
          marginTop={4}
        >
          {company.price}
        </Typography>
        <Typography
          align="center"
          gutterBottom
          variant="h6"
          marginTop={4}
        >
          {company.avaliable.toString().concat(company.title=="Explorador"?"/5":company.title=="Emprendedor Express"?"/5":company.title=="Visionario Flexible"?"/5":company.title=="Innovador Dedicado"?"/6":company.title=="Líder Elite"?"/2":company.title=="Corporativo Vanguardista"?"/1":company.title=="Titán del Éxito"?"/3":"/5"+" Disponibles")}
        </Typography>
        <Checkout title={company.title}/>
        
            </CardContent>
      <Box sx={{ flexGrow: 1 }} />
      <Divider />
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        spacing={2}
        sx={{ p: 2 }}
      >
    
      </Stack>
    </Card>
  );
};

CompanyCard.propTypes = {
  company: PropTypes.object.isRequired
};
