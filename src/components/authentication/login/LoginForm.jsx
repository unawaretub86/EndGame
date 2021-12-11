import * as Yup from 'yup';
import { useContext, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import { useMutation } from '@apollo/client';
import jwtDecode from 'jwt-decode';
// UI
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
// material
import {
  Link,
  Stack,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { ContextUser } from '../../../contexts/ContextUser';
import { LOGIN_USER } from '../../../graphql/users/mutations';
import AlertAndres from '../../generic-containers/AlertAndres';

// ----------------------------------------------------------------------

const anAdmin = {
  email: "admin@admin.admin",
  documentId: "1111111111",
  name: "Adminerto",
  lastName: "Adminandez",
  status: "authorized",
  role: "admin"
}
const aLeader = {
  email: "leader@leader.leader",
  documentId: "22222222222",
  name: "Leadererto",
  lastName: "Leaderandez",
  status: "authorized",
  role: "leader"
}
const aStudent = {
  email: "student@student.student",
  documentId: "33333333333",
  name: "Studenerto",
  lastName: "Studenandez",
  status: "authorized",
  role: "student"
}

export default function LoginForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { setUserData } = useContext(ContextUser);
  const [ mtLoginUser ] = useMutation(LOGIN_USER);
  const [stAlert, setStAlert] = useState({open:false, isGood:true, txt:''})

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required')
  });

  
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      remember: true
    },
    validationSchema: LoginSchema,
    onSubmit: async () => {
      console.log('LoginForm ~ formik de login ~~',formik.values);
      
      const toSend = { input: { email: formik.values.email, password: formik.values.password } };
      console.log('LoginForm ~ toSend ~~',toSend);
      
      try {
        const resp = await mtLoginUser( { variables: toSend } );
        console.log('LoginForm ~ resp ~~',resp);
        localStorage.setItem('token', resp.data.login);
        console.log('LoginForm ~ token ~~', resp.data.login);
        const decode = jwtDecode(resp.data.login);
        setUserData(decode); navigate('/dashboard', { replace: true });
        console.log('LoginForm ~ token ~~',decode);
      } catch (error) {
        console.log('LoginForm ~ error ~~',error);
        if(error.graphQLErrors){
          setStAlert({open:true, isGood:false, txt:error.graphQLErrors[0].message})
        }
      }
      
    }
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <FormikProvider value={formik}>
      <AlertAndres sx={{ mb:2}} open={stAlert.open} isGood={stAlert.isGood} txt={stAlert.txt} />
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            onFocus={() => setStAlert({open:false, isGood:true, txt:''})}
            fullWidth
            autoComplete="username"
            type="email"
            label="Email address"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />

          <TextField
            onFocus={() => setStAlert({open:false, isGood:true, txt:''})}
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          <FormControlLabel
            control={<Checkbox {...getFieldProps('remember')} checked={values.remember} />}
            label="Remember me"
          />

          <Link component={RouterLink} variant="subtitle2" to="#">
            Forgot password?
          </Link>
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
          sx={{ mb: 6 }}
        >
          Login
        </LoadingButton>

        {/* ---------------- */}
        <LoadingButton
          fullWidth
          size="small"
          type="button"
          variant="contained"
          loading={isSubmitting}
          sx={{ mb: 2 }}
          onClick={() => { setUserData(anAdmin); navigate('/dashboard', { replace: true }); }}
        >
          As Admin
        </LoadingButton>
        <LoadingButton
          fullWidth
          size="small"
          type="button"
          variant="contained"
          loading={isSubmitting}
          sx={{ mb: 2 }}
          onClick={() => { setUserData(aLeader); navigate('/dashboard', { replace: true }); }}
        >
          As Leader
        </LoadingButton>
        <LoadingButton
          fullWidth
          size="small"
          type="button"
          variant="contained"
          loading={isSubmitting}
          sx={{ mb: 2 }}
          onClick={() => { setUserData(aStudent); navigate('/dashboard', { replace: true }); }}
        >
          As Student
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}
