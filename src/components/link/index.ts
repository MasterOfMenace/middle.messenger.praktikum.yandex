import Link, {LinkProps} from './Link';
import {withRouter} from '../../router/withRouter/withRouter';

const LinkWithRouter = withRouter<LinkProps>(Link);

export {Link, LinkWithRouter};
