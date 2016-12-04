const { noRouteText } = require('../constants');

const getShortestRoute = (inputData) => ({ start, end }) => {
  let shortestDistance = 0;

  // Get possible routes
  const getPossibleRoutes = (start, totalDist = 0) => inputData
    .filter((route) => route.charAt(0) === start)
    .map((route) => ({
      town: route.charAt(1),
      dist: parseInt(route.charAt(2), 10) + totalDist
    }));

  // Loop control
  let possibleIncompleteRoutes = getPossibleRoutes(start);
  let loopCount = 0;
  const theSearchContinues = () => {
    loopCount++;
    if (loopCount > 20) {
      return false;
    }
    return possibleIncompleteRoutes.length;
  };

  /**
   * Loop over each possible route,
   * keeping track of the shortest distance of completed routes
   * and discard routes that exceed that distance.
   */
  while(theSearchContinues()) {
    // Populate completed and incomplete routes
    let completedRoutes = [];
    let incompleteRoutes = [];
    possibleIncompleteRoutes.forEach(({ town, dist }) => {
      if (town === end) {
        completedRoutes.push({ town, dist });
      } else {
        incompleteRoutes.push({ town, dist });
      }
    });

    // Calculate the shortest distance of the completed routes
    shortestDistance = completedRoutes.reduce((shortest, { dist }) => {
      if ((!shortest || dist < shortest) && (!shortestDistance || dist < shortestDistance)) {
        return dist;
      }
      return shortest;
    }, 0);

    // Get all incomplete routes that could possible be shorter than the shortest distance
    possibleIncompleteRoutes = incompleteRoutes
      .filter(({ town, dist }) => !shortestDistance || dist < shortestDistance)
      .map(({ town, dist }) => getPossibleRoutes(town, dist))
      .filter((possibleRoutes) => possibleRoutes.length)
      .reduce((acc, possibleRoutes) => [...acc, ...possibleRoutes], []);
  }
  return shortestDistance || noRouteText;
};

module.exports = getShortestRoute;
