import React, { Component } from 'react';
import CustomerStore from '../stores/CustomerStore';
import CustomerActions from '../actions/CustomerActions';
import ShutterStore from '../stores/ShutterStore';
import ShutterActions from '../actions/ShutterActions';
import OrderStore from '../stores/OrderStore';
import OrderActions from '../actions/OrderActions';

import OrderItem from './OrderItem';
import OrderSuccessModal from './OrderSuccessModal';
import $ from 'jquery'; // for showing modal

const NEW_CUSTOMER_KEY = 'newcustomer';

class CreateOrder extends Component {

    constructor (props) {
        super(props);

        OrderActions.initializeOrder();
        CustomerActions.initializeCustomerStore();

        CustomerActions.getCustomers();
        ShutterActions.getShutters();

        this._onChange = this._onChange.bind(this);
        
        this.state = {
            showOrderPanel: false,
            disableInputs: false,
            customers: CustomerStore._customers,
            selectedCustomer: CustomerStore._customer,
            shutters: ShutterStore._shutters,
            order: OrderStore._orderToCreate,
            orderSuccess: OrderStore._isOrderCreated
        };
    }

    componentDidMount () {
        OrderStore.addChangeListener(this._onChange);
        ShutterStore.addChangeListener(this._onChange);
        CustomerStore.addChangeListener(this._onChange);
    }

    componentWillUnmount () {
        OrderStore.removeChangeListener(this._onChange);
        ShutterStore.removeChangeListener(this._onChange);
        CustomerStore.removeChangeListener(this._onChange);
    }

    componentDidUpdate (prevProps, prevState) {
        if (prevState.orderSuccess === this.state.orderSuccess 
                || this.state.orderSuccess === null
                || this.state.orderSuccess === undefined) {
            return;
        }

        $('#order-success-modal').modal('show');
    }

    _onChange () {
        this.setState({
            customers: CustomerStore._customers,
            selectedCustomer: CustomerStore._customer,
            shutters: ShutterStore._shutters,
            order: OrderStore._orderToCreate,
            orderSuccess: OrderStore._isOrderCreated
        });
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

        this.setState({ disableInputs: Boolean(customerId) });

        CustomerActions.changeSelectedCustomer(this.getCustomerData(customerId));
        OrderActions.changeOrder(order);
    }

    onCustomerDataChanged = (event, key) => {
        const value = event.target.value;
        let selectedCustomer = Object.assign({}, this.state.selectedCustomer);
        selectedCustomer[key] = value;

        CustomerActions.changeSelectedCustomer(selectedCustomer);
    }

    onCustomerFilled = () => {
        if (!this.state.order.customerId) {
            CustomerActions.registerCustomer(this.state.selectedCustomer);
        }

        this.setState({ showOrderPanel: true });
    }

    onOrderItemChanged = (item, index) => {
        OrderActions.changeOrderItem({ index, item });
    };

    placeOrder = () => {
        let order = this.state.order;
        order.customerId = this.state.selectedCustomer ? this.state.selectedCustomer.id : null;
        OrderActions.createOrder(this.state.order);
    };

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
                                <input type="text" className="form-control" id="name" disabled={this.state.showOrderPanel || this.state.disableInputs}
                                    value={this.state.selectedCustomer ? this.state.selectedCustomer.name : ''}
                                    onChange={(e) => this.onCustomerDataChanged(e, 'name')}></input>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="address" className="col-sm-2">Address:</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="address" disabled={this.state.showOrderPanel || this.state.disableInputs}
                                    value={this.state.selectedCustomer ? this.state.selectedCustomer.address : ''}
                                    onChange={(e) => this.onCustomerDataChanged(e, 'address')}></input>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="mobile" className="col-sm-2">Mobile:</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="mobile" disabled={this.state.showOrderPanel || this.state.disableInputs}
                                    value={this.state.selectedCustomer ? this.state.selectedCustomer.mobile : ''}
                                    onChange={(e) => this.onCustomerDataChanged(e, 'mobile')}></input>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="username" className="col-sm-2">Username:</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="username" disabled={this.state.showOrderPanel || this.state.disableInputs}
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
                            <button className="btn btn-primary mt-2 mb-2 btn-circle" onClick={OrderActions.addDefaultItemToCart}>+</button>
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