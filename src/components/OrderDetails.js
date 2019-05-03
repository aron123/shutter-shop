import React, { Component } from 'react';
import PayButton from './PayButton';

class OrderDetails extends Component {

    successMark = <i className="fas fa-check text-success"></i>;

    failMark = <i className="fas fa-times text-danger"></i>;

    questionMark = <i className="fas fa-question text-info"></i>;

    getWorkerData (id) {
        if (!this.props.workers) {
            return null;
        }

        for (const worker of this.props.workers) {
            if (worker.id === id) {
                return worker;
            }
        }

        return null;
    }

    getWorkerText (workerId) {
        const worker = this.getWorkerData(workerId);
        return worker ? `${worker.name} (${worker.mobile})` : 'N/A';
    }

    render () {
        return (
            <div className="order-details">
                <h4>Order details</h4>

                <h5>Invoice</h5>
                <table className="table table-sm table-striped">
                    <tbody>
                        <tr>
                            <td className="w-25">Total price:</td>
                            <td className="w-75">
                                {this.props.order.totalPrice ? `${this.props.order.totalPrice} $` : 'Not yet determined'}
                            </td>
                        </tr>
                        <tr>
                            <td className="align-middle">Invoice paid:</td>
                            <td>
                                    <span>
                                        {this.props.order.invoicePaid ? this.successMark : this.failMark}
                                    </span>
                                    <span className="ml-2">
                                        {!this.props.order.invoicePaid && this.props.order.totalPrice 
                                            ? <PayButton order={this.props.order} onOrderPaid={this.props.onOrderPaid} /> : ''}
                                    </span>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <h5>Installing</h5>
                <table className="table table-sm table-striped">
                    <tbody>
                        <tr>
                            <td className="w-25">Assembled:</td>
                            <td className="w-75">{this.props.order.assembled ? this.successMark : this.failMark}</td>
                        </tr>
                        <tr>
                            <td>Installer:</td>
                            <td>
                                {
                                    this.props.order.installer
                                        ? this.getWorkerText(this.props.order.installer)
                                        : this.questionMark
                                }
                            </td>
                        </tr>
                        <tr>
                            <td>Install time:</td>
                            <td>
                                {this.props.order.installationTime ? this.props.order.installationTime : this.questionMark}
                            </td>
                        </tr>
                    </tbody>
                </table>

                <h5>Ordered shutters</h5>
                <table className="table table-sm table-striped">
                    <thead>
                        <tr>
                            <th>Qty</th>
                            <th>Window</th>
                            <th>Shutter</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.order.items.map((item, index) =>
                                <tr key={index}>
                                    <td>{item.pieces}×</td>
                                    <td>{item.window.width} cm × {item.window.height} cm</td>
                                    <td>{item.shutter.name} ({item.shutter.material})</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default OrderDetails;