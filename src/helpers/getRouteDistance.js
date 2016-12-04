const { noRouteText, routeSeperator } = require('../constants');

const getRouteDistance = (inputData) => (plannedRoute) => {
  const routeList = plannedRoute.split(routeSeperator);
  const numberOfTrips = routeList.length - 1;

  // Calculate total distance
  const calcRouteDistance = (tripNumber = 0, totalDistance = 0) => {
    if (tripNumber < numberOfTrips) {
      const tripDistance = inputData
        // find matching route
        .filter((route) =>
          route.charAt(0) === routeList[tripNumber]
          && route.charAt(1) === routeList[tripNumber + 1]
        )
        // calculate the route distance
        .reduce((distance, route) => parseInt(route.charAt(2), 10), 0);

      if (tripDistance) {
        // add next trip distance
        return calcRouteDistance(tripNumber + 1, totalDistance + tripDistance);
      }
      return tripDistance;
    }
    return totalDistance;
  };
  return calcRouteDistance() || noRouteText;
};

module.exports = getRouteDistance;
