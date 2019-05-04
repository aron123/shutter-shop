import React, { Component } from 'react';
import * as CustomerStore from '../stores/CustomerStore';
import * as ShutterStore from '../stores/ShutterStore';
import OrderItem from './OrderItem';
import * as OrderStore from '../stores/OrderStore';
import OrderSuccessModal from './OrderSuccessModal';
import $ from 'jquery'; 

const NEW_CUSTOMER_KEY = "newcustomer";

const DEFAULT_ORDER_ITEM = () => {
    return {
        pieces: 1,
        window: {
            width: 1,
            height: 1
        },
        shutter: ''
    };
};

class CreateOrder extends Component {

    constructor (props) {
        super(props);
        this.state = {
            showOrderPanel: false,
            customers: [],
            selectedCustomer: null,
            shutters: [],
            order: {
                customerId: null,
                comment: null,
                items: [ new DEFAULT_ORDER_ITEM() ]
            },
            orderSuccess: false
        }
    }

    componentDidMount () {
        CustomerStore.getCustomers()
            .then(customers => this.setState({ customers }));
        ShutterStore.getShutters()
            .then(shutters => this.setState({ shutters }));
    }

    getCustomerData (id) {
        for (const customer of this.state.customers) {
            if (customer.id === id) {
                return customer;
            }
        }
    }

    onCustomerSelectChanges = (event) => {
        const customerId = event.target.value === NEW_CUSTOMER_KEY ? null : event.target.value;
        const order = this.state.order;
        order.customerId = customerId;

        this.setState({
            selectedCustomer: this.getCustomerData(customerId),
            order
        });
    }

    onCustomerDataChanged = (event, key) => {
        const value = event.target.value;
        let selectedCustomer = this.state.selectedCustomer || {};
        selectedCustomer[key] = value;
        this.setState({ selectedCustomer });
    }

    onCustomerFilled = () => {
        if (!this.state.order.customerId) {
            return CustomerStore.registerCustomer(this.state.selectedCustomer)
                .then(data => {
                    let order = this.state.order;
                    order.customerId = data.id;
                    this.setState({ 
                        order,
                        showOrderPanel: true
                    });
                });
        }

        this.setState({ showOrderPanel: true });
    }

    onOrderItemChanged = (itemToAdd, index) => {
        let order = this.state.order;
        order.items[index] = itemToAdd;
        this.setState({ order });
    };

    addNewItem = () => {
        let order = this.state.order;
        order.items.push(new DEFAULT_ORDER_ITEM());
        this.setState({ order });
    }

    placeOrder = () => {
        OrderStore.createOrder(this.state.order)
            .then(res => {
                this.setState({ orderSuccess: true });
                $('#order-success-modal').modal('show');
            })
            .catch(err => {
                this.setState({ orderSuccess: false });
                $('#order-success-modal').modal('show');
            });
    }

    render () {
        return (
            <div className="container">

                <div className="row justify-content-center">
                    <div className="col-md-4">
                        <div className="form-group">
                            <h5>Select customer</h5>
                            <select className="form-control" id="customer" 
                                onChange={this.onCustomerSelectChanges}
                                disabled={this.state.showOrderPanel}>
                                <option key={NEW_CUSTOMER_KEY} value={NEW_CUSTOMER_KEY}>New Customer</option>
                                {
                                    this.state.customers.map(customer => 
                                        <option key={customer.id} value={customer.id}>{customer.name}</option>     
                                    )
                                }
                            </select>
                        </div>
                    </div>
                    <div className="col-md-5">
                        <h5>Customer information</h5>
                        <div className="form-group row">
                            <label htmlFor="name" className="col-sm-2">Name:</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="name" disabled={this.state.order.customerId}
                                    value={this.state.selectedCustomer ? this.state.selectedCustomer.name : ''}
                                    onChange={(e) => this.onCustomerDataChanged(e, 'name')}></input>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="address" className="col-sm-2">Address:</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="address" disabled={this.state.order.customerId}
                                    value={this.state.selectedCustomer ? this.state.selectedCustomer.address : ''}
                                    onChange={(e) => this.onCustomerDataChanged(e, 'address')}></input>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="mobile" className="col-sm-2">Mobile:</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="mobile" disabled={this.state.order.customerId}
                                    value={this.state.selectedCustomer ? this.state.selectedCustomer.mobile : ''}
                                    onChange={(e) => this.onCustomerDataChanged(e, 'mobile')}></input>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="username" className="col-sm-2">Username:</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="username" disabled={this.state.order.customerId}
                                    value={this.state.selectedCustomer ? this.state.selectedCustomer.userName : ''}
                                    onChange={(e) => this.onCustomerDataChanged(e, 'userName')}></input>
                            </div>
                        </div>
                        <button className="btn btn-primary" onClick={this.onCustomerFilled}>Continue</button>
                    </div>
                </div>

                <div className={this.state.showOrderPanel ? 'visible' : 'invisible'}>
                    <div className="row justify-content-center">
                        <div className="col-md-9">
                            {
                                this.state.order.items.map((item, index) =>
                                    <OrderItem index={index} item={item} shutters={this.state.shutters} onItemChange={this.onOrderItemChanged} />
                                )
                            }
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-md-9 text-center">
                            <button className="btn btn-primary mt-2 mb-2 text-bold" onClick={this.addNewItem}>+</button>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-md-9 text-center">
                            <button className="btn btn-primary mt-2 mb-5" id="place-order-btn" onClick={this.placeOrder}>Place order</button>
                            <OrderSuccessModal success={this.state.orderSuccess} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CreateOrder;