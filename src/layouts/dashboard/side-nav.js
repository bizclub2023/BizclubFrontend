import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import PropTypes from 'prop-types';
import ArrowTopRightOnSquareIcon from '@heroicons/react/24/solid/ArrowTopRightOnSquareIcon';
import ChevronUpDownIcon from '@heroicons/react/24/solid/ChevronUpDownIcon';
import {
  Box,
  Button,
  Divider,
  Drawer,
  Stack,
  SvgIcon,
  Typography,
  useMediaQuery,
  CircularProgress
} from '@mui/material';
import { Logo } from 'src/components/logo';
import { Scrollbar } from 'src/components/scrollbar';
import { items,items2 ,itemsAdmin} from './config';
import { SideNavItem } from './side-nav-item';
import {  useMoralis } from 'react-moralis';
import { useEffect,useState } from 'react';
const stripe = require('stripe')("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");

export const SideNav = (props) => {
  const { open, onClose } = props;
  const pathname = usePathname();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const {Moralis,isAuthenticated}=useMoralis()
  const [isCustomer,setIsCostumer]=useState(false)
  const [isAdmin,setAdmin]=useState(false)

  async function init(){
    let user=await Moralis.User.current()

try{

    if(user){

    if(user.get("sessionId")){
      const session = await stripe.checkout.sessions.retrieve(user.get("sessionId"));
      console.log(session)

      if(session.payment_status==="paid"){
      await setIsCostumer(true)
      await setIsLoading(false)
      console.log("aqui3 ")

      
    

      }else{
        if(user.get("planActive")){

          user.set("planActive",false)
          await user.save()
        }        

console.log("entro aqui")
        await setIsCostumer(false)

      }
      
                    await setIsLoading(false)

            
  }
  
          
  if(user.get("email")=="ricardouzalt1207@gmail.com"||user.get("email")=="karlaisaparedes11@gmail.com"||user.get("email")=="golfredo.pf@gmail.com"){
    await setAdmin(true)
    await setIsCostumer(false)

          }
    await setIsLoading(false)
}} catch(e){
  console.log(e.message)
  setIsLoading(false)
  user.set("sessionId",undefined)

  user.set("planActive",false)
  await user.save()
  await setAdmin(false)
  await setIsCostumer(false)

  await setIsLoading(false)
}
   
  


  }
  const [isLoading,setIsLoading]=useState(true)
  useEffect(() => {
    init()

  
  }, []);
  const content = (
    <Scrollbar
      sx={{
        height: '100%',
        '& .simplebar-content': {
          height: '100%'
        },
        '& .simplebar-scrollbar:before': {
          background: 'neutral.400'
        }
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
      >
        <Box sx={{ p: 3 }}>
          <Box
            component={NextLink}
            href="/"
            sx={{
              display: 'inline-flex',
              height: 32,
              width: 32
            }}
          >
            <img src={"https://bafybeiboorvh6rv4wpiniyxp267v5swzvsvtxlpnnbl5zkbpmxzykz6jay.ipfs.nftstorage.link/Group%20202%202.png"} />
          </Box>
          <Box
            sx={{
              alignItems: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.04)',
              borderRadius: 1,
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'space-between',
              mt: 2,
              p: '12px'
            }}
          >
            <div>
              <Typography
                color="inherit"
                variant="subtitle1"
              >
                Bizclub
              </Typography>
              <Typography
                color="neutral.400"
                variant="body2"
              >
                Espacio de trabajo colaborativo.
              </Typography>
            </div>
            <SvgIcon
              fontSize="small"
              sx={{ color: 'neutral.500' }}
            >
              <ChevronUpDownIcon />
            </SvgIcon>
          </Box>
        </Box>
        <Divider sx={{ borderColor: 'neutral.700' }} />
        <Box
          component="nav"
          sx={{
            flexGrow: 1,
            px: 2,
            py: 3
          }}
        >
          <Stack
            component="ul"
            spacing={0.5}
            sx={{
              listStyle: 'none',
              p: 0,
              m: 0
            }}
          >
            {isLoading?<CircularProgress />:<div>
        
            {isCustomer?items2.map((item) => {
              const active = item.path ? (pathname === item.path) : false;

              return (
                <SideNavItem
                  active={active}
                  disabled={item.disabled}
                  external={item.external}
                  icon={item.icon}
                  key={item.title}
                  path={item.path}
                  title={item.title}
                />
              );
            }):isAdmin?itemsAdmin.map((item) => {
              const active = item.path ? (pathname === item.path) : false;

              return (
                <SideNavItem
                  active={active}
                  disabled={item.disabled}
                  external={item.external}
                  icon={item.icon}
                  key={item.title}
                  path={item.path}
                  title={item.title}
                />
              );
            }):items.map((item) => {
              const active = item.path ? (pathname === item.path) : false;

              return (
                <SideNavItem
                  active={active}
                  disabled={item.disabled}
                  external={item.external}
                  icon={item.icon}
                  key={item.title}
                  path={item.path}
                  title={item.title}
                />
              );
            })}
            </div>}
            
          </Stack>
        </Box>
        <Divider sx={{ borderColor: 'neutral.700' }} />
    
      </Box>
    </Scrollbar>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: 'neutral.800',
            color: 'common.white',
            width: 280
          }
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: 'neutral.800',
          color: 'common.white',
          width: 280
        }
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

SideNav.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool
};
