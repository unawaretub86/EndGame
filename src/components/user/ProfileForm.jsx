import { useQuery, useMutation } from '@apollo/client';
import { useEffect } from 'react';
import { Card, CardContent, CardHeader, Divider, Grid, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { UPDATE_USER } from '../../graphql/users/mutations';
import { GET_USER_BY_ID } from '../../graphql/users/queries';

export default function ProfileForm() {
  const [UpdateUser, { loading: loadMutation }] = useMutation(UPDATE_USER);
  const { data, error, loading } = useQuery(GET_USER_BY_ID, {
    variables: {
      id: '61ac499b6a529329c646eef3'
    }
  });
  useEffect(() => {
    if (error) {
      console.log('Error consulting userdata', error);
    }
  }, [error]);

  if (loading) return <div>Loading....</div>;
  console.log('trae la data, profile form', data);
  const dataUser = data.userById;
  // const [values, setValues] = useState({
  //   initialValues: {
  //     name: '',
  //     lastName: '',
  //     identification: '',
  //     email: '',
  //     password: ''
  //   }
  // });

  // const handleChange = (event) => {
  //   setValues({
  //     ...values,
  //     [event.target.name]: event.target.values
  //   });
  // };
  const handleChange = (_id, name, lastName, documentId, email, password) => {
    const paqueteEnvioBd = {
      input: {
        userById: _id,
        name,
        lastName,
        documentId,
        email,
        password
      }
    };
    UpdateUser({ variables: paqueteEnvioBd });
  };

  return (
    <form autoComplete="off" noValidate>
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
                onChange={handleChange}
                required
                value={dataUser._id}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText="Please specify the first name"
                label="First name"
                name="firstName"
                onChange={handleChange}
                required
                value={dataUser.name}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Last name"
                name="lastName"
                onChange={handleChange}
                required
                value={dataUser.lastName}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="DocumentIdn"
                name="documentId"
                onChange={handleChange}
                required
                value={dataUser.documentId}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                onChange={handleChange}
                required
                value={dataUser.email}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Password"
                name="password"
                onChange={handleChange}
                required
                value={dataUser.password}
                variant="outlined"
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
          loading={loadMutation}
        >
          Edit Profile
        </LoadingButton>
      </Card>
    </form>
  );
}
