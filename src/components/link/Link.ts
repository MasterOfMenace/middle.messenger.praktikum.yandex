import {WithRouterProps} from '../../router/withRouter/withRouter';
import Block, {EventType} from '../block/Block';
import template from './link.tmpl';

export type LinkProps = WithRouterProps & {
  to: string | number;
  text: string;
  className?: string;
  events?: Record<string, EventType>;
};
export default class Link extends Block<LinkProps> {
  constructor(props: LinkProps) {
    super('a', {
      ...props,
      events: {
        click: {
          event: (evt: Event) => {
            evt.preventDefault();
            props.router.go(props.to);
          },
        },
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
