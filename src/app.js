const getNumberOfTrips = require('./helpers/getNumberOfTrips');
const getPossibleRoutes = require('./helpers/getPossibleRoutes');
const getRouteDistance = require('./helpers/getRouteDistance');
const getShortestRoute = require('./helpers/getShortestRoute');
const getValidInputData = require('./helpers/getValidInputData');

// Get valid input data
const { error, inputData } = getValidInputData();
if (error) {
  console.error(`ERROR: ${error}`);
} else {
  // Generate helper functions
  const numberOfTrips = getNumberOfTrips(inputData);
  const possibleRoutes = getPossibleRoutes(inputData);
  const routeDistance = getRouteDistance(inputData);
  const shortestRoute = getShortestRoute(inputData);

  // Run test cases 
  console.log([]
    // 1. The distance of the route A-B-C.
    .concat(routeDistance('A-B-C'))
    // 2. The distance of the route A-D.
    .concat(routeDistance('A-D'))
    // 3. The distance of the route A-D-C.
    .concat(routeDistance('A-D-C'))
    // 4. The distance of the route A-E-B-C-D.
    .concat(routeDistance('A-E-B-C-D'))
    // 5. The distance of the route A-E-D.
    .concat(routeDistance('A-E-D'))
    // 6. The number of trips starting at C and ending at C with a maximum of 3 stops.  In the sample data below, there are two such trips: C-D-C (2 stops). and C-E-B-C (3 stops).
    .concat(numberOfTrips({ start: 'C', end: 'C', max: 3 }))
    // 7. The number of trips starting at A and ending at C with exactly 4 stops.  In the sample data below, there are three such trips: A to C (via B,C,D); A to C (via D,C,D); and A to C (via D,E,B).
    .concat(numberOfTrips({ start: 'A', end: 'C', min: 4, max: 4 }))
    // 8. The length of the shortest route (in terms of distance to travel) from A to C.
    .concat(shortestRoute({ start: 'A', end: 'C' }))
    // 9. The length of the shortest route (in terms of distance to travel) from B to B.
    .concat(shortestRoute({ start: 'B', end: 'B' }))
    // 10. The number of different routes from C to C with a distance of less than 30.  In the sample data, the trips are: CDC, CEBC, CEBCDC, CDCEBC, CDEBC, CEBCEBC, CEBCEBCEBC.
    .concat(possibleRoutes({ start: 'C', end: 'C', max: 29 }))
    // Format output
    .map((result, i) => `Output #${i + 1}: ${result}`)
    .join('\n')
  );
}
