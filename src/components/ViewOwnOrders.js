import React, { Component } from 'react';

import CustomerStore from '../stores/CustomerStore';
import OrderStore from '../stores/OrderStore';
import WorkerStore from '../stores/WorkerStore';

import CustomerActions from '../actions/CustomerActions';
import OrderActions from '../actions/OrderActions';
import WorkerActions from '../actions/WorkerActions';

import CustomerOrderList from './CustomerOrderList';

class ViewOwnOrders extends Component {

    constructor (props) {
        super(props);

        CustomerActions.getCustomers();
        WorkerActions.getWorkers();
        this._onChange = this._onChange.bind(this);
        this.state = {
            customers: CustomerStore._customers,
            workers: WorkerStore._workers,
            selectedCustomer: {},
            orders: OrderStore._filteredOrders
        };
    }

    componentDidMount () {
        CustomerStore.addChangeListener(this._onChange);
        OrderStore.addChangeListener(this._onChange);
        WorkerStore.addChangeListener(this._onChange);
    }

    componentWillUnmount () {
        CustomerStore.removeChangeListener(this._onChange);
        OrderStore.removeChangeListener(this._onChange);
        WorkerStore.removeChangeListener(this._onChange);
    }

    _onChange () {
        this.setState({
            customers: CustomerStore._customers,
            workers: WorkerStore._workers,
            selectedCustomer: CustomerStore._customer || {},
            orders: OrderStore._filteredOrders
        });
    }

    loadOrdersOfCustomer (customerId) {
        OrderActions.getOrdersByCustomer(customerId);
        CustomerActions.getCustomerById(customerId);
    }

    render () {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="form-group">
                            <label htmlFor="customer-select text-bold">Who am I?</label>
                            <small> (There is no authentication, so I can be anyone.)</small>
                            
                            <select className="form-control" id="customer-select" 
                                    onChange={ (e) => this.loadOrdersOfCustomer(e.target.value) }>
                                {
                                    this.state.customers.length === 0
                                        ? <option key={null} value={null}>Loading customers ...</option>
                                        : <option key={null} value={null}>Select customer</option>
                                }
                                {
                                    this.state.customers.map(customer => 
                                        <option key={customer.id} value={customer.id}>{customer.name}</option>)
                                }
                            </select>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <CustomerOrderList 
                            orders={this.state.orders}
                            workers={this.state.workers}
                            customer={this.state.selectedCustomer} />
                    </div>
                </div>
            </div>
        );
    }
}

export default ViewOwnOrders;