import React from 'react';
import {Grid} from '@mui/material';
import {styled} from '@mui/material/styles';
import Paper from '@mui/material/Paper';

export function ContentHeader() {

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#202020' : '#fff',
    ...theme.typography.body2,
    textAlign: 'left',
    padding: 20,    
    color: theme.palette.text.secondary,
    fontSize: '1.1em',
    height: '100%'
  }));

  return <>
  <Grid container spacing={4}>
      <Grid item xs={12} >
          <Item>
          <h3>An Oracle to inject token pair prices into your Smart Contract</h3>
              <p>The worker deployed on Pala Cloud periodically sends a request to the CoinGecko API, fetches all the prices for the pairs set, and sends them to the Ink! Smart Contract.</p>
              <p>The dApp will then query the Smart Contract until the timestamp of the prices is higher than the query timestamp, and refresh the data.</p>
          </Item> 
      </Grid>
    </Grid> 
  </>
}

 