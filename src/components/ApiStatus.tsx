import { useContext } from 'react';
import { Box, Chip, Tooltip } from '@mui/material';
import {Typography} from '@mui/material';

export function ApiStatus(props) {
/*
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
    const StatusDot = (props)=> {
        if(props.api?._isReady) {
            return <GreenDot/>
        }
        else {
            return <RedDot/>
        }
    }
 */
/*
    const apis={astar:astarContext}
    const api = apis[props.context].api
    const provider = apis[props.context].provider

 */

    //const context = props.context.charAt(0).toUpperCase() + props.context.slice(1);

    //const address = CONTRACT_ADDRESSES[props.context]
    //console.log("Api.provider",provider?.endpoint)
    return (<>
        <Tooltip placement="top" children={undefined} title={undefined} >
            <Box display="flex" alignItems="center" sx={{marginLeft:"auto"}}>
                <Chip label={"testnet"} />
            </Box>
        </Tooltip>
    </>);
    /*
    return (<>
        <Tooltip placement="top" title={<><Typography m={"5px 0"} p={0}>{provider?.endpoint}</Typography>{address}</>}>
            <Box display="flex" alignItems="center" sx={{marginLeft:"auto"}}>
                <Chip icon={<StatusDot api={api} />} label={context+" testnet"} />
                
            </Box>
        </Tooltip>
    </>);

     */

}