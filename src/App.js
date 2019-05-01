import React, { Component } from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';

import Statistics from './components/Statistics';
import CreateOrder from './components/CreateOrder';
import ViewOwnOrders from './components/ViewOwnOrders';
import ManageOrdersByWorker from './components/ManageOrdersByWorker';

import Navbar from './components/Navbar';
import './App.scss';
import ManageOrdersByManager from './components/ManageOrdersByManager';


class App extends Component {
    render() {
        return (
            <Router>
                <Navbar />
                <Route exact path="/" component={CreateOrder} />
                <Route path="/statistics" component={Statistics} />
                <Route path="/create-order" component={CreateOrder} />
                <Route path="/view-own-orders" component={ViewOwnOrders} />
                <Route path="/worker-orders" component={ManageOrdersByWorker} />
                <Route path="/manager-orders" component={ManageOrdersByManager} />
            </Router>
        );
    }
}

export default App;
