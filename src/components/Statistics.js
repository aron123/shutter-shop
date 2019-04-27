import React, { Component } from 'react';
import * as apiFetcher from '../services/api-fetcher';
import Spinner from './Spinner';
import { PieChart, BarChart } from 'react-d3-components';

class Statistics extends Component {
    constructor (props) {
        super(props);
        this.state = {
            loading: true,
            top5CustomerBySpendings: [],
            top5CustomerByOrderCount: [],
            top5WorkerByInstallCount: [],
            ordersSum: 0,
            notPaidOrdersSum: 0,
            notAssembledOrdersSum: 0,
            orderPriceAvg: 0
        };
    }

    transformData (raw) {
        let data = {
            values: []
        };
    
        for (const item of raw) {
            data.values.push({
                x: item.label,
                y: item.value
            });
        }
    
        return data;
    }

    componentDidMount () {
        apiFetcher.get('api/stats')
            .then(res => {
                if (!res.success) {
                    return console.error('Failed to fetch statistics, got:', res);
                }
                
                const data = res.data;

                this.setState({
                    top5CustomerBySpendings: this.transformData(data.top5CustomerBySpentMoney),
                    top5CustomerByOrderCount: this.transformData(data.top5CustomerByOrderCount),
                    top5WorkerByInstallCount: this.transformData(data.top5WorkerByInstallationCount),
                    ordersSum: data.ordersSum,
                    notPaidOrdersSum: data.notPaidOrdersSum,
                    notAssembledOrdersSum: data.notAssembledOrdersSum,
                    orderPriceAvg: data.orderPriceAvg,
                    loading: false
                });
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
                        <PieChart data={this.state.top5CustomerBySpendings}
                            width={600} height={300} margin={{top: 10, bottom: 50, left: 50, right: 10}} 
                            tooltipHtml={this.spendingTooltip} tooltipOffset={{ top: 30, left: 30 }}
                            tooltipMode='mouse' />
                    </div>
                    <div className="col-md-6">
                        <h4>Top 5 customer by order count</h4>
                        <hr></hr>
                        <BarChart data={this.state.top5CustomerByOrderCount}
                            width={600} height={300} margin={{top: 10, bottom: 50, left: 50, right: 10}}
                            tooltipHtml={this.ordersTooltip} tooltipOffset={{ top: 30, left: 30 }}
                            tooltipMode='mouse'  />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <h4>Top 5 worker by installation count</h4>
                        <hr></hr>
                        <BarChart data={this.state.top5WorkerByInstallCount}
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
                                    <td>{this.state.ordersSum}</td>
                                </tr>
                                <tr>
                                    <td># of not paid orders:</td>
                                    <td>{this.state.notPaidOrdersSum}</td>
                                </tr>
                                <tr>
                                    <td># of not assembled orders:</td>
                                    <td>{this.state.notAssembledOrdersSum}</td>
                                </tr>
                                <tr>
                                    <td>Average order price:</td>
                                    <td>{`${this.state.orderPriceAvg.toFixed(2)} $`}</td>
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