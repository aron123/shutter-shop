import React, { Component } from 'react';
import * as OrderStore from '../stores/OrderStore';

class ManageOrdersByWorker extends Component {

    constructor (props) {
        super(props);
        this.state = {
            orders: []
        }
    }

    componentDidMount () {
        OrderStore.getOrders().then(orders => this.setState({ orders }));
    }

    getPartListHTML = (shutter) => {
        if (!Array.isArray(shutter.parts)) {
            return null;
        }

        return shutter.parts.map(part => (
            <p>{part.pieces}× {part.name}</p>
        ));
    };

    getShutterHTML = (orderItem) => {
        return <span>{orderItem.pieces}× {orderItem.shutter.name}</span>;
    }

    getWindowHTML = (orderItem) => {
        return <span>{orderItem.window.width} cm × {orderItem.window.height} cm</span>;
    }

    getAssembledBadge = (assembled) => {
        return assembled
            ? <span className="badge badge-success">Assembled</span>
            : <span className="badge badge-danger">Not assembled</span>;
    }

    assembleOrder = (order) => {
        const orderId = order.id;

        OrderStore.assembleOrder(orderId)
            .then(() => {
                let orders = this.state.orders.map(order => {
                    if (order.id === orderId) {
                        order.assembled = true;
                    }
                    
                    return order;
                });

                this.setState({ orders });
            });
    }

    render () {
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
                                                        {this.getAssembledBadge(order.assembled)}
                                                    </span>
                                            </div>

                                            <div id={`collapse-${order.id}`} className="collapse" 
                                                aria-labelledby={`heading-${order.id}`} data-parent="#accordion"
                                            >
                                                <div className="card-body">
                                                    {
                                                        order.assembled ||
                                                        <div className="order-controls">
                                                            <h5>Controls</h5>
                                                            <button className="btn btn-sm btn-primary mt-2 mb-3"
                                                                onClick={() => this.assembleOrder(order)}>
                                                                Assemble
                                                            </button>
                                                        </div>
                                                    }

                                                    <h5>Details</h5>
                                                    <table className="table table-sm table-striped">
                                                        <thead>
                                                            <tr>
                                                                <th>Shutter</th>
                                                                <th>Window</th>
                                                                <th>Parts (for 1 shutter)</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                order.items.map(item => (
                                                                    <tr>
                                                                        <td>{this.getShutterHTML(item)}</td>
                                                                        <td>{this.getWindowHTML(item)}</td>
                                                                        <td>{this.getPartListHTML(item.shutter)}</td>
                                                                    </tr>
                                                                ))
                                                            }
                                                        </tbody>
                                                    </table>
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
        )
    }
}

export default ManageOrdersByWorker;