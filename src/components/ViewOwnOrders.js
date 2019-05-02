import React, { Component } from 'react';
import * as CustomerStore from '../stores/CustomerStore';
import * as OrderStore from '../stores/OrderStore';
import * as WorkerStore from '../stores/WorkerStore';
import CustomerOrderList from './CustomerOrderList';

class ViewOwnOrders extends Component {

    constructor (props) {
        super(props);
        this.state = {
            customers: [],
            workers: [],
            selectedCustomer: {},
            orders: []
        };
    }

    componentDidMount () {
        CustomerStore.getCustomers()
            .then(customers => this.setState({ customers }));
        WorkerStore.getAllWorkers()
            .then(workers => this.setState({ workers }));
    }

    loadOrdersOfCustomer (customerId) {
        OrderStore.getOrderByCustomer(customerId)
            .then(orders => this.setState({ orders }));
        CustomerStore.getCustomerById(customerId)
            .then(selectedCustomer => this.setState({ selectedCustomer }));
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