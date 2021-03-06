import * as React from 'react';
import * as Yup from 'yup';
import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
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
import { ContextModal } from '../../contexts/ContextModal';
import { ContextUser } from '../../contexts/ContextUser';
import { ADD_OBSERVATION, UPDATE_ADVANCE } from '../../graphql/advances/ad-mutations';
import { ADVANCE_BY_ID } from '../../graphql/advances/ad-queries';

// ----------------------------------------------------------------------

FormDoObserv.propTypes = {
  dataID: PropTypes.string,
  student: PropTypes.string,
  project: PropTypes.string,
};
export default function FormDoObserv({ dataID, student, project }) {
  
  const { stModal, setStModal } = React.useContext(ContextModal);
  const [stAlert, setStAlert] = useState({ open: false, isGood: true, txt: 'ñ' });
  const [ mtObserveAdvance ] = useMutation(ADD_OBSERVATION);
  const [ mtUpdateDescription ] = useMutation(UPDATE_ADVANCE);
  const { userData } = React.useContext(ContextUser);

  
  const { data } = useQuery(ADVANCE_BY_ID,
    {
      variables: { id: dataID },
      onCompleted: (data) => {
        console.log('FormDoAdvnc ~ getPRJ ~ data ~ ', data);
        formik.setFieldValue('observations', data.advaceById.observations || '');
        formik.setFieldValue('description', data.advaceById.description || '');
      },
      fetchPolicy: 'network-only'
    }
  )

  const RegisterSchema = Yup.object().shape({
    observations: Yup.string().required('Observation is required').min(5, 'Too Short!'),
    description: Yup.string().required('Description is required').min(5, 'Too Short!')
  });

  const formik = useFormik({
    initialValues: {
      observations: '',
      description: ''
    },
    validationSchema: RegisterSchema,
    onSubmit: async () => {
      const toSend = userData.role === 'leader' ? { advaceById: dataID, observations: formik.values.observations}
                                                : { advaceById: dataID, description: formik.values.description};
      console.log("FormDoAdvnc ~ toSend: ", toSend);
      const resp = userData.role === 'leader' ? await mtObserveAdvance({variables : {input: toSend}})
                                              : await mtUpdateDescription({variables : {input: toSend}});
      console.log("FormDoAdvnc ~ resp: ", resp);
      if (resp) {
        setStAlert({ open: true, isGood: true, txt: 'Submition done successfully' });
        setTimeout(() => {
          setStModal({ ...stModal, open: false });
        }, 1000);
      }
    }
  });


  if(!data) return <div>Loading...</div>;

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <AlertAndres sx={{ mb: 2 }} open={stAlert.open} isGood={stAlert.isGood} txt={stAlert.txt} />
        <Stack spacing={1}>
          <Stack sx={{ mt: 1, mb: 2 }}
                 direction={{ xs: 'column', sm: 'row' }}
                 justifyContent='space-around'
                 >
            <Typography variant="h10">
              Advance made by :{' '}
              <strong>
                <i>
                  {student}
                </i>
              </strong>
            </Typography>
            <Typography variant="h10">
              To the project :{' '}
              <i>
                <strong>{project}</strong>
              </i>
            </Typography>
          </Stack>
          Student description:
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              multiline
              fullWidth
              disabled={userData.role === 'leader'}
              aria-label="minimum height"
              rows={3}
              label="Observation for the advance"
              {...getFieldProps('description')}
              error={Boolean(touched.description && errors.description)}
              helperText={touched.description && errors.description}
              placeholder="Write your advance here"
            />
          </Stack>
          <Typography variant="h10">
            Leader observation
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              disabled={userData.role === 'student'}
              multiline
              fullWidth
              aria-label="minimum height"
              rows={3}
              label="Observation for the advance"
              {...getFieldProps('observations')}
              error={Boolean(touched.observations && errors.observations)}
              helperText={touched.observations && errors.observations}
              placeholder="...Observation here..."
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
              Submit data
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
