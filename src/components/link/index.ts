import Link, {LinkProps} from './Link';
import {withRouter} from '../../router/withRouter/withRouter';
import {LinkWithRouter as LWR} from './LinkWithRouter';

const LinkWithRouter = withRouter<LinkProps>(Link);

export {Link, LinkWithRouter, LWR};
