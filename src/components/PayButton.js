import React, { Component } from 'react';
import OrderActions from '../actions/OrderActions';

class PayButton extends Component {
    constructor (props) {
        super(props);
        this.state = {
            loading: false,
            completed: props.order.invoicePaid
        };
    }

    startPayment = () => {
        this.setState({ loading: true });
        OrderActions.payOrder(this.props.order.id);
        this.setState({ loading: false });
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
