import React, { Component } from 'react';

class BillingDetails extends Component {
    render () {
        return (
            <div className="billing-info">
                <h4>Billing information</h4>

                <table className="table table-sm table-striped">
                    <tbody>
                        <tr>
                            <td className="w-25">Name:</td>
                            <td className="w-75">{ this.props.customer.name }</td>
                        </tr>
                        <tr>
                            <td>Username:</td>
                            <td>{ this.props.customer.userName }</td>
                        </tr>
                        <tr>
                            <td>Address:</td>
                            <td>{ this.props.customer.address }</td>
                        </tr>
                        <tr>
                            <td>Mobile:</td>
                            <td>{ this.props.customer.mobile }</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

export default BillingDetails;