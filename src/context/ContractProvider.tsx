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

    const [inkVersion, setInkVersion] = useState("ink_v6");
    const [inkV5LastUpdate, setInkV5LastUpdate] = useState();
    const [inkV6LastUpdate, setInkV6LastUpdate] = useState();
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
            return await contract?.getTradingPair(tradingPairId);
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
            return await query(inkV5Contract, tradingPairId);
        } else if (inkVersion === "ink_v6") {
            return await query(inkV6Contract, tradingPairId);
        } else {
            console.error("Unknow ink! version : ", inkVersion);
        }
    }

    const setLastUpdate = (timestamp : bigint) => {
        if (inkVersion === "ink_v5") {
            return setInkV5LastUpdate(timestamp);
        } else if (inkVersion === "ink_v6") {
            return setInkV6LastUpdate(timestamp);
        }
        console.error("Unknow ink! version : ", inkVersion);
    }

    const getLastUpdate = () : bigint => {
        if (inkVersion === "ink_v5") {
            return inkV5LastUpdate;
        } else if (inkVersion === "ink_v6") {
            return inkV6LastUpdate;
        }
        console.error("Unknow ink! version : ", inkVersion);
        return undefined;
    }

  return (
    <ContractContext.Provider
      value={{
          inkVersion,
          setInkVersion,
          getLastUpdate,
          setLastUpdate,
          getTradingPair
      }}
    >
      {children}
    </ContractContext.Provider>
  );
};