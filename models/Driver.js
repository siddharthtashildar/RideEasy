export default class Driver {
constructor(name, rating, taxi) {
this.name = name;
this.rating = rating;
this.taxi = taxi;
}
profile() {
return `${this.name} — ${this.rating.toFixed(1)}⭐\n${this.taxi.getInfo()}`;
}
}