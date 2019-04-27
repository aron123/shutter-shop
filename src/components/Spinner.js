import React, { Component } from 'react';
import './Spinner.scss';

class Spinner extends Component {
    render () {
        return (
            <div className="container-fluid h-100">
                <div className="row align-items-center justify-content-center h-100">
                    <div className="spinner-border text-primary" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default Spinner;