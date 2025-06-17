import { formatBalance } from '@polkadot/util';

export const formatTokenBalance = (value : bigint,unit : string, decimals:number) => {

    formatBalance.setDefaults({unit: unit,decimals: decimals});
    const formated = formatBalance(
        value,
        { 
            //withSiFull: true,
            //withSi: true,
            forceUnit: unit,
            decimals: decimals,
            withZero: false,
        }
    );
    return formated
}