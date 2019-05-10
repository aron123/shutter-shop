import React, { Component } from 'react';
import windowImage from '../_img/window.svg';

class OrderItem extends Component {

    onItemChange = (event, key, innerKey) => {
        const value = event.target.value;
        let item = Object.assign({}, this.props.item);

        if (innerKey) {
            item[key][innerKey] = value;
        } else {
            item[key] = value;
        }

        this.props.onItemChange(item, this.props.index);
    }

    render () {
        return (
            <div className="card mb-2 mt-2">
                <div className="card-body">
                    <div className="container">
                        <div className="form-group row">
                            <div className="col-md-2">
                                <label htmlFor="width">Width (cm):</label>
                                <input type="number" id="width" min="1" className="form-control" 
                                    value={this.props.item.window.width}
                                    onChange={(e) => this.onItemChange(e, 'window', 'width')}></input>
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-md-2">
                                <img src={windowImage} className="img-fluid" alt="window"></img>
                            </div>
                            <div className="col-md-2">
                                <label htmlFor="height">Height (cm):</label>
                                <input type="number" id="height" min="1" className="form-control"
                                    value={this.props.item.window.height}
                                    onChange={(e) => this.onItemChange(e, 'window', 'height')}></input>
                            </div>
                            <div className="col-md-2">
                                <label htmlFor="qty">Quantity:</label>
                                <input type="number" id="qty" min="1" className="form-control"
                                    value={this.props.item.pieces}
                                    onChange={(e) => this.onItemChange(e, 'pieces')}></input>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="shutters">Shutter:</label>
                                <select id="shutters" className="form-control" 
                                    onChange={(e) => this.onItemChange(e, 'shutter')}>
                                    <option key={null} value={null}>Select shutter</option>
                                    {
                                        this.props.shutters.map(shutter => (
                                            <option key={shutter.id} value={shutter.id}>{shutter.name}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>
                    </div>

                    
                </div>
            </div>
        )
    }
}

export default OrderItem;
