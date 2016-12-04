const { noRouteText } = require('../../constants');
const getPossibleRoutes = require('../getPossibleRoutes');

const inputData = ['AB5', 'BC4', 'CD8', 'DC8', 'DE6', 'AD5', 'CE2', 'EB3', 'AE7'];
const possibleRoutes = getPossibleRoutes(inputData);

test('number of different routes from C to C with a distance of less than 30', () => {
  expect(possibleRoutes({ start: 'C', end: 'C', max: 29 })).toBe(7);
});

test('number of different routes from A to C with a distance of less than 10', () => {
  expect(possibleRoutes({ start: 'A', end: 'C', max: 9 })).toBe(1);
});

test('number of different routes from A to C with a distance of less than 9', () => {
  expect(possibleRoutes({ start: 'A', end: 'C', max: 8 })).toBe(noRouteText);
});

test(`${noRouteText} is returned when passed invalid arguments`, () => {
  expect(possibleRoutes({ start: 4, end: 'C', max: 8 })).toBe(noRouteText);
  expect(possibleRoutes({ end: 'C', max: 8 })).toBe(noRouteText);
});
