import * as React from 'react';
import * as Yup from 'yup';
import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';

// import { Icon } from '@iconify/react';
import { useFormik, Form, FormikProvider } from 'formik';

// material
import { Stack, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// our components
// import { FormError } from '../../components/FormError';
// import { ContextModal } from '../../contexts/ContextModal';
import AlertAndres from '../generic-containers/AlertAndres';
import { UPDATE_PROJECT } from '../../graphql/projects/prj-mutations';
import { GET_PROJECT_ID } from '../../graphql/projects/prj-queries';

// ----------------------------------------------------------------------

// <<< afrp- para organizar la info como pide gql
          // ampliar a 5 spec obj
          // extraer leader de un UserContext
function packData(formikOriginal) {
      const toSend = {...formikOriginal};
      delete toSend.specificObjective1;
      delete toSend.specificObjective2;
      delete toSend.specificObjective3;
      toSend.specificObjectives = [formikOriginal.specificObjective1, formikOriginal.specificObjective2, formikOriginal.specificObjective3];
      toSend.leader_id = "61a6f41c1e04d028a4dd7cfd"
      // <<< afrp- mover esta asignación de status al backend >>>
      toSend.status = "inactive";
      toSend.budget = parseInt(formikOriginal.budget, 10);
      return toSend;
}

export default function FormUpdateProject({ dataID }) {
  
  const [stAlert, setStAlert] = useState({open:false, isGood:true, txt:''})

  const [mtUpdateProject, { loading: loadingMutation }] = useMutation (UPDATE_PROJECT);
  
  
  const { data, loading: loadingQuery, error } = useQuery(GET_PROJECT_ID, {
    variables: {
      id: dataID
    }
  });
  
  
  const projectInfo = data.projectById;
  
  const RegisterSchema = Yup.object().shape({
    // <<< afrp- OJO volver a activar >>>
    // name: Yup.string().required('Name is required').min(5, 'Too Short!'),
    // generalObjective: Yup.string().required('General Objective is required').min(20, 'Too Short!'),
    // specificObjective1: Yup.string().required('At least One is required').min(20, 'Too Short!'),
    // specificObjective2: Yup.string().min(20, 'Too Short!'),
    // specificObjective3: Yup.string().min(20, 'Too Short!'),
    // budget: Yup.number('Must be a number').required('Budget is required').min(1, 'Must be greater than 0').max(10000000, 'Must be less than 10000000'),
    // startDate: Yup.string().required('Start Date is required'),
    // endDate: Yup.string().required('End Date is required'),
  });
  
  const formik = useFormik({
    initialValues: {
      name: projectInfo.name,
      generalObjective: projectInfo.generalObjective,
      specificObjective1: projectInfo.specificObjectives[0],
      specificObjective2: projectInfo.specificObjectives[1],
      specificObjective3: projectInfo.specificObjectives[2],
      budget: projectInfo.budget,
      startDate: projectInfo.startDate,
      endDate: projectInfo.endDate
    },
    validationSchema: RegisterSchema,
    onSubmit: async () => {
      // afrp- {jalar al user context y sacar el user_id del usuario}
      // afrp- 
      // afrp- {mutation de firebase para guardar el proyecto}
      // afrp- {jalar el modal ctx para cerrarlo}

      // const toSend = packData(formik.values);
      // console.log("FormCreateProject: onSubmit -> gql toSend 7pm", toSend);
      // const resp = await mtUpdateProject({ variables: {input: toSend} },)
      // console.log("FormCreateProject: onSubmit -> gql resp", resp);
      // setStAlert({open:true, isGood:true, txt:'Project created successfully'})
    }
  });
  
  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;
  
  if (loadingQuery) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  
  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <AlertAndres sx={{ mb:2}} open={stAlert.open} isGood={stAlert.isGood} txt={stAlert.txt} />
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
              label="*Mejor TextArea* Second Specific Objective"
              {...getFieldProps('specificObjective2')}
              error={Boolean(touched.specificObjective2 && errors.specificObjective2)}
              helperText={touched.specificObjective2 && errors.specificObjective2}
            />

            <TextField
              fullWidth
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
            <TextField
              fullWidth
              label="Start Date"
              {...getFieldProps('startDate')}
              error={Boolean(touched.startDate && errors.startDate)}
              helperText={touched.startDate && errors.startDate}
            />
            <TextField
              fullWidth
              label="*{Date Picker}*"
              {...getFieldProps('endDate')}
              error={Boolean(touched.endDate && errors.endDate)}
              helperText={touched.endDate && errors.endDate}
            />            
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
            loading={isSubmitting}
          >
            Create Project
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