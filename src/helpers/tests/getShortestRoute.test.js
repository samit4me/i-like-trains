const { noRouteText } = require('../../constants');
const getShortestRoute = require('../getShortestRoute');

const inputData = ['AB5', 'BC4', 'CD8', 'DC8', 'DE6', 'AD5', 'CE2', 'EB3', 'AE7'];
const shortestRoute = getShortestRoute(inputData);

test('shortest distance from A to C', () => {
  expect(shortestRoute({ start: 'A', end: 'C' })).toBe(9);
});

test('shortest distance from B to B', () => {
  expect(shortestRoute({ start: 'B', end: 'B' })).toBe(9);
});

test(`${noRouteText} from A to A`, () => {
  expect(shortestRoute({ start: 'A', end: 'A' })).toBe(noRouteText);
});
