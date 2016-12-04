const fs = require('fs');

const getValidInputData = () => {
  const response = {
    error: '',
    inputData: null,
  };

  // Get input data path from app arguments
  const inputDataPath = process.argv.slice(2, 3).shift();

  // Ensure a input data path has been provided
  if (!inputDataPath) {
    return Object.assign({}, response, {
      error: 'Please provide an input data file! (e.g. app.js inputData.txt)',
    });
  }

  // Ensure read access on the supplied input data path
  try {
    fs.accessSync(inputDataPath, fs.constants.R_OK);
  } catch(error) {
    return Object.assign({}, response, {
      error: 'Failed to read input data file! Please check the name is correct and ensure you have read access!',
    });
  }

  // Read input data
  const inputDataContent = fs.readFileSync(inputDataPath, 'utf8');

  // Ensure input data exists
  if (!inputDataContent) {
    return Object.assign({}, response, {
      error: 'File appears to be empty, please provide a file with data!',
    });
  }

  // Ensure input data is valid, if valid place data into an array
  const inputDataArray = inputDataContent.split(',');
  const validInputDataArray = inputDataArray
    .map((route) => route.trim())
    .filter((route) => route.match(/^[A-Z]{2}[0-9]$/));
  if (!validInputDataArray.length) {
    return Object.assign({}, response, {
      error: 'Malformed data! Please provide a comma separated list of routes! (e.g. AB5, BC4, CD8)',
    });
  }

  // Warn about invalid data that has been removed
  const routesRemoved = inputDataArray.length - validInputDataArray.length;
  if (routesRemoved) {
    console.log(`WARNING: ${routesRemoved} malformed route${routesRemoved > 1 ? 's' : ''} removed!`);
  }

  return Object.assign({}, response, {
    inputData: validInputDataArray,
  });
}

module.exports = getValidInputData;
