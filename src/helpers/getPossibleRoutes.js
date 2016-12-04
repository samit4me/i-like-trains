const { noRouteText, routeSeperator } = require('../constants');

const getPossibleRoutes = (inputData) => ({ start, end, max = 0 }) => {
  let matchingRoutes = [];

  // Get possible routes
  const getPossibleRoutes = (start, totalTrip = '', totalDist = 0) => inputData
    .filter((route) => route.charAt(0) === start)
    .map((route) => {
      const startTown = route.charAt(0);
      const endTown = route.charAt(1);
      const trips = totalTrip
        ? `${totalTrip}${routeSeperator}${startTown}`
        : startTown;
      return {
        trips: trips,
        town: endTown,
        dist: parseInt(route.charAt(2), 10) + totalDist
      };
    });

  // Loop control
  let possibleIncompleteRoutes = getPossibleRoutes(start);

  /**
   * Loop over each possible route,
   * keeping track of the completed routes
   * and discarding any possible routes
   * that exceed the max distance.
   */
  while(possibleIncompleteRoutes.length) {
    // Populate completed and incomplete routes
    // let completedRoutes = [];
    let incompleteRoutes = [];
    possibleIncompleteRoutes.forEach(({ town, trips, dist }) => {
      if (!max || dist <= max) {
        if (town === end) {
          matchingRoutes.push({
            trips: `${trips}${routeSeperator}${town}`,
            town,
            dist
          });
        }
        incompleteRoutes.push({ trips, town, dist });
      }
    });

    // Get all incomplete routes that could possible be shorter than the shortest distance
    possibleIncompleteRoutes = incompleteRoutes
      .map(({ town, trips, dist }) => getPossibleRoutes(town, trips, dist))
      .filter((possibleRoutes) => possibleRoutes.length)
      .reduce((acc, possibleRoutes) => [...acc, ...possibleRoutes], []);
  }
  return matchingRoutes.length || noRouteText;
};

module.exports = getPossibleRoutes;
