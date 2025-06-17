import React from 'react';
import { Typography } from '@mui/material';

export function AppHeader() {

  return (<>
    <Typography sx={{fontSize:{xs:'1.5em',sm:'2.5em'}}} width={"100%"} fontFamily={"unbounded"} variant="h3" gutterBottom>
        <a style={{color:"inherit",textDecoration:"none"}} href="/"><span style={{color:"#CC0060"}}>Pri</span>ce <span style={{color:"#CC0060"}}>Fe</span>ed <span style={{color:"#CC0060"}}>Ora</span>cle</a>
    </Typography>
  </>);
}