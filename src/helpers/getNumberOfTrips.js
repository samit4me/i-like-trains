const noRouteText = require('../constants').noRouteText;

const getNumberOfTrips = (inputData) => ({ start, end, min = 0, max = 1000 }) => {
  // Calculate number of trips
  const calcNumberOfTrips = (tripNumber = 1, startTown = start, numberOfCompletedTrips = 0) => {
    if (tripNumber <= max) {
      const possibleRoutes = inputData
        .filter((route) => route.charAt(0) === startTown);
      const completedRoutes = possibleRoutes
        .filter((route) => route.charAt(1) === end && tripNumber >= min);
      const incompletedRoutes = possibleRoutes
        .filter((route) => completedRoutes.indexOf(route) === -1);
      const completedTrips = numberOfCompletedTrips + completedRoutes.length;

      if (incompletedRoutes.length) {
        return incompletedRoutes
          .map((route) => calcNumberOfTrips(tripNumber + 1, route.charAt(1), completedTrips))
          .reduce((total, count) => total += count, 0);
      }
      return completedTrips;
    }
    return numberOfCompletedTrips;
  }
  return calcNumberOfTrips() || noRouteText;
};

module.exports = getNumberOfTrips;
