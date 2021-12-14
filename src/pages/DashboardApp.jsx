import React, { useContext, useEffect, useState } from 'react';
import { useMutation, useQuery, gql } from '@apollo/client';
/* eslint-disable import/named */
// material
import { Box, Grid, Container, Typography, Breadcrumbs, Link } from '@mui/material';
// components
import Page from '../components/Page';
import {
  AppAdvances,
  AppUsers,
  AppNewProjects,
  AppEnrollments
} from '../components/_dashboard/app';
import Login from './Login';
import { ContextUser } from '../contexts/ContextUser';

export default function DashboardApp() {
  // const { data, loading } = useQuery(VIEWER_QUERY);
  const [first, setFirst] = useState(1);
  // const { data, loading, refetch } = useQuery(REPOSITORIES_QUERY, { variables: { first } });

  const { userData } = useContext(ContextUser);
  console.log(userData);

  return (
    <>
      <Page title="Dashboard | End Game">
        <Container maxWidth="xl">
          <Box sx={{ pb: 5 }}>
            <Typography variant="h4">
              Hi, {userData.name} {userData.lastName} . Welcome back
            </Typography>
          </Box>
          <Grid container spacing={3}>
            {userData.role === 'admin' || userData.role === 'leader' ? (
              <Grid item xs={12} sm={6} md={3}>
                <AppUsers />
              </Grid>
            ) : null}
            <Grid item xs={12} sm={6} md={3}>
              <AppNewProjects />
            </Grid>
            {userData.role === 'student' || userData.role === 'leader' ? (
              <>
                <Grid item xs={12} sm={6} md={3}>
                  <AppEnrollments />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <AppAdvances />
                </Grid>
              </>
            ) : null}
          </Grid>
        </Container>
      </Page>
    </>
  );
}
