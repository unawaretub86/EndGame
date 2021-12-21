import * as React from 'react';
import * as Yup from 'yup';
import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import PropTypes from 'prop-types';
// import { Icon } from '@iconify/react';
import { useFormik, Form, FormikProvider } from 'formik';

// material
import { Stack, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// our components
// import { FormError } from '../../components/FormError';
// import { ContextModal } from '../../contexts/ContextModal';
import AlertAndres from '../generic-containers/AlertAndres';
import { GET_PROJECT_BYID } from '../../graphql/projects/prj-queries';
import { UPDATE_PROJECT } from '../../graphql/projects/prj-mutations';

// ----------------------------------------------------------------------

// <<< afrp- para organizar la info como pide gql
// ampliar a 5 spec obj
// extraer leader de un UserContext

FormUpdateProject.propTypes = {
  dataID: PropTypes.string
};

// <<< afrp- inicio del componente ------------------------------------->>

export default function FormUpdateProject({ dataID }) {
  const [stAlert, setStAlert] = useState({ open: false, isGood: true, txt: '' });
  const [mtUpdateProject] = useMutation(UPDATE_PROJECT);

  console.log('Update Project ~ GET_PROJECT_ID ~ ', GET_PROJECT_BYID);
  console.log('Update Project ~ dataID ~ ', dataID);
  const resp = useQuery(GET_PROJECT_BYID, {
    variables: {
      id: dataID
    },
    fetchPolicy: 'network-only'
  });

  console.log('Update Project ~ resp ~ ', resp);
  const { data, error, loading } = resp;
  console.log(
    'Update Project ~ data ~ ',
    data,
    'Update Project ~ error ~ ',
    error,
    'Update Project ~ loadingQuery ~ ',
    loading
  );

  // const [mtUpdateProject, { loading: loadingMutation }] = useMutation (UPDATE_PROJECT);

  const RegisterSchema = Yup.object().shape({
    name: Yup.string().required('Name is required').min(5, 'Too Short!'),
    generalObjective: Yup.string().required('General Objective is required').min(20, 'Too Short!'),
    specificObjective1: Yup.string().required('At least One is required').min(20, 'Too Short!'),
    specificObjective2: Yup.string().min(20, 'Too Short!'),
    specificObjective3: Yup.string().min(20, 'Too Short!'),
    budget: Yup.number('Must be a number').required('Budget is required').min(1, 'Must be greater than 0').max(10000000, 'Must be less than 10000000'),
    startDate: Yup.string().required('Start Date is required'),
    endDate: Yup.string().required('End Date is required')
  });

  function packData(formikOriginal, prjID) {
    const toSend = { ...formikOriginal };
    delete toSend.specificObjective1;
    delete toSend.specificObjective2;
    delete toSend.specificObjective3;
    delete toSend.startDate;
    delete toSend.endDate;
    toSend.projectById = prjID;
    toSend.specificObjectives = [
      formikOriginal.specificObjective1,
      formikOriginal.specificObjective2,
      formikOriginal.specificObjective3
    ];
    toSend.budget = parseInt(formikOriginal.budget, 10);
    return toSend;
  }

  const formik = useFormik({
    initialValues: {},
    validationSchema: RegisterSchema,
    enableReinitialize: true,
    onSubmit: async () => {
      if(data.projectById.status === 'active') {
        const toSend = packData(formik.values, dataID);
        console.log('UpdateProject: onSubmit -> gql toSend', toSend);
        const resp = mtUpdateProject({ variables: { input: toSend } });
        console.log('FormUpdateProject: onSubmit -> gql resp', resp);
        setStAlert({ open: true, isGood: true, txt: 'Project created successfully' });
      }
    }
  });

  React.useEffect(() => {
    if (data) {
      formik.setFieldValue('name', data.projectById.name);
      formik.setFieldValue('generalObjective', data.projectById.generalObjective);
      formik.setFieldValue('specificObjective1', data.projectById.specificObjectives[0]);
      formik.setFieldValue('specificObjective2', data.projectById.specificObjectives[1]);
      formik.setFieldValue('specificObjective3', data.projectById.specificObjectives[2]);
      formik.setFieldValue('budget', data.projectById.budget);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <AlertAndres sx={{ mb: 2 }} open={stAlert.open} isGood={stAlert.isGood} txt={stAlert.txt} />
        <Stack spacing={3}>
          {/* <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}> */}
          <TextField
            sx={{ mt: 3 }}
            fullWidth
            label="Project Name"
            {...getFieldProps('name')}
            error={Boolean(touched.name && errors.name)}
            helperText={touched.name && errors.name}
          />

          <TextField
            fullWidth
            multiline
            aria-label="minimum height"
            rows={2}
            label="General Objective"
            {...getFieldProps('generalObjective')}
            error={Boolean(touched.generalObjective && errors.generalObjective)}
            helperText={touched.generalObjective && errors.generalObjective}
          />
          {/* </Stack> */}
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              multiline
              aria-label="minimum height"
              rows={3}
              label="First Specific Objective"
              {...getFieldProps('specificObjective1')}
              error={Boolean(touched.specificObjective1 && errors.specificObjective1)}
              helperText={touched.specificObjective1 && errors.specificObjective1}
            />

            <TextField
              fullWidth
              multiline
              aria-label="minimum height"
              rows={3}
              label="Second Specific Objective"
              {...getFieldProps('specificObjective2')}
              error={Boolean(touched.specificObjective2 && errors.specificObjective2)}
              helperText={touched.specificObjective2 && errors.specificObjective2}
            />

            <TextField
              fullWidth
              multiline
              aria-label="minimum height"
              rows={3}
              label="Third Specific Objective"
              {...getFieldProps('specificObjective3')}
              error={Boolean(touched.specificObjective3 && errors.specificObjective3)}
              helperText={touched.specificObjective3 && errors.specificObjective3}
            />
          </Stack>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="Budget"
              {...getFieldProps('budget')}
              error={Boolean(touched.budget && errors.budget)}
              helperText={touched.budget && errors.budget}
            />
            {/* afrp- Pasar a date picker
            https://mui.com/components/pickers/
            https://stackoverflow.com/questions/56312372/react-datepicker-with-a-formik-form
            https://stackoverflow.com/questions/57109680/how-to-use-mutations-in-react-apollo-hooks-and-formik
            */}
          </Stack>
          <TextField
            fullWidth
            label="Paste Image URL"
            {...getFieldProps('imgurl')}
            error={Boolean(touched.imgurl && errors.imgurl)}
            helperText={touched.imgurl && errors.imgurl}
          />

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            disabled={data.projectById.status === 'inactive'}
            loading={isSubmitting}
          >
            {data.projectById.status === 'active' ? 'Update Project' : 'Project not active'}
          </LoadingButton>
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
