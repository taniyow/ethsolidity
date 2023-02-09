import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  CampaignFactory.abi,
  "0x205DDCe03eD63E6e5b9936F01B37000766f8Aa3C"
);

export default instance;