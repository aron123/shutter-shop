import React, { Component } from 'react';
import OrderDetails from './OrderDetails';
import BillingDetails from './BillingDetails';

class CustomerOrderList extends Component {

    getOrderBadge (order) {
        if (order.totalPrice === null) {
            return <span className="badge badge-info">No invoice</span>
        }

        if (order.invoicePaid === true) {
            return <span className="badge badge-success">{`Paid - ${order.totalPrice} $`}</span>
        }

        return <span className="badge badge-danger">{`Not paid - ${order.totalPrice} $`}</span>
    }
    
    render () {
        if (!this.props.orders || this.props.orders.length === 0) {
            return <p className="text-center">There are no orders for this customer.</p>
        }

        return (
            <div id="accordion">
                {
                    this.props.orders.map(order => {
                        return (
                            <div key={order.id} className="card mb-2">
                                <div className="card-header p-0" id={`heading-${order.id}`}>
                                        <button className="btn btn-link" 
                                            data-toggle="collapse" data-target={`#collapse-${order.id}`} 
                                            aria-expanded="true" aria-controls={`collapse-${order.id}`}
                                        >
                                            {`Order #${order.id}`}
                                        </button>

                                        <span className="float-right mt-1 mr-2">
                                            {this.getOrderBadge(order)}
                                        </span>
                                </div>

                                <div id={`collapse-${order.id}`} className="collapse" 
                                    aria-labelledby={`heading-${order.id}`} data-parent="#accordion"
                                >
                                    <div className="card-body">
                                        <div className="container">
                                            <div className="row">
                                                <div className="col">
                                                    <BillingDetails customer={this.props.customer} />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col">
                                                    <OrderDetails 
                                                        order={order}
                                                        workers={this.props.workers}
                                                        onOrderPaid={this.props.onOrderPaid} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}

export default CustomerOrderList;