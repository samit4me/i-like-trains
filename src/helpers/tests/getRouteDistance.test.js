const { noRouteText } = require('../../constants');
const getRouteDistance = require('../getRouteDistance');

const inputData = ['AB5', 'BC4', 'CD8', 'DC8', 'DE6', 'AD5', 'CE2', 'EB3', 'AE7'];
const routeDistance = getRouteDistance(inputData);

test('distance of the route A-B-C is 9', () => {
  expect(routeDistance('A-B-C')).toBe(9);
});

test('distance of the route A-D is 9', () => {
  expect(routeDistance('A-D')).toBe(5);
});

test('distance of the route A-D-C is 13', () => {
  expect(routeDistance('A-D-C')).toBe(13);
});

test('distance of the route A-E-B-C-D is 22', () => {
  expect(routeDistance('A-E-B-C-D')).toBe(22);
});

test(`distance of the route A-E-D is ${noRouteText}`, () => {
  expect(routeDistance('A-E-D')).toBe(noRouteText);
});

test('distance of the route D-C-D-C-E-B-C is 33', () => {
  expect(routeDistance('D-C-D-C-E-B-C')).toBe(33);
});
