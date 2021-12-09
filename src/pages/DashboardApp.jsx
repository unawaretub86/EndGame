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




// ----------------------------------------------------------------------
// const VIEWER_QUERY = gql`
//   query {
//     viewer {
//       name
//       login
//     }
//   }
// `;
// const REPOSITORIES_QUERY = gql`
//   query MyRepositories($first: Int!) {
//     viewer {
//       name
//       avatarUrl
//       login
//       repositories(first: $first) {
//         nodes {
//           id
//           name
//           stargazers {
//             totalCount
//           }
//         }
//       }
//     }
//   }
// `;

// ----------------------------------------------------------------------
export default function DashboardApp() {
  // const { data, loading } = useQuery(VIEWER_QUERY);
  const [first, setFirst] = useState(1);
  // const { data, loading, refetch } = useQuery(REPOSITORIES_QUERY, { variables: { first } });
  
  const { userData } = useContext(ContextUser);
  console.log(userData);

  return (
    <>
      {/* {loading ? '' : `${data.viewer.name} - ${data.viewer.login}`}
      <div>
        {data?.viewer?.map(({ name, login }) => (
          <>
            <p>bar
              {}
              {name} - {login}
            </p>
          </>
        ))}
      </div> */}

      <Page title="Dashboard | Minimal-UI">
        <Container maxWidth="xl">
          
          <Box sx={{ pb: 5 }}>
            <Typography variant="h4">Hi, {userData.name} {userData.lastName} . Welcome back</Typography>
          </Box>
          <Grid container spacing={3}>
            {userData.role === 'admin' || userData.role === 'leader'? 
              <Grid item xs={12} sm={6} md={3}>
                <AppUsers />
              </Grid>
              :null}
            <Grid item xs={12} sm={6} md={3}>
              <AppNewProjects />
            </Grid>
            {userData.role === 'student' || userData.role === 'leader'? 
              <>
                <Grid item xs={12} sm={6} md={3}>
                  <AppEnrollments />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <AppAdvances />
                </Grid>
              </>
              :null}
          </Grid>
        </Container>
      </Page>
    </>
  );
}
