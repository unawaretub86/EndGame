import * as React from 'react';
import * as Yup from 'yup';
import { useState } from 'react';
// import { useMutation } from '@apollo/client';
// import { Icon } from '@iconify/react';
import { useFormik, Form, FormikProvider } from 'formik';

// material
import { Stack, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import PropTypes from 'prop-types';
// our components
import AlertAndres from '../generic-containers/AlertAndres';
// import { CREATE_PROJECT } from '../../graphql/projects/prj-mutations';
import { ContextUser } from '../../contexts/ContextUser';
import { ContextModal } from '../../contexts/ContextModal';

// ----------------------------------------------------------------------

FormDoAdvnc.propTypes = {
  dataID: PropTypes.string,
  prjTitle: PropTypes.string
};
export default function FormDoAdvnc({ prjTitle }) {
  const { stModal, setStModal } = React.useContext(ContextModal);
  const [stAlert, setStAlert] = useState({ open: false, isGood: true, txt: '' });

  const { userData } = React.useContext(ContextUser);

  const RegisterSchema = Yup.object().shape({
    description: Yup.string().required('Advance is required').min(5, 'Too Short!')
  });

  const formik = useFormik({
    initialValues: {
      description: ''
    },
    validationSchema: RegisterSchema,
    onSubmit: () => {
      // const toSend = {
      //   input: {
      //     description: formik.values,
      //     project_id: dataID,
      //     student_id: userData.id
      //   }
      // };

      setStAlert({ open: true, isGood: true, txt: 'Advancement successfully registered' });
      setTimeout(() => {
        setStModal({ ...stModal, open: false });
      }, 2000);
    }
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <AlertAndres sx={{ mb: 2 }} open={stAlert.open} isGood={stAlert.isGood} txt={stAlert.txt} />
        <Stack spacing={3}>
          <Stack sx={{ mt: 3 }} direction={{ xs: 'column', sm: 'row' }}>
            <Typography variant="h10">
              Made by : {userData.name} {userData.lastName}
            </Typography>
          </Stack>
          <Stack direction={{ xs: 'column', sm: 'row' }}>
            <Typography variant="h10">For the project : {prjTitle}</Typography>
          </Stack>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              multiline
              fullWidth
              aria-label="minimum height"
              rows={4}
              label="Advancement Description"
              {...getFieldProps('description')}
              error={Boolean(touched.description && errors.description)}
              helperText={touched.description && errors.description}
              placeholder="Write your advance here"
            />
          </Stack>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              loading={isSubmitting}
            >
              Submit advancement
            </LoadingButton>
          </Stack>
        </Stack>
      </Form>
    </FormikProvider>
  );
}

/* rellenos
Project 4.12.10.34
GenObj Project 4.12.10.34 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc et venenatis ligula. Sed maximus pharetra molestie.
SpObj11 Project 4.12.10.34 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc et venenatis ligula. Sed maximus pharetra molestie.
SpObj22 Project 4.12.10.34 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc et venenatis ligula. Sed maximus pharetra molestie.
SpObj22 Project 4.12.10.34 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc et venenatis ligula. Sed maximus pharetra molestie.
*/
