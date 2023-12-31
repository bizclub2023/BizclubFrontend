import Head from 'next/head';
import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { AccountProfile } from 'src/sections/account/account-profile';
import { AccountProfileDetails } from 'src/sections/account/account-profile-details';
import { useMoralis } from 'react-moralis';
import { useEffect,useState } from 'react';
import { SettingsPassword } from 'src/sections/settings/settings-password';
import { CancelSubscription } from 'src/sections/settings/cancel-subscription';

const Page = () => {
  
  return <>
    <Head>
      <title>
        Account | Bizclub
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth="lg" style={{marginBottom:20}}>
        <Stack spacing={3}>
          <div>
            <Typography variant="h4">
              Account
            </Typography>
          </div>
          <div>
            <Grid
              container
              spacing={3}
            >
              <Grid
                xs={12}
                md={6}
                lg={4}
              >
                <AccountProfile />
              </Grid>
              <Grid
                xs={12}
                md={6}
                lg={8}
              >
                <AccountProfileDetails />
              </Grid>
            </Grid>
            
          </div>
        </Stack>
      </Container>
      <Container maxWidth="lg" style={{marginBottom:20}}>

      <SettingsPassword />
      <CancelSubscription />

      </Container>
    </Box>
  </>
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
