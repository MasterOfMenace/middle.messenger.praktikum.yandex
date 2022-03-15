import {Router} from '../../router';
import {ExcludeRouterProps} from '../../router/withRouter/withRouter';
import Link, {LinkProps} from './Link';

export class LinkWithRouter extends Link {
  constructor(props: ExcludeRouterProps<LinkProps>) {
    super({...props, router: Router.getInstance('#root')});
  }
}
