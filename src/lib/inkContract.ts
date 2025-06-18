import {contracts, pop, shibuya} from "@polkadot-api/descriptors"
import {createClient, PolkadotClient} from "polkadot-api"
import {withPolkadotSdkCompat} from "polkadot-api/polkadot-sdk-compat"
import {getWsProvider} from "polkadot-api/ws-provider/web"
import {createInkSdk, createReviveSdk} from "@polkadot-api/sdk-ink"
import {TradingPair} from "../context/ContractProvider";

const ALICE = "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY";

const clients = new Map<string, PolkadotClient>;

export class InkContract {

  protected contract: any;

  async getTradingPair (tradingPairId : number) : Promise<TradingPair> {
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

export class InkV5Contract extends InkContract {

  constructor(
    rpc: string,
    address: string,
  ) {
    super()
    if (!clients.has(rpc)){
      clients.set(rpc, createClient(withPolkadotSdkCompat(getWsProvider(rpc))));
    }
    const client = clients.get(rpc);
    const typedApi = client.getTypedApi(shibuya);
    const sdk = createInkSdk(typedApi, contracts.price_feed_consumer_ink_v5);
    this.contract = sdk.getContract(address);
  }

}

export class InkV6Contract extends InkContract {

  constructor(
      rpc: string,
      address: string,
  ) {
    super()
    if (!clients.has(rpc)){
      clients.set(rpc, createClient(withPolkadotSdkCompat(getWsProvider(rpc))));
    }
    const client = clients.get(rpc);
    const typedApi = client.getTypedApi(pop);
    const sdk = createReviveSdk(typedApi, contracts.price_feed_consumer_ink_v6);
    this.contract = sdk.getContract(address);
  }

}

