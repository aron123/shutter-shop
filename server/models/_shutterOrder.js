const Shutter = require('./Shutter').Shutter;

class ShutterOrder {
    constructor (shutterOrder) {
        this.pieces = Number(shutterOrder.pieces);
        this.shutter = new Shutter(shutterOrder.shutter);
    }
}

module.exports = {
    ShutterOrder
};