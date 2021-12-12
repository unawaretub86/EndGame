import { useQuery, useMutation } from '@apollo/client';
import React, { useEffect } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Stack,
  TextField,
  IconButton,
  InputAdornment
} from '@mui/material';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { LoadingButton } from '@mui/lab';
import { useFormik, Form, FormikProvider } from 'formik';
import * as Yup from 'yup';

import { UPDATE_USER } from '../../graphql/users/mutations';
import { GET_USER_BY_ID } from '../../graphql/users/queries';

export default function ProfileForm() {
  // const [UpdateUser, { loading: loadMutation }] = useMutation(UPDATE_USER);
  const [showPassword, setShowPassword] = React.useState(false);

  const resp = useQuery(GET_USER_BY_ID, {
    variables: {
      id: '61ac499b6a529329c646eef3'
    },
    fetchPolicy: 'network-only'
  });

  const { data, error, loading } = resp;
  console.log('ProfileForm ~ data ~', data);

  const formik = useFormik({
    initialValues: {
      name: '',
      lastName: '',
      documentId: '',
      email: '',
      password: ''
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('First name required'),
      lastName: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Last name required'),
      documentId: Yup.number('Must be a number').required('Identification is required'),
      email: Yup.string()
        .email('Email must be a valid email address')
        .required('Email is required'),
      password: Yup.string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters')
        .matches(/[a-zA-Z0-9]/, 'Password must contain letters and numbers'),
      passwordConfirm: Yup.string()
        .required('Password Confirm is required')
        .oneOf([Yup.ref('password')], 'Passwords must match')
    }),
    onSubmit: () => {
      console.log('ProfileUpdate ~ formik.values ~ ', formik.values);
    }
  });

  React.useEffect(() => {
    if (data) {
      formik.setFieldValue('name', data.userById.name);
      formik.setFieldValue('lastName', data.userById.lastName);
      formik.setFieldValue('documentId', data.userById.documentId);
      formik.setFieldValue('email', data.userById.email);
      formik.setFieldValue('password', data.userById.password);
    }
    // afrp- buscar la forma que no pida esta mondá de formik
    // posible solución es usar Formik con props en el jsx
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>xx Error xx</p>;

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <Card>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <CardHeader subheader="The information can be edited" title="Profile" />
          <Divider />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item md={6} xs={12}>
                {/* <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}> */}
                <TextField
                  fullWidth
                  label="First name"
                  {...getFieldProps('name')}
                  error={Boolean(touched.name && errors.name)}
                  helperText={touched.name && errors.name}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Last name"
                  {...getFieldProps('lastName')}
                  error={Boolean(touched.lastName && errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                {/* </Stack> */}
                {/* <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}> */}
                <TextField
                  fullWidth
                  label="personal ID"
                  {...getFieldProps('documentId')}
                  error={Boolean(touched.documentId && errors.documentId)}
                  helperText={touched.documentId && errors.documentId}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                {/* </Stack> */}
                <TextField
                  fullWidth
                  autoComplete="username"
                  type="email"
                  label="Email address"
                  {...getFieldProps('email')}
                  error={Boolean(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
                />
              </Grid>
              <Grid item md={6} xs={12}>
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
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="re-enter Password"
                  type={showPassword ? 'text' : 'password'}
                  {...getFieldProps('passwordConfirm')}
                  error={Boolean(touched.passwordConfirm && errors.passwordConfirm)}
                  helperText={touched.passwordConfirm && errors.passwordConfirm}
                />
              </Grid>
            </Grid>
          </CardContent>
          <Divider />

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Edit Profile
          </LoadingButton>
        </Form>
      </FormikProvider>
    </Card>
  );
}
