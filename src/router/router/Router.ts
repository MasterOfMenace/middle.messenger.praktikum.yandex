import Block, {Props} from '../../components/block/Block';
import Route from '../route/Route';

export default class Router {
  private static instance: Router;

  routes: Route[];

  history: History;

  _currentRoute: Route | null;

  _rootQuery: string;

  private constructor(rootQuery: string) {
    this.routes = [];
    this.history = window.history;
    this._currentRoute = null;
    this._rootQuery = rootQuery;
  }

  public static getInstance(rootQuery: string) {
    if (!Router.instance) {
      Router.instance = new Router(rootQuery);
    }
    return Router.instance;
  }

  use<T extends Block, P extends Props>(
    pathname: string,
    block: new (props?: any) => T,
    props?: P,
  ) {
    const route = new Route(pathname, block, {...props, rootQuery: this._rootQuery});
    this.routes.push(route);
    return this;
  }

  start() {
    window.onpopstate = (event) => this._onRoute((event.currentTarget as Window).location.pathname);
    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname: string) {
    const route = this.getRoute(pathname);

    if (!route) {
      return;
    }

    if (this._currentRoute && !this._currentRoute.match(pathname)) {
      this._currentRoute.leave();
    }

    if (route) {
      this._currentRoute = route;
      route.render();
    }
  }

  go(pathname: string | number) {
    if (typeof pathname === 'number') {
      if (pathname === -1) {
        this.back();
      } else if (pathname === 1) {
        this.forward();
      } else {
        this.history.go(pathname);
      }
    } else {
      this.history.pushState({}, '', pathname);
      this._onRoute(pathname);
    }
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
