import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField
} from '@mui/material';

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

export default function ProfileForm(props) {
  const [values, setValues] = useState({
    initialValues: {
      firstName: '',
      lastName: '',
      identification: '',
      role: '',
      password: ''
    }
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  return (
    <form autoComplete="off" noValidate {...props}>
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
                value={values.firstName}
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
                value={values.lastName}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Identification"
                name="identification"
                onChange={handleChange}
                required
                value={values.identification}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Select Role"
                name="role"
                onChange={handleChange}
                required
                select
                SelectProps={{ native: true }}
                value={values.role}
                variant="outlined"
              >
                {role.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Password"
                name="password"
                onChange={handleChange}
                equired
                value={values.password}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >
          <Button color="primary" variant="contained">
            Save details
          </Button>
        </Box>
      </Card>
    </form>
  );
}
