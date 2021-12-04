import { Alert, Box, Collapse } from '@mui/material';
import React from 'react'
import PropTypes from 'prop-types';

AlertAndres.propTypes = {
    open: PropTypes.bool,
    isGood: PropTypes.bool,
    txt: PropTypes.string
}

/**
 * afrp
 * alerta generica que se desliza y toma como parametro un texto
 * Es llamada por las formas de creación y actualización
 * FormCreateProject y FormUpdateProject
 */
export default function AlertAndres( {open, isGood, txt} ) {
    return (
        <Box sx={{ width: '100%' }}>
        <Collapse in={open}>
          {isGood ? <Alert severity="success">{txt}</Alert>
                  : <Alert severity="warning">{txt}</Alert>
          }
        </Collapse>
      </Box>
    );
  };
