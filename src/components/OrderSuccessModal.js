import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class OrderSuccessModal extends Component {
    render () {
        return (
            <div class="modal show" id="order-success-modal" tabindex="-1" role="dialog">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">{ this.props.success ? 'Successful order' : 'Error occured' }</h5>
                        </div>
                        <div class="modal-body">
                            <p>{ this.props.success 
                                    ? 'Your order was successfully saved, check it on \'View own orders\' page.'
                                    : 'Some error was occured while trying to save your order, please try again later.' }</p>
                        </div>
                        <div class="modal-footer">
                            <a className="btn btn-primary" href="/">OK</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default OrderSuccessModal;