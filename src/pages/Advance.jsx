import { Grid, Paper, styled } from '@mui/material';

import React from 'react';
import CardTimeLineThree from '../components/card/CardTimeLineThree';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary
  }));

function Advance () {
    return(
        <>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <Item>
                        <CardTimeLineThree
                            title="factors assimilated to violence"
                            fase1="Inscriciones"
                            fase2="Inicio"
                            fase3="Visitas"
                        />
                    </Item>
                </Grid>
            </Grid>
        </>
    )
}

export default Advance;