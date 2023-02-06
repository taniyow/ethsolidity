import 'semantic-ui-css/semantic.min.css'

import { Component } from 'react';
import factory from '../ethereum/factory';

class CampaignIndex extends Component {
    static async getInitialProps() {
        const campaigns = await factory.methods.getDeployedCampaigns().call();

        return { campaigns };
    }

    render() {
        return <div>{this.props.campaigns[0]}</div>
    }
};

export default CampaignIndex;