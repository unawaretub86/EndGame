import { useQuery, useMutation } from '@apollo/client';
import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, Divider, Grid, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { UPDATE_USER } from '../../graphql/users/mutations';
import { GET_USER_BY_ID } from '../../graphql/users/queries';

export default function ProfileForm() {
  const [stProfileForm, setProfileForm] = React.useState({});
  const [UpdateUser, { loading: loadMutation }] = useMutation(UPDATE_USER);

  const resp = useQuery(GET_USER_BY_ID, {
    variables: {
      id: '61ac499b6a529329c646eef3'
    },
    fetchPolicy: 'network-only'
  });

  const { data, error, loading } = resp;

  useEffect(() => {
    if (data) {
      setProfileForm(data.userById);
    }
  }, [data]);

  if (loading) return <div>Loading....</div>;
  console.log('trae la data, profile form', data);
  const dataUser = data.userById;
  // const hdlActivation = () => {

  //     UpdateUser({ variables: toSend });
  //     setProfileForm({ ...stProfileForm });
  //     return;
  //   }
  //   UpdateUser({ variables: toSend });
  //   setProfileForm({ ...stProfileForm, status: nextStatus });
  // };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>xx Error xx</p>;

  const handleChange = (userById, name, lastName, documentId, email, password) => {
    const paqueteEnvioBd = {
      input: {
        userById,
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
                value={stProfileForm.name}
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
                value={stProfileForm.lastName}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="DocumentId"
                name="documentId"
                onChange={handleChange}
                required
                value={stProfileForm.documentId}
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
                value={stProfileForm.email}
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
                value={stProfileForm.password}
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
