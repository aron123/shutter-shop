import React, { Component } from 'react';
import Spinner from '../_shared/Spinner';
import { PieChart, BarChart } from 'react-d3-components';
import StatisticsStore from '../../stores/StatisticsStore';
import StatisticsActions from '../../actions/StatisticsActions';

class Statistics extends Component {
    constructor (props) {
        super(props);

        StatisticsActions.getStatistics();
        this._onChange = this._onChange.bind(this);

        this.state = {
            loading: true,
            statistics: StatisticsStore._statistics
        };
    }

    componentDidMount () {
        StatisticsStore.addChangeListener(this._onChange);
    }

    componentWillUnmount () {
        StatisticsStore.removeChangeListener(this._onChange);
    }

    _onChange () {
        this.setState({
            statistics: StatisticsStore._statistics,
            loading: false
        });
    }
    
    spendingTooltip (x, y) {
        return `${y} $`;
    }

    ordersTooltip (label, x, y) {
        return `${y} orders`;
    }

    installationsTooltip (label, x, y) {
        return `${y} installs`;
    }

    render () {
        if (this.state.loading) {
            return <Spinner />
        }
        
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-6">
                        <h4>Top 5 customer by spent money</h4>
                        <hr></hr>
                        <PieChart data={this.state.statistics.top5CustomerBySpendings}
                            width={600} height={300} margin={{top: 10, bottom: 50, left: 50, right: 10}} 
                            tooltipHtml={this.spendingTooltip} tooltipOffset={{ top: 30, left: 30 }}
                            tooltipMode='mouse' />
                    </div>
                    <div className="col-md-6">
                        <h4>Top 5 customer by order count</h4>
                        <hr></hr>
                        <BarChart data={this.state.statistics.top5CustomerByOrderCount}
                            width={600} height={300} margin={{top: 10, bottom: 50, left: 50, right: 10}}
                            tooltipHtml={this.ordersTooltip} tooltipOffset={{ top: 30, left: 30 }}
                            tooltipMode='mouse'  />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <h4>Top 5 worker by installation count</h4>
                        <hr></hr>
                        <BarChart data={this.state.statistics.top5WorkerByInstallCount}
                            width={600} height={300} margin={{top: 10, bottom: 50, left: 50, right: 10}}
                            tooltipHtml={this.installationsTooltip} tooltipOffset={{ top: 30, left: 30 }}
                            tooltipMode='mouse'  />
                    </div>
                    <div className="col-md-6">
                        <h4>Economic data</h4>
                        <hr></hr>
                        <table className="table table-sm table-striped">
                            <tbody>
                                <tr>
                                    <td># of orders:</td>
                                    <td>{this.state.statistics.ordersSum}</td>
                                </tr>
                                <tr>
                                    <td># of not paid orders:</td>
                                    <td>{this.state.statistics.notPaidOrdersSum}</td>
                                </tr>
                                <tr>
                                    <td># of not assembled orders:</td>
                                    <td>{this.state.statistics.notAssembledOrdersSum}</td>
                                </tr>
                                <tr>
                                    <td>Average order price:</td>
                                    <td>{`${this.state.statistics.orderPriceAvg.toFixed(2)} $`}</td>
                                </tr> 
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default Statistics;