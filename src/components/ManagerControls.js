import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import OrderActions from '../actions/OrderActions';

class ManagerControls extends Component {

    constructor (props) {
        super(props);

        this.onDateChanges = this.onDateChanges.bind(this);

        this.state = {
            selectedWorker: null,
            installationTime: new Date(),
            totalPrice: 1
        };
    }

    onDateChanges (installationTime) {
        this.setState({ installationTime });
    }

    organizeInstall = () => {
        OrderActions.changeInstallation({
            orderId: this.props.order.id,
            installationTime: this.state.installationTime,
            installer: this.state.selectedWorker
        });
    }

    createInvoice = () => {
        OrderActions.changeInvoice({
            orderId: this.props.order.id,
            totalPrice: this.state.totalPrice
        });
    }

    render () {

        let installForm = (
            <div className="form-inline">
                <div className="form-group">
                    <DatePicker
                        className="form-control form-control-sm"
                        selected={this.state.installationTime}
                        onChange={this.onDateChanges}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={30}
                        dateFormat="yyyy-MM-dd hh:mm aa"/>
    
                    <select className="form-control form-control-sm mr-2 ml-2"
                        onChange={e => this.setState({ selectedWorker: e.target.value })}>
                        <option>Select worker</option>
                        {
                            this.props.workers.map(worker => {
                                if (worker.level === 'WORKER') {
                                    return <option key={worker.id} value={worker.id}>{worker.name}</option>
                                }

                                return null;
                            })
                        }
                    </select>
    
                    <button className="btn btn-sm btn-primary" onClick={this.organizeInstall}>Organize install</button>
                </div>    
            </div>
        );
    
        let invoiceForm = (
            <div className="form-inline">
                <div className="form-group">
                    <label className="form-label form-label-sm mr-2" htmlFor="amount">Amount:</label>
    
                    <div className="input-group input-group-sm mr-2">
                        <input type="number" id="amount" className="form-control" min="1"
                            onChange={e => this.setState({ totalPrice: e.target.value })}></input>
                        <div className="input-group-append">
                            <div className="input-group-text">$</div>
                        </div>
                    </div>
                    
                    <button className="btn btn-sm btn-primary" onClick={this.createInvoice}>Create invoice</button>
                </div>
            </div>
        );

        return (
            <div className="manager-controls">
                <h4>Manager controls</h4>
                <table className="table table-sm table-striped">
                    <tbody>
                        <tr>
                            <td className="w-25">Install:</td>
                            <td className="w-75">
                            {
                                this.props.order.installationTime && this.props.order.installer
                                    ? <i className="fas fa-check text-success"></i>
                                    : installForm
                            }
                            </td>
                        </tr>
                        <tr>
                            <td>Invoice:</td>
                            <td>
                            {
                                this.props.order.totalPrice
                                    ? <i className="fas fa-check text-success"></i>
                                    : invoiceForm
                            }
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default ManagerControls;
