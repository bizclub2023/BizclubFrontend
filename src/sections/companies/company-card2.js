import PropTypes from 'prop-types';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ClockIcon from '@heroicons/react/24/solid/ClockIcon';
import { Avatar, Box, Button, Card, CardContent, Divider, Stack, SvgIcon, Typography } from '@mui/material';
import StripeCheckout from 'react-stripe-checkout';

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
        <StripeCheckout
        token={onToken}
        bitcoin 
        style={{alignSelf:"center", width:"100%", marginTop:20}}
        name="Bizclub."
        description="Coworkers" 
        image="https://www.vidhub.co/assets/logos/vidhub-icon-2e5c629f64ced5598a56387d4e3d0c7c.png" // the pop-in header image (default none)
        panelLabel="SUBSCRIBIRSE"
        stripeKey="price_1JYGKYLfVewAaHPMX9P0lWjs"
      />
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
