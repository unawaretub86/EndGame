import { Icon } from '@iconify/react';
import googleFill from '@iconify/icons-eva/google-fill';
import twitterFill from '@iconify/icons-eva/twitter-fill';
import facebookFill from '@iconify/icons-eva/facebook-fill';
// material
import { Stack, Button, Divider, Typography } from '@mui/material';


// mis imports

import googleLogin from '../../firebase/auth-control';

// ----------------------------------------------------------------------

export default function AuthSocial() {

  const hdlClickGoogle = () => {
    googleLogin();
  };


  return (
    <>
      <Stack direction="row" spacing={2}>
        <Button onClick={hdlClickGoogle} fullWidth size="large" color="inherit" variant="outlined">
          <Icon icon={googleFill} color="#DF3E30" height={24} />
        </Button>

        <Button fullWidth size="large" color="inherit" variant="outlined">
          <Icon icon={facebookFill} color="#1877F2" height={24} />
        </Button>

        <Button fullWidth size="large" color="inherit" variant="outlined">
          <Icon icon={twitterFill} color="#1C9CEA" height={24} />
        </Button>
      </Stack>

      <Divider sx={{ my: 3 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          OR
        </Typography>
      </Divider>
    </>
  );
}
