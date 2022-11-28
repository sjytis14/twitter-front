import abi from "./abi";

let Web3 = require("web3");
// export const address = "0x8E8Ea48B2d01877Dde3111289567CaFFE4fceF6";
// export const address = "0xB302cB9121F788B8074C689C42B10aFf3bBB4a04";
export const address = "0x08E34e4b5eFe364e2EF5D6Da02D76Ef5AEeB93be";

export const web3 = new Web3(
  window.ethereum ||
    new Web3.providers.WebsocketProvider(
      "wss://eth-goerli.g.alchemy.com/v2/UiZH20_tEyGRDxvtlp7zhn1ye3t819qC"
      // "wss://ropsten.infura.io/ws/v3/c408acc6d32941a496920461a9c1335f"
    )
);

if (window.ethereum) window.ethereum.autoRefreshOnNetworkChange = false;

const smartContract = new web3.eth.Contract(abi, address);

export default smartContract;
