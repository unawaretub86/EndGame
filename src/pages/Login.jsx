import { Link as RouterLink } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Card, Stack, Link, Container, Typography, Button } from '@mui/material';
import { Icon } from '@iconify/react';
// import { useAuth0 } from '@auth0/auth0-react';
// layouts
import AuthLayout from '../layouts/AuthLayout';
// components
import Page from '../components/Page';
import { MHidden } from '../components/@material-extend';
import { LoginForm } from '../components/authentication/login';
// JWT import AuthSocial from '../components/authentication/AuthSocial';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2)
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));

// const LoginButton = () => {
//   const { loginWithRedirect } = useAuth0();
//   return <button onClick={() => loginWithRedirect()}>Log In</button>;
// };
// ----------------------------------------------------------------------

export default function Login() {
  return (
    <RootStyle title="Login | Mercurio">
      <AuthLayout>
        Don’t have an account? &nbsp;
        <Link underline="none" variant="subtitle2" component={RouterLink} to="/register">
          Get started
        </Link>
      </AuthLayout>

      <MHidden width="mdDown">
        <SectionStyle>
          <Typography variant="h3" sx={{ px: 10, mt: 15, mb: 10 }}>
            Hi, Welcome Back
          </Typography>
          <img src="/static/illustrations/illustration_login.png" alt="login" />
        </SectionStyle>
      </MHidden>

      <Container maxWidth="sm">
        <ContentStyle>
          <Stack sx={{ mb: 5 }}>
            <Typography variant="h4" gutterBottom>
              Sign in to MERCURIO
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>Enter your credentials below.</Typography>
          </Stack>
          {/* JWT <AuthSocial /> */}

          <LoginForm />
          <Button variant="outlined" color="error" target="_blank" href="https://youtu.be/jLbqbqszKs8">
            About Mercurio &nbsp; <Icon icon="logos:youtube-icon" inline />
          </Button>

          <MHidden width="smUp">
            <Typography variant="body2" align="center" sx={{ mt: 3 }}>
              Don’t have an account?&nbsp;
              <Link variant="subtitle2" component={RouterLink} to="/register">
                Get started
              </Link>
            </Typography>
          </MHidden>
          <Typography variant="body2" align="center" sx={{ mt: 3 }}>
              Know more about&nbsp;
            <Link variant="subtitle2" href='https://github.com/minimal-ui-kit/material-kit-react'>
              minimal-UI-kit
            </Link>
          </Typography>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
