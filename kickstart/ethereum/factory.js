import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0x5E6fa912B8686b6C16A6B401Af8183D8799BFcFA'
);

export default instance;