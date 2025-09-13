


export default class Vehicle {

    constructor(make, model) {
        this.make = make;
        this.model = model;
    }

    getInfo() {
        return `${this.make} ${this.model}`;
    }
}