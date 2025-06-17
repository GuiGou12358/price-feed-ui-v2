import React, {useContext, useEffect, useState} from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

import {formatTokenBalance} from '../lib/formatTokenBalance';
import {ContractContext, TradingPair} from "../context/ContractProvider";

export function Price(props) {

  const {setLastUpdate, getTradingPair } = useContext(ContractContext);
  const [price, setPrice] = useState();
  const [itemLastUpdate, setItemLastUpdate] = useState();

  useEffect(() => {
    // load the page
    doQuery();

    // do it every 60 seconds
    const doQueryInInterval = setInterval(() => {
      doQuery();
    }, 60 * 1000);

    return () => {
      clearInterval(doQueryInInterval);
    }
  });

  const doQuery = async () =>{
    try {
      const tradingPair : TradingPair = await getTradingPair(props.pairId);
      if (itemLastUpdate !== tradingPair.lastUpdate){
        props.loading.setLoadingPrices(true)
        setPrice(formatTokenBalance(tradingPair.value, "USD", 18));
        setItemLastUpdate(tradingPair.lastUpdate)
        setLastUpdate(tradingPair.lastUpdate);
        props.loading.setLoadingPrices(false);
      } else {
        console.log("No update");
      }
    } catch (e){
      console.error(e);
    }
  }


  return (<>
    <ListItem sx={{overflow:"auto"}} key={props.ticker} alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt={props.ticker} src={props.image} />
        </ListItemAvatar>
        <ListItemText
          primary={props.ticker}
          secondary={price}
        />
      </ListItem>
  </>);


}
