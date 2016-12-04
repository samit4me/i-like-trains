const { noRouteText } = require('../../constants');
const getValidInputData = require('../getValidInputData');

const mockData = ['AB5', 'BC4', 'CD8', 'DC8', 'DE6', 'AD5', 'CE2', 'EB3', 'AE7'];

test('error returned when no input data file specified', () => {
  process.argv = [,,];
  const { error, inputData } = getValidInputData();
  expect(error).toContain('Please provide an input');
});

test('error returned when input data file do not exist', () => {
  process.argv = [,, 'noSuchFile.txt'];
  const { error, inputData } = getValidInputData();
  expect(error).toContain('Failed to read input data file');
});

test('error returned when an empty input data file specified', () => {
  process.argv = [,, 'empty.txt'];
  const { error, inputData } = getValidInputData();
  expect(error).toContain('File appears to be empty');
});

test('only valid input data returned when an invalid route specified', () => {
  process.argv = [,, 'invalidRoute.txt'];
  const { error, inputData } = getValidInputData();
  expect(inputData).toEqual(['AB7', 'BC2', 'CD8', 'DC8']);
});

test('inputData returned', () => {
  process.argv = [,, 'inputData.txt'];
  const { error, inputData } = getValidInputData();
  expect(inputData).toEqual(mockData);
});
