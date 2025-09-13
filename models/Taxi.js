import Vehicle from './Vehicle';


export default class Taxi extends Vehicle {
    constructor(make, model, plate) {
        super(make, model);
        this._plate = plate;
    }
    get plate() {
        return this._plate;
    }
    set plate(newPlate) {
        this._plate = newPlate;
    }
    getInfo() {
        return `${super.getInfo()} (Plate: ${this._plate})`;
    }
}