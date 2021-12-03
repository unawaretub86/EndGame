import * as Yup from 'yup';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
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
  FormControlLabel,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid
} from '@mui/material';
import { LoadingButton } from '@mui/lab';

// ----------------------------------------------------------------------

export default function FormCreateProject() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required')
  });
  
  const formik = useFormik({
    initialValues: {
      name: '',
      generalObjective: '',
      specificObjective1: '',
      specificObjective2: '',
      specificObjective3: '',
      budget: '',
      startDate: '',
      endDate: ''
    },
    validationSchema: LoginSchema,
    onSubmit: () => {
      navigate('/dashboard', { replace: true });
    }
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
      <Card>
        <CardHeader subheader="The information can be edited" title="Profile" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText="Please specify the first name"
                label="First name"
                name="firstName"
                required
                value={values.firstName}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Last name"
                name="lastName"
                required
                value={values.lastName}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Identification"
                name="identification"
                required
                value={values.identification}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                required
                value={values.email}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Password"
                name="password"
                required
                value={values.password}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >
          <Button color="primary" variant="contained">
            Save details
          </Button>
        </Box>
      </Card>
      </Form>
    </FormikProvider>
  );
}


    // <Box
    //   component="form"
    //   sx={{
    //     '& .MuiTextField-root': { m: 1, width: '25ch' },
    //   }}
    //   noValidate
    //   autoComplete="off"
    // >
    //   <h2>CREAR PROYECTO</h2>
    //   <div>
    //     <TextField
          
    //       id="outlined-error"
    //       label="Nombres"
    //       defaultValue="Hello World"
    //     />
    //     <TextField
          
    //       id="outlined-error-helper-text"
    //       label="Apellidos"
    //       defaultValue="Hello World"
    //       helperText="Incorrect entry."
    //     />
    //   </div>
    //   <div>
    //     <TextField
          
    //       id="filled-error"
    //       label="Email"
    //       defaultValue="Hello World"
    //       variant="filled"
    //     />
    //     <TextField
          
    //       id="filled-error-helper-text"
    //       label="Role"
    //       defaultValue="Hello World"
    //       helperText="Incorrect entry."
    //       variant="filled"
    //     />
    //   </div>
    //   <div>
    //     <TextField
          
    //       id="standard-error"
    //       label="Status"
    //       defaultValue="Hello World"
    //       variant="standard"
    //     />
        
    //   </div>
    // </Box>
  
