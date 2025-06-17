import {contracts, shibuya} from "@polkadot-api/descriptors"
import {createClient} from "polkadot-api"
import {withPolkadotSdkCompat} from "polkadot-api/polkadot-sdk-compat"
import {getWsProvider} from "polkadot-api/ws-provider/web"
import {createInkSdk} from "@polkadot-api/sdk-ink"
import {TradingPair} from "../context/ContractProvider";


const ALICE = "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY";

export class InkV5Contract {

  contract: any

  constructor(
    rpc: string,
    address: string,
  ) {
    const client = createClient(withPolkadotSdkCompat(getWsProvider(rpc)))
    const typedApi = client.getTypedApi(shibuya)
    const sdk = createInkSdk(typedApi, contracts.price_feed_consumer_ink_v5)
    this.contract = sdk.getContract(address)
  }

  async getTradingPair (tradingPairId : number) : Promise<TradingPair> {

    console.log("getTradingPair %s", tradingPairId);

    const { value, success } = await this.contract.query(
        "get_trading_pair",
        {
          origin: ALICE,
          data: {
            trading_pair_id : tradingPairId,
          },
        },
    );
    //console.log("getTradingPair - success %s", success);
    //console.log(value);
    if (!success) {
      return Promise.reject("Error to query get_trading_pair method")
    }
    return {
      tradingPairId: tradingPairId,
      token0: value.response?.token0,
      token1: value.response?.token1,
      value: value.response?.value,
      nbUpdates: value.response?.nb_updates,
      lastUpdate: value.response?.last_update,
    }
  }
}
