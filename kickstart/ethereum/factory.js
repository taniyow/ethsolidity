import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0xBC593751EC0b39003Beb419044547fe6cce51746'
);

export default instance;