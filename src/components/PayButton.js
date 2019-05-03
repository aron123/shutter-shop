import React, { Component } from 'react';
import * as OrderStore from '../stores/OrderStore';

class PayButton extends Component {
    constructor (props) {
        super(props);
        this.state = {
            loading: false,
            completed: props.order.invoicePaid
        };
    }

    startPayment = () => {
        const orderId = this.props.order.id;

        this.setState({ loading: true });
        
        OrderStore.payOrder(orderId)
            .then(() => {
                this.setState({ completed: true });
                this.props.onOrderPaid(orderId);
            })
            .catch((err) => console.log(err));
    }

    render () {
        if (!this.props.order || this.state.completed) {
            return null;
        }

        if (this.state.loading) {
            return (
                <button className="btn btn-sm btn-primary">
                    <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                    <span className="sr-only">Completing ...</span>
                </button>
            );
        }

        return (
            <button className="btn btn-sm btn-primary" onClick={this.startPayment}>
                Pay order
            </button>
        );
    }
}

export default PayButton;
