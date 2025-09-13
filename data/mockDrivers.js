

import Taxi from '../models/Taxi';
import Driver from '../models/Driver';


const mockDrivers = [
new Driver('Ankit Sharma', 4.9, new Taxi('Toyota', 'Etios', 'GJ01AB1234')),
new Driver('Priya Patel', 4.8, new Taxi('Hyundai', 'Xcent', 'GJ01CD5678')),
new Driver('Ravi Kumar', 4.7, new Taxi('Maruti', 'Dzire', 'GJ01EF9012')),
];


export default mockDrivers;