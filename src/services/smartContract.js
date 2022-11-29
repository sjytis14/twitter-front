import abi from "services/abi";

let Web3 = require("web3");

export const address = "0x489Ac9776D79f25dd24255632f954c87e5261186";

export const web3 = new Web3(
	window.ethereum ||
		new Web3.providers.WebsocketProvider(
			"wss://eth-goerli.g.alchemy.com/v2/UiZH20_tEyGRDxvtlp7zhn1ye3t819qC"
		)
);

if (window.ethereum) window.ethereum.autoRefreshOnNetworkChange = false;

const smartContract = new web3.eth.Contract(abi, address);

export default smartContract;
