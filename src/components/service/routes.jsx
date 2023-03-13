export class Router {
  static getRoute(route, apiVersion) {
    const _route =
      process.env.NODE_ENV === "development"
        ? `https://api.judgedajudge.com/${apiVersion}/${route}`
        : `https://api.judgedajudge.com/${apiVersion}/${route}`;

    console.log({ route });
    return _route;
  }
}
