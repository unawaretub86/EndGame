import { useState, useContext, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
// material
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';
// nuestros componentes
import DashboardNavbar from './DashboardNavbar';
import DashboardSidebar from './DashboardSidebar';
import { ContextUser } from '../../contexts/ContextUser';

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const RootStyle = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden'
});

const MainStyle = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  }
}));

// ----------------------------------------------------------------------

export default function DashboardLayout() {
  
  const [open, setOpen] = useState(false);
  
  const { userData, setUserData } = useContext(ContextUser);
  
  useEffect(() => {
    const localToken = localStorage.getItem('token');
    console.log('Dashboard Index ~ localToken: ', localToken);
    const decode = jwtDecode(localToken);
    setUserData(decode);
  }, [setUserData]);
  

  return (
    <RootStyle>
      <DashboardNavbar onOpenSidebar={() => setOpen(true)} />
      <DashboardSidebar isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} />
      <MainStyle>
        {userData ? <Outlet /> :<Typography>xx Usuario no registrado xx</Typography>}
      </MainStyle>
    </RootStyle>
  );
}
