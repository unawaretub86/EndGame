import * as React from 'react';
import * as Yup from 'yup';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import { useFormik, Form, FormikProvider } from 'formik';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { useNavigate } from 'react-router-dom';
// material
import { Stack, TextField, IconButton, InputAdornment, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// import { resolvePlugin } from '@babel/core';

// ----------------------------------------------------------------------
const role = [
  {
    value: 'student',
    label: 'Student'
  },
  {
    value: 'leader',
    label: 'Leader'
  },
  {
    value: 'administrator',
    label: 'Administrator'
  }
];

export default function RegisterForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [values, setValues] = React.useState('');

  const RegisterSchema = Yup.object().shape({
    name: Yup.string().required('Name is required').min(5, 'Too Short!'),
    generalObjective: Yup.string().required('General Objective is required').min(20, 'Too Short!'),
    specificObjective1: Yup.string().required('At least One is required').min(20, 'Too Short!'),
    specificObjective2: Yup.string().min(20, 'Too Short!'),
    specificObjective3: Yup.string().min(20, 'Too Short!'),
    budget: Yup.number('Must be a number').required('Budget is required').min(1, 'Must be greater than 0').max(1000000, 'Must be less than 1000000'),
    startDate: Yup.string().required('Start Date is required'),
    endDate: Yup.string().required('End Date is required'),
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
    validationSchema: RegisterSchema,
    onSubmit: () => {
      // afrp- {jalar al user context y sacar el user_id del usuario}
      // afrp- 
      // afrp- {mutation de firebase para guardar el proyecto}
      // afrp- {jalar el modal ctx para cerrarlo}
    }
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="Project Name"
              {...getFieldProps('name')}
              error={Boolean(touched.name && errors.name)}
              helperText={touched.name && errors.name}
            />

            <TextField
              fullWidth
              label="General Objective"
              {...getFieldProps('generalObjective')}
              error={Boolean(touched.generalObjective && errors.generalObjective)}
              helperText={touched.generalObjective && errors.generalObjective}
            />
          </Stack>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="First Specific Objective"
              {...getFieldProps('specificObjective1')}
              error={Boolean(touched.specificObjective1 && errors.specificObjective1)}
              helperText={touched.specificObjective1 && errors.specificObjective1}
            />

            <TextField
              fullWidth
              label="First Specific Objective"
              {...getFieldProps('specificObjective1')}
              error={Boolean(touched.specificObjective1 && errors.specificObjective1)}
              helperText={touched.specificObjective1 && errors.specificObjective1}
            />
          </Stack>

          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Email address"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
          <Typography variant="title" sx={{ mt:2 }}>
          || ~ AQUÍ IRÍA CONFIRMACIÓN DE PASSWORD ~ ||
          </Typography>

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Register
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
