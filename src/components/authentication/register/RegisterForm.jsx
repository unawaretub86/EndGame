import * as React from 'react';
import * as Yup from 'yup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
// UI
import { Icon } from '@iconify/react';
import { useFormik, Form, FormikProvider } from 'formik';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
// material
import { Stack, TextField, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { CREATE_USER } from '../../../graphql/users/mutations';
// import { resolvePlugin } from '@babel/core';

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [ mtCreateUser ] = useMutation(CREATE_USER);

  const RegisterSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('First name required'),
    lastName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Last name required'),
    documentId: Yup.number('Must be a number').required('Identification is required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters').matches(/[a-zA-Z0-9]/, 'Password must contain letters and numbers'),
    passwordConfirm: Yup.string().required('Password Confirm is required').oneOf([Yup.ref('password')], 'Passwords must match'),
    role: Yup.string().oneOf(['student', 'leader', 'admin'])
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      lastName: '',
      documentId: '',
      role: 'none',
      email: '',
      password: '',
      passwordConfirm: ''
    },
    validationSchema: RegisterSchema,
    onSubmit: () => {
      console.log("Register ~ formik.values ~ ", formik.values);
      const toSend = { input : {...formik.values}};
      console.log("Register ~ toSend11 ~ ", toSend);
      delete toSend.input.passwordConfirm;
      console.log("Register ~ toSend22 ~ ", toSend);
      const resp = mtCreateUser({ variables: toSend })
      console.log("Register ~ resp ~ ", resp);
      navigate('/login');
    }
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="First name"
              {...getFieldProps('name')}
              error={Boolean(touched.name && errors.name)}
              helperText={touched.name && errors.name}
            />

            <TextField
              fullWidth
              label="Last name"
              {...getFieldProps('lastName')}
              error={Boolean(touched.lastName && errors.lastName)}
              helperText={touched.lastName && errors.lastName}
            />
          </Stack>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="personal ID"
              {...getFieldProps('documentId')}
              error={Boolean(touched.documentId && errors.documentId)}
              helperText={touched.documentId && errors.documentId}
            />

            
            <TextField
              select
              fullWidth
              label="Select Role"
              name="role"
              {...getFieldProps('role')}
              error={Boolean(touched.role && errors.role)}
              helperText={touched.role && errors.role}
              variant="outlined"
              SelectProps={{ native: true }}
            >
              <option value="none">Choose a role</option>
              <option value="admin">Administrator</option>
              <option value="leader">Leader</option>
              <option value="student">Student</option>
            </TextField>

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
          
          <TextField
              fullWidth
              label="re-enter Password"
              type={showPassword ? 'text' : 'password'}
              {...getFieldProps('passwordConfirm')}
              error={Boolean(touched.passwordConfirm && errors.passwordConfirm)}
              helperText={touched.passwordConfirm && errors.passwordConfirm}
            />

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
