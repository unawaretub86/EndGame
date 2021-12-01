import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function FormUpdateProject() {
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          
          id="outlined-error"
          label="Nombres"
          defaultValue="Hello World"
        />
        <TextField
          
          id="outlined-error-helper-text"
          label="Apellidos"
          defaultValue="Hello World"
          helperText="Incorrect entry."
        />
      </div>
      <div>
        <TextField
          
          id="filled-error"
          label="Email"
          defaultValue="Hello World"
          variant="filled"
        />
        <TextField
          
          id="filled-error-helper-text"
          label="Role"
          defaultValue="Hello World"
          helperText="Incorrect entry."
          variant="filled"
        />
      </div>
      <div>
        <TextField
          
          id="standard-error"
          label="Status"
          defaultValue="Hello World"
          variant="standard"
        />
        
      </div>
    </Box>
  );
}
