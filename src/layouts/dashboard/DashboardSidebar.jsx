import PropTypes from 'prop-types';
import { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Box, Drawer, Typography, Avatar, Stack } from '@mui/material';
// components
import Logo from '../../components/Logo';
import Scrollbar from '../../components/Scrollbar';
import NavSection from '../../components/NavSection';
import { MHidden } from '../../components/@material-extend';
//
import sidebarConfig from './SidebarConfig';
import { ContextUser } from '../../contexts/ContextUser';

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    width: DRAWER_WIDTH
  }
}));

const AccountStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(1, 1),
  borderRadius: theme.shape.borderRadiusSm,
  backgroundColor: theme.palette.grey[200]
}));

// ----------------------------------------------------------------------

DashboardSidebar.propTypes = {
  isOpenSidebar: PropTypes.bool,
  onCloseSidebar: PropTypes.func
};

export default function DashboardSidebar({ isOpenSidebar, onCloseSidebar }) {
  const { pathname } = useLocation();
  const { userData } = useContext(ContextUser);

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const userSideBar = sidebarConfig(userData.role);

  console.log(userSideBar);

  const renderContent = (
    <Scrollbar
      sx={{
        height: '100%',
        '& .simplebar-content': { height: '100%', display: 'flex', flexDirection: 'column' }
      }}
    >
      <Box sx={{ px: 1, py: 1 }}>
        <Box>
          <Logo />
        </Box>
      </Box>

      <Box sx={{ mb: 3, mx: 1 }}>
        {/* <Link underline="none" component={RouterLink} to="#"> */}
        <AccountStyle>
          <Avatar src="/static/mock-images/avatars/avatar_default.jpg" alt="photoURL" />
          <Box sx={{ ml: 1 }}>
            <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
              {userData.name} {userData.lastName}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {userData.role}
            </Typography>
          </Box>
        </AccountStyle>
        {/* </Link> */}
      </Box>

      <NavSection navConfig={userSideBar} />

      <Box sx={{ flexGrow: 1 }} />

      <Box sx={{ px: 1.5, pb: 2, mt: 5 }}>
        <Stack
          alignItems="center"
          spacing={3}
          sx={{
            p: 3,
            pt: 5,
            borderRadius: 3,
            position: 'relative',
            bgcolor: 'grey.200'
          }}
        >
          <Box
            component="img"
            src="/static/illustrations/illustration_avatar.png"
            sx={{ width: 100, position: 'absolute', top: -50 }}
          />
        </Stack>
      </Box>
    </Scrollbar>
  );

  return (
    <RootStyle>
      <MHidden width="lgUp">
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: { width: DRAWER_WIDTH }
          }}
        >
          {renderContent}
        </Drawer>
      </MHidden>

      <MHidden width="lgDown">
        <Drawer
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              bgcolor: 'background.default'
            }
          }}
        >
          {renderContent}
        </Drawer>
      </MHidden>
    </RootStyle>
  );
}
