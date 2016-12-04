const { noRouteText } = require('../../constants');
const getNumberOfTrips = require('../getNumberOfTrips');

const inputData = ['AB5', 'BC4', 'CD8', 'DC8', 'DE6', 'AD5', 'CE2', 'EB3', 'AE7'];
const numberOfTrips = getNumberOfTrips(inputData);

test('number of trips from C to C with maximum 3 stops', () => {
  expect(numberOfTrips({ start: 'C', end: 'C', max: 3 })).toBe(2);
});

test('number of trips from A to C with exactly 4 stops', () => {
  expect(numberOfTrips({ start: 'A', end: 'C', min: 4, max: 4 })).toBe(3);
});

test(`${noRouteText} from E to D with exactly 2 stops`, () => {
  expect(numberOfTrips({ start: 'E', end: 'D', min: 2, max: 2 })).toBe(noRouteText);
});
