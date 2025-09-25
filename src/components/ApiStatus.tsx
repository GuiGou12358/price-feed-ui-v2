import React, {useContext} from 'react';
import {Box, Chip, Tooltip, Typography} from '@mui/material';
import {ContractContext} from "../context/ContractProvider";
import {CONTRACT_ADDRESS, PROVIDER_ENDPOINT} from "../lib/constants";


export function ApiStatus() {
    const {inkVersion} = useContext(ContractContext);

    const GreenDot = ()=>{
        return <>
            <svg fill="#00b100" width="30px" height="30px" viewBox="0 0 20.00 20.00" xmlns="http://www.w3.org/2000/svg" stroke="#00b100" strokeWidth="2">
                <g id="SVGRepo_iconCarrier"><path d="M7.8 10a2.2 2.2 0 0 0 4.4 0 2.2 2.2 0 0 0-4.4 0z"></path></g>
            </svg>
        </>
    }
    const RedDot = ()=>{
        return <>
            <svg fill="#b10000" width="30px" height="30px" viewBox="0 0 20.00 20.00" xmlns="http://www.w3.org/2000/svg" stroke="#b10000" strokeWidth="2">
                <g id="SVGRepo_iconCarrier"><path d="M7.8 10a2.2 2.2 0 0 0 4.4 0 2.2 2.2 0 0 0-4.4 0z"></path></g>
            </svg>
        </>
    }
    const StatusDot = ()=> {
        if(true) {
            return <GreenDot/>
        }
        else {
            return <RedDot/>
        }
    }

    const provider = (inkVersion === "ink_v5") ? PROVIDER_ENDPOINT.shibuya : PROVIDER_ENDPOINT.pah;
    const address = (inkVersion === "ink_v5") ? CONTRACT_ADDRESS.shibuya : CONTRACT_ADDRESS.pah;
    const context = (inkVersion === "ink_v5") ? "Astar testnet" : "PAH Network";

    return (<>
        <Tooltip placement="top" title={<><Typography m={"5px 0"} p={0}>{provider}</Typography>{address}</>}>
            <Box display="flex" alignItems="center" sx={{marginLeft:"auto"}}>
                <Chip icon={<StatusDot/>} label={context} />
            </Box>
        </Tooltip>
    </>);


}