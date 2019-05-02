const Shutter = require('./Shutter').Shutter;
const Window = require('./_window').Window;

class ShutterOrder {
    constructor (shutterOrder) {
        this.pieces = Number(shutterOrder.pieces);
        this.window = new Window(shutterOrder.window);
        this.shutter = new Shutter(shutterOrder.shutter);
    }
}

module.exports = {
    ShutterOrder
};