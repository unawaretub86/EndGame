import React from 'react'
import { useQuery, useMutation } from '@apollo/client'
import Button from '@mui/material/Button';

import { GET_PROJECT_ADMIN_BYID } from '../../graphql/projects/prj-queries';

export default function AdminProject({ dataID }) {
    const {data, loading, error} = useQuery(GET_PROJECT_ADMIN_BYID, {
        variables: {
            id: dataID
        }
    })

    const hdlActivation = () => {
        console.log('Activation')
    }
    if (loading) return <p>Loading...</p>
    if (error) return <p>xx Error xx</p>

    const projectAdminInfo = data.projectById;

    return (
        <>
            <h2>Administrate: {projectAdminInfo.name}</h2>
            <pre>{JSON.stringify(data, null, 2)}</pre>
            <Button variant="outlined" onClick={hdlActivation}>{ projectAdminInfo === 'inactive' ? 'Activate':'Inactivate'}</Button>         
        </>
    )
}
