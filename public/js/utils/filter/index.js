export const findRouteByPath = (routes, path) => {
  let exactMatch = null;
  let partialMatch = null;

  const search = (routesList) => {
    for (const route of routesList) {
      if (route.path === path) {
        exactMatch = route;
        return;
      }
      if (path.startsWith(route.path)) {
        if (!partialMatch || route.path.length > partialMatch.path.length) {
          partialMatch = route;
        }
      }
      if (route.children) {
        search(route.children);
      }
    }
  };

  search(routes);

  return exactMatch || partialMatch || null;
};
