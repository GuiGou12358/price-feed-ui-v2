import React, {useContext, useState} from 'react';
import {Box, Container} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import {Price} from './Price';
import List from '@mui/material/List';
import {coins} from '../lib/coins';
import dayjs from 'dayjs';
import {ContractContext} from "../context/ContractProvider";
import {ApiStatus} from "./ApiStatus";

export function Content() {
  const {getLastUpdate} = useContext(ContractContext);
  const [loadingPrices, setLoadingPrices] = useState(false)

  const formatTimestamp = (timestamp : bigint | undefined) :string => {
    if (timestamp == undefined) {
      return "undefined";
    }
    const n = Number(timestamp);
    const day = n > 1e12 ? dayjs(n) : dayjs.unix(n);
    return day.format('YYYY/MM/DD - HH:mm:ss');
  }


  return <>
  <Container sx={{pt:4}} maxWidth="md">
    <Box sx={{backgroundColor:"#202020", borderRadius:3, p:3}}>
      <Box display={'flex'} alignItems="center">
        Updated: {formatTimestamp(getLastUpdate())}
        <CircularProgress
          sx={{display:loadingPrices ? "inline-block" : "none" ,m:"0 10px"}}
          size={"1em"}
        />

        <ApiStatus/>
      </Box>
      <List sx={{
        opacity:loadingPrices ? 0.3 : 1,
        columnCount: {
          xs: '1 !important',
          sm: '2 !important',
          md: '3 !important',
        },
      }}>
        {Object.values(coins).map((ele)=>{return <>
          <Price loading={{loadingPrices, setLoadingPrices}} key={ele.ticker} ticker={ele.ticker} pairId={ele.pairId} image={ele.image} />
        </>})}
      </List>
    </Box>
  </Container>
  </>
  
}
