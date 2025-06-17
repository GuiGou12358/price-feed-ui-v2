import React, {useEffect, useState} from "react";
import {InkV5Contract} from "../lib/inkv5Contract";
import {InkV6Contract} from "../lib/inkv6Contract";


const POP_RPC = "wss://rpc1.paseo.popnetwork.xyz";
const POP_CONTRACT_ADDRESS = "0x96213b72A4CF50402D9dFe71919350451B8dC356";

const SHIBUYA_RPC="wss://rpc.shibuya.astar.network";
const SHIBUYA_CONTRACT_ADDRESS = "W6jGgZUAiryufdJRX33GdDTeX28pt7dZxawwbCUfFwbc2cH";

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

    setInkV5Contract(new InkV5Contract(SHIBUYA_RPC, SHIBUYA_CONTRACT_ADDRESS));
    setInkV6Contract(new InkV6Contract(POP_RPC, POP_CONTRACT_ADDRESS));


    const getTradingPair = async(tradingPairId : number) :Promise<TradingPair> => {

        if (inkVersion === "ink_v5") {
            return inkV5Contract.getTradingPair(tradingPairId);
        } else if (inkVersion === "ink_v6") {
            return inkV6Contract.getTradingPair(tradingPairId);
        } else {
            console.error("Unknow ink! version : ", inkVersion);
        }
    }


  return (
    <ContractContext.Provider
      value={{
          inkVersion,
          setInkVersion,
          getTradingPair,
          lastUpdate,
          setLastUpdate
      }}
    >
      {children}
    </ContractContext.Provider>
  );
};