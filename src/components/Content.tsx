import React, {useContext, useState} from 'react';
import {Box, Container} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import {Price} from './Price';
import List from '@mui/material/List';
import {coins} from '../lib/coins';
import dayjs from 'dayjs';
import rollupSVG from "../images/rollup.svg"
import {ContractContext} from "../context/ContractProvider";

export function Content() {
  const {lastUpdate} = useContext(ContractContext);
  const [loadingPrices, setLoadingPrices] = useState(false)

  return <>
  <Container sx={{pt:4}} maxWidth="md">
  <Box sx={{backgroundColor:"#202020", borderRadius:3, p:3}}>
    <Box display={'flex'} alignItems="center">
      Updated: {dayjs(Number(lastUpdate)).format('YYYY/MM/DD - HH:mm:ss')}
      <CircularProgress
        sx={{display:loadingPrices ? "inline-block" : "none" ,m:"0 10px"}}
        size={"1em"}
      />
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
  <Box>
    <img style={{width:"100%"}} src={rollupSVG} alt="SVG as an image" />
  </Box>
  </Container>
  </>
  
}
