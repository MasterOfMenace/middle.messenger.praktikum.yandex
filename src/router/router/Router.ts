import Block from '../../components/block/Block';
import Route from '../route/Route';

export default class Router {
  private static instance: Router;

  routes: Route[];

  history: History;

  _currentRoute: Route | null;

  _rootQuery: string;

  constructor(rootQuery: string) {
    if (Router.instance) {
      Router.getInstance();
    }

    this.routes = [];
    this.history = window.history;
    this._currentRoute = null;
    this._rootQuery = rootQuery;

    Router.instance = this;
  }

  public static getInstance() {
    return Router.instance;
  }

  use<T extends Block>(pathname: string, block: new () => T) {
    const route = new Route(pathname, block, {rootQuery: this._rootQuery});
    this.routes.push(route);
    return this;
  }

  start() {
    window.onpopstate = (event) => this._onRoute((event.currentTarget as Window).location.pathname);
    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname: string) {
    const route = this.getRoute(pathname);

    if (this._currentRoute && !this._currentRoute.match(pathname)) {
      this._currentRoute.leave();
    }

    if (route) {
      this._currentRoute = route;
      route.render();
    }
  }

  go(pathname: string) {
    this.history.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  back() {
    this.history.back();
  }

  forward() {
    this.history.forward();
  }

  getRoute(pathname: string) {
    return this.routes.find((route) => route.match(pathname));
  }
}
