import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  CampaignFactory.abi,
  "0xEE85fE50A8f91D48d5447A043C0E4C9C6f87DD0d"
);

export default instance;
