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
import { ContextUser } from '../../contexts/ContextUser';
import { ContextModal } from '../../contexts/ContextModal';
import { GET_ENROLLMENTS_OFSTUDENT } from '../../graphql/enrollments/enr-queries';
import { GET_PROJECT_BYID_TOADMIN } from '../../graphql/projects/prj-queries';
import { CREATE_ADVANCE } from '../../graphql/advances/ad-mutations';

// ----------------------------------------------------------------------

FormDoObserv.propTypes = {
  dataID: PropTypes.string,
  prjTitle: PropTypes.string
};
export default function FormDoObserv({ dataID = "61ba698b15b2c5df73cce96f" }) {
  
  const { stModal, setStModal } = React.useContext(ContextModal);
  const [stAlert, setStAlert] = useState({ open: false, isGood: true, txt: 'ñ' });
  const { userData } = React.useContext(ContextUser);
  const [stProjectData, setStProjectData] = useState({name: 'abelardo'});
  const [stThisEnrollment, setStThisEnrollment] = useState({});
  const [ createAdvance ] = useMutation(CREATE_ADVANCE);
  
  const { data : dataPrj } = useQuery(GET_PROJECT_BYID_TOADMIN,
    {
      variables: { id: dataID },
      onCompleted: (data) => {
        console.log('FormDoAdvnc ~ getPRJ ~ data ~ ', data);
        setStProjectData(data.projectById);
      },
      fetchPolicy: 'network-only'
    }
  )

  useQuery(GET_ENROLLMENTS_OFSTUDENT,
    {
      variables: { user_id: userData._id },
      onCompleted: (data) => {
        console.log('FormDoAdvnc ~ getENR ~ data ~ ', data);
        const allEnrollments = data.enrollmentByUserId;
        const thisEnrollment = allEnrollments.find(enr => enr.project_id === dataID);
        console.log('FormDoAdvnc ~ getENR ~ thisEnrollment ~ ', thisEnrollment);
        setStThisEnrollment(thisEnrollment);
      },
      fetchPolicy: 'network-only'
    }
  )


  const RegisterSchema = Yup.object().shape({
    description: Yup.string().required('Advance is required').min(5, 'Too Short!')
  });

  const formik = useFormik({
    initialValues: {
      description: ''
    },
    validationSchema: RegisterSchema,
    onSubmit: async () => {
      const toSend = {
        enrollment_id: stThisEnrollment._id,
        description: formik.values.description,
        addDate: new Date(),
      };
      console.log("FormDoAdvnc ~ toSend: ", toSend);
      const resp = await createAdvance({variables : {input: toSend}});
      console.log("FormDoAdvnc ~ resp: ", resp);
      if (resp) {
        setStAlert({ open: true, isGood: true, txt: 'Advance created successfully' });
        setTimeout(() => {
          setStModal({ ...stModal, open: false });
        }, 1000);
      }
    }
  });

  if(!dataPrj) return <div>Loading...</div>;

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <AlertAndres sx={{ mb: 2 }} open={stAlert.open} isGood={stAlert.isGood} txt={stAlert.txt} />
        <Stack spacing={3}>
          <Stack sx={{ mt: 3 }} direction={{ xs: 'column', sm: 'row' }}>
            <Typography variant="h10">
              Advance made by :{' '}
              <strong>
                <i>
                  {userData.name} {userData.lastName}
                </i>
              </strong>
            </Typography>
          </Stack>
          <Stack direction={{ xs: 'column', sm: 'row' }}>
            <Typography variant="h10">
              To the project :{' '}
              <i>
                <strong>{stProjectData.name}</strong>
              </i>
            </Typography>
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
