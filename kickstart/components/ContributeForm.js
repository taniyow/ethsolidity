import { Component } from 'react';
import { Form, Input, Button, Message } from 'semantic-ui-react';
import web3 from '../ethereum/web3';

import Campaign from '../ethereum/campaign';

import { Router } from '../routes';

class ContributeForm extends Component {
    state = {
        value: ''
    }

    onSubmit = async (event) => {
        event.preventDefault();

        const campaign = new Campaign(this.props.address);

        try {
            const accounts = await web3.eth.getAccounts();
            await campaign.methods.contribute().send({
                from: accounts[0],
                value: web3.utils.toWei(this.state.value, 'ether')
            })

            Router.replaceRoute(`/campaigns/${this.props.address}`)
        } catch (err) {

        }
    }

    render() {
        return (
            <Form onSubmit={this.onSubmit}>
                <Form.Field>
                    <label>Amount to Contribute</label>
                    <Input
                        value={this.state.value}
                        onChange={event => 
                            this.setState({ value: event.target.value })
                        }
                        label="ether"
                        labelPosition="right"
                    />
                </Form.Field>
                <Button primary>
                    Contribute
                </Button>
            </Form>
        )
    }
}

export default ContributeForm;