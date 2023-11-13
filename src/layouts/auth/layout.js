import PropTypes from 'prop-types';
import NextLink from 'next/link';
import { Box, Typography,CardMedia, Unstable_Grid2 as Grid } from '@mui/material';
import { Logo } from 'src/components/logo';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
// TODO: Change subtitle text
import { useMediaQuery } from 'react-responsive'
export const Layout = (props) => {
  const { children } = props;
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1200px)' })

  return (
    <Box
      component="main"
      sx={{
        display: 'flex',
        flex: '1 1 auto'
      }}
    >
      <Grid
        container
        sx={{ flex: '1 1 auto' }}
      >
        <Grid
          xs={12}
          lg={6}
          sx={{
            backgroundColor: 'background.paper',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative'
          }}
        >
          <Box
            component="header"
            sx={{
              left: 0,
              p: 3,
              position: 'fixed',
              top: 0,
              width: '100%'
            }}
          >
            <Box
              component={NextLink}
              href="/"
              sx={{
                display: 'inline-flex',
                height: 32,
                width: 32
              }}
            >
               <img
              alt=""
              src="https://bafybeiablt3xuadq4lkjjalnsdfp7ut4sgzjwsf7xxmtfaoc2ajm3omiya.ipfs.nftstorage.link/Group%20202.png"
            />
            </Box>
          </Box>
          {children}
        </Grid>
    {isTabletOrMobile?null:<Grid
          xs={12}
          lg={6}
          sx={{
            alignItems: 'center',
            color: 'white',
            display: 'flex',
            justifyContent: 'center',
            '& img': {
              maxWidth: '100%',
              maxHeight: '100%'
            }
          }}
        >
          <CardMedia
            component="div"
            height="100%"

            style={{flex:1,height:'100%',justifyContent:"center",alignItems:'center',textAlign:"center",width:"100%"}}
            image="https://bafybeicum4u65ycjsiaet4m6h34riw4k5hcezxgg66vmiw6wfsukodghmq.ipfs.nftstorage.link/"

            alt="Bizclub"
           >
          
            </CardMedia>
        </Grid>}
        
      </Grid>
    </Box>
  );
};

Layout.prototypes = {
  children: PropTypes.node
};