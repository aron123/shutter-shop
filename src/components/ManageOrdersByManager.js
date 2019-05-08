import React, { Component } from 'react';

import OrderActions from '../actions/OrderActions';
import OrderStore from '../stores/OrderStore';
import OrderDetails from './OrderDetails';
import WorkerStore from '../stores/WorkerStore';
import WorkerActions from '../actions/WorkerActions';
import BillingDetails from './BillingDetails';
import CustomerStore from '../stores/CustomerStore';
import CustomerActions from '../actions/CustomerActions';
import ManagerControls from './ManagerControls';

class ManageOrdersByManager extends Component {

    constructor (props) {
        super(props);

        OrderActions.getOrders();
        WorkerActions.getWorkers();
        CustomerActions.getCustomers();

        this._onChange = this._onChange.bind(this);

        this.state = {
            orders: OrderStore._orders,
            workers: WorkerStore._workers,
            customers: CustomerStore._customers
        };
    }

    componentDidMount () {
        OrderStore.addChangeListener(this._onChange);
        WorkerStore.addChangeListener(this._onChange);
        CustomerStore.addChangeListener(this._onChange);
    }

    componentWillUnmount () {
        OrderStore.removeChangeListener(this._onChange);
        WorkerStore.removeChangeListener(this._onChange);
        CustomerStore.removeChangeListener(this._onChange);
    }

    _onChange () {
        this.setState({
            orders: OrderStore._orders,
            workers: WorkerStore._workers,
            customers: CustomerStore._customers
        });
    }

    getCustomerById = (customerId) => {
        for (const customer of this.state.customers) {
            if (customer.id === customerId) {
                return customer;
            }
        }
    } 

    getInvoiceBadge (order) {
        if (order.totalPrice === null) {
            return <span className="badge badge-danger">No invoice</span>
        }

        if (order.invoicePaid === true) {
            return <span className="badge badge-success">Paid</span>
        }

        return <span className="badge badge-danger">Not paid</span>
    }

    getInstallBadge (order) {
        return order.installationTime && order.installer
            ? <span className="badge badge-success">Install timed</span>
            : <span className="badge badge-danger">No install</span>
    }

    render () {
        if (!this.state.customers.length) {
            return null;
        }

        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div id="accordion">
                            {
                                this.state.orders.map(order => {
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
                                                        {this.getInvoiceBadge(order)}
                                                    </span>
                                                    <span className="float-right mt-1 mr-2">
                                                        {this.getInstallBadge(order)}
                                                    </span>
                                            </div>

                                            <div id={`collapse-${order.id}`} className="collapse" 
                                                aria-labelledby={`heading-${order.id}`} data-parent="#accordion"
                                            >
                                                <div className="card-body">
                                                    <ManagerControls
                                                        order={order}
                                                        workers={this.state.workers} />
                                                    <BillingDetails
                                                        customer={this.getCustomerById(order.customerId)} />
                                                    <OrderDetails 
                                                        order={order} 
                                                        workers={this.state.workers}
                                                        customerControls={false} />
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ManageOrdersByManager;