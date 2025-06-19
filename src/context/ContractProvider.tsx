import React, {useEffect, useState} from "react";
import {InkContract, InkV5Contract, InkV6Contract} from "../lib/inkContract";
import {cryptoWaitReady} from "@polkadot/util-crypto";
import {CONTRACT_ADDRESS, PROVIDER_ENDPOINT} from "../lib/constants";

export const ContractContext = React.createContext();

export type TradingPair = {
    tradingPairId: number,
    token0: string,
    token1: string,
    value: bigint,
    nbUpdates: number,
    lastUpdate: bigint,
}

export const ContractProvider = ({ children }) => {

    const [lastUpdate, setLastUpdate] = useState();
    const [inkVersion, setInkVersion] = useState("ink_v6");
    const [inkV5Contract, setInkV5Contract] = useState();
    const [inkV6Contract, setInkV6Contract] = useState();

    useEffect(()=>{
        const load = async () => {
            await cryptoWaitReady().catch(console.error);
            setInkV5Contract(new InkV5Contract(PROVIDER_ENDPOINT.shibuya, CONTRACT_ADDRESS.shibuya));
            setInkV6Contract(new InkV6Contract(PROVIDER_ENDPOINT.pop, CONTRACT_ADDRESS.pop));
        }
        load().catch(console.error);
    },[])


    const query = async(contract: InkContract, tradingPairId : number) :Promise<TradingPair> => {
        if (contract){
            return inkV5Contract?.getTradingPair(tradingPairId);
        }
        return {
            tradingPairId,
            token0: 'NA',
            token1: 'NA',
            lastUpdate: BigInt(0),
            nbUpdates: 0,
            value: BigInt(0)
        }
    }

    const getTradingPair = async(tradingPairId : number) :Promise<TradingPair> => {
        if (inkVersion === "ink_v5") {
            return query(inkV5Contract, tradingPairId);
        } else if (inkVersion === "ink_v6") {
            return query(inkV6Contract, tradingPairId);
        } else {
            console.error("Unknow ink! version : ", inkVersion);
        }
    }

  return (
    <ContractContext.Provider
      value={{
          inkVersion,
          setInkVersion,
          lastUpdate,
          setLastUpdate,
          getTradingPair
      }}
    >
      {children}
    </ContractContext.Provider>
  );
};